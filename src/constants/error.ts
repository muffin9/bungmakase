// kakao documents 에서 제공되어지는 에러 코드

interface authErrorProps {
  [key: string]: { description: string | string[]; redirect: string };
}

export const authError: authErrorProps = {
  KOE001: {
    description: '잘못된 형식의 요청인 경우',
    redirect: '/',
  },
  KOE002: {
    description: '잘못된 URL로 요청을 보낸 경우',
    redirect: '/',
  },
  KOE003: {
    description: '카카오 OAuth 서버에서 일시적인 오류가 발생한 경우',
    redirect: '/',
  },
  KOE004: {
    description: '카카오 로그인을 사용하도록 설정하지 않은 경우',
    redirect: '/settings/kakao-login',
  },
  KOE005: {
    description:
      '테스트 앱에 팀원으로 등록되지 않은 사용자가 로그인을 시도한 경우',
    redirect: '/settings/team-management',
  },
  KOE006: {
    description: '등록하지 않은 Redirect URI를 사용해 인가 코드를 요청한 경우',
    redirect: '/settings/redirect-uri',
  },
  KOE007: {
    description:
      '등록하지 않은 Logout Redirect URI를 사용해 로그아웃을 요청한 경우',
    redirect: '/settings/logout-redirect-uri',
  },
  KOE008: {
    description: '인가 코드 요청에 잘못된 앱 타입을 사용한 경우',
    redirect: '/settings/app-key',
  },
  KOE023: {
    description: 'JavaScript SDK 팝업 방식으로 로그인 사용이 불가능한 경우',
    redirect: '/settings/sdk',
  },
  KOE101: {
    description: '잘못된 앱 키를 사용한 경우',
    redirect: '/settings/app-key',
  },
  KOE102: {
    description:
      '카카오톡 채널과 연결되지 않은 앱으로 인가 코드 요청 시 channel_public_id 파라미터를 포함한 경우',
    redirect: '/settings/kakao-channel',
  },
  KOE201: {
    description:
      '지원하지 않는 응답 유형(response_type)을 포함해 인가 코드를 요청한 경우',
    redirect: '/',
  },
  KOE202: {
    description: 'response_type이 token일 경우',
    redirect: '/',
  },
  KOE203: {
    description: '동의 화면에서 필수 동의항목에 동의하지 않은 경우',
    redirect: '/',
  },
  KOE204: {
    description: '유효하지 않은 파라미터를 포함한 경우',
    redirect: '/',
  },
  KOE205: {
    description:
      '앱에 설정하지 않은 카카오 로그인 동의항목을 포함해 인가 코드를 요청한 경우',
    redirect: '/settings/consent-items',
  },
  KOE207: {
    description: '필수 파라미터가 누락된 경우',
    redirect: '/',
  },
  access_denied: {
    description: ['User denied access', 'Not allowed under age 14'],
    redirect: '/',
  },
  login_required: {
    description: '카카오계정 인증 필요.',
    redirect: '/login',
  },
  consent_required: {
    description: '동의 화면을 통한 사용자 동의 필요',
    redirect: '/consent',
  },
  interaction_required: {
    description: [
      'prompt=none을 사용해 카카오톡으로 자동 로그인을 요청했으나, 사용자 정보 추가 제공 등 기타 사용자 동작이 필요한 경우.',
      'prompt=none을 사용해 카카오톡으로 자동 로그인을 요청했으나, 카카오계정 통합약관 동의가 필요한 사용자인 경우',
      'prompt=none을 사용해 카카오톡으로 자동 로그인을 요청했으나, 제재된 사용자인 경우',
    ],
    redirect: '/additional-info',
  },
};
