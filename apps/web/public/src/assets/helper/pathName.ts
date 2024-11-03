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
  return path[route];
};
