import { NextResponse } from 'next/server';
import { getAllSubmissions } from '../../../../lib/dataStorage';

const ADMIN_PASSWORD = 'youtube2025';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: '密码错误' },
        { status: 401 }
      );
    }
    
    const submissions = getAllSubmissions();
    
    return NextResponse.json({
      success: true,
      data: submissions,
      total: submissions.length
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: '获取数据失败' },
      { status: 500 }
    );
  }
}