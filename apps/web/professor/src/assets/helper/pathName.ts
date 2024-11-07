const path = {
  experiment: 'รายการทดสอบ',
  auth: 'ระบบสมาชิก',
  signin: 'เข้าสู่ระบบ',
  signup: 'ลงทะเบียน',
  รายการทดสอบ: 'experiment',
  ระบบสมาชิก: 'auth',
  เข้าสู่ระบบ: 'signin',
  ลงทะเบียน: 'signup',
};

export type PathKeyType = keyof typeof path;

export const getPathName = (route: PathKeyType) => {
  return path[route];
};
