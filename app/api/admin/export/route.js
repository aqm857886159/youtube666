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
    
    // 生成CSV内容
    const csvHeader = 'URL,Email,Timestamp\n';
    const csvContent = submissions
      .map(sub => `"${sub.url}","${sub.email}","${sub.timestamp}"`)
      .join('\n');
    
    const csv = csvHeader + csvContent;
    
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="youtube_submissions_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: '导出失败' },
      { status: 500 }
    );
  }
}