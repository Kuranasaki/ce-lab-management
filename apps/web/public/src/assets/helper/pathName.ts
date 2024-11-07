const path = {
  reservation: 'คำขอรับบริการทดสอบ',
  request: 'สร้างคำขอ',
  pricing: 'ราคาทดสอบ',
  certificate: 'ตรวจสอบผลการทดสอบ',
  auth: 'ระบบสมาชิก',
  signin: 'เข้าสู่ระบบ',
  signup: 'ลงทะเบียน',
  คำขอรับบริการทดสอบ: 'reservation',
  สร้างคำขอ: 'request',
  ราคาทดสอบ: 'pricing',
  ตรวจสอบผลการทดสอบ: 'certificate',
  ระบบสมาชิก: 'auth',
  เข้าสู่ระบบ: 'signin',
  ลงทะเบียน: 'signup',
};

export type PathKeyType = keyof typeof path;

export const getPathName = (route: PathKeyType) => {
  switch (route) {
    case 'reservation':
      return 'คำขอรับบริการทดสอบ';
    case 'request':
      return 'สร้างคำขอ';
    case 'pricing':
      return 'ราคาทดสอบ';
    case 'certificate':
      return 'ตรวจสอบผลการทดสอบ';
    case 'auth':
      return 'ระบบสมาชิก';
    case 'signin':
      return 'เข้าสู่ระบบ';
    case 'signup':
      return 'ลงทะเบียน';
    case 'คำขอรับบริการทดสอบ':
      return 'reservation';
    case 'สร้างคำขอ':
      return 'request';
    case 'ราคาทดสอบ':
      return 'pricing';
    case 'ตรวจสอบผลการทดสอบ':
      return 'certificate';
    case 'ระบบสมาชิก':
      return 'auth';
    case 'เข้าสู่ระบบ':
      return 'signin';
    case 'ลงทะเบียน':
      return 'signup';
    default:
      return route;
  }
};
