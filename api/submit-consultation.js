import { put } from '@vercel/blob';

// Edge 런타임 설정을 제거하여, Vercel의 기본 Node.js 환경에서 실행되도록 합니다.
// 이렇게 하면 호환성 문제가 해결됩니다.

export default async function handler(request, response) {
  // POST 요청이 아닐 경우, 에러를 반환합니다.
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Node.js 환경에서는 request.body를 사용해 데이터를 가져옵니다.
    const { name, contact, email, details } = request.body;

    // 필수 입력 데이터가 있는지 확인합니다.
    if (!name || !contact) {
      return response.status(400).json({ error: '이름과 연락처는 필수 항목입니다.' });
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
    const blob = await put(filename, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });

    // 성공적으로 저장되면, 파일 정보를 반환합니다.
    return response.status(200).json(blob);

  } catch (error) {
    // 오류 발생 시, 서버 로그에 기록하고 에러 메시지를 반환합니다.
    console.error('Vercel Blob 저장 오류:', error);
    return response.status(500).json({ error: '데이터 저장 중 오류가 발생했습니다.', message: error.message });
  }
}
