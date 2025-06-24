import { put } from '@vercel/blob';

// Vercel Edge 환경에서 실행되도록 설정합니다.
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // POST 요청이 아니면 에러를 반환합니다.
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { name, contact, email, details } = await request.json();

    // 필수 입력 데이터가 있는지 확인합니다.
    if (!name || !contact) {
      return new Response(JSON.stringify({ error: '이름과 연락처는 필수 항목입니다.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Vercel Blob에 저장될 고유한 파일 이름을 생성합니다.
    const filename = `ionnft-customer/consultation-${Date.now()}.json`;
    
    // 저장할 데이터를 JSON 객체로 정리합니다.
    const data = {
      name,
      contact,
      email: email || 'N/A',
      details: details || 'N/A',
      submittedAt: new Date().toISOString(),
    };

    // Vercel Blob 스토리지에 파일을 저장합니다.
    // 이 기능이 작동하려면 Vercel 프로젝트에 'BLOB_READ_WRITE_TOKEN' 환경 변수가 설정되어 있어야 합니다.
    const blob = await put(filename, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });

    // 성공적으로 저장되면, 파일 정보를 반환합니다.
    return new Response(JSON.stringify(blob), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    // 오류 발생 시, 서버 로그에 기록하고 에러 메시지를 반환합니다.
    console.error('Vercel Blob 저장 오류:', error);
    return new Response(JSON.stringify({ error: '데이터 저장 중 오류가 발생했습니다.', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
