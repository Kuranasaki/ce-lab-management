const path = {
  experiment: 'รายการทดสอบ',
  รายการทดสอบ: 'experiment',
};

export type PathKeyType = keyof typeof path;

export const getPathName = (route: PathKeyType) => {
  return path[route];
};
