import { NextResponse } from 'next/server';
import { validateSubmission } from '../../../lib/validation';
import { saveSubmission } from '../../../lib/dataStorage';

// 简单的IP限制（每个IP每分钟最多5次请求）
const ipRequests = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const requests = ipRequests.get(ip) || [];
  
  // 清理过期请求
  const validRequests = requests.filter(time => now - time < 60000);
  
  if (validRequests.length >= 5) {
    return false;
  }
  
  validRequests.push(now);
  ipRequests.set(ip, validRequests);
  return true;
}

export async function POST(request) {
  try {
    // 获取客户端IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || '127.0.0.1';
    
    // 检查限制
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: '请求过于频繁，请稍后再试' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // 验证数据
    const validatedData = validateSubmission(body);
    
    // 保存到CSV
    const submission = saveSubmission(validatedData.url, validatedData.email);
    
    return NextResponse.json({
      success: true,
      message: '提交成功！我们将在24小时内处理您的视频。',
      data: submission
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: error.message || '提交失败，请重试' },
      { status: 400 }
    );
  }
}