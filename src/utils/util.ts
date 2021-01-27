export const splitMax = (str: string): string[] => {
  return str.split('.');
};

export const conditions = {
  eq: (d: any, v: any) => d === v,
  neq: (d: any, v: any) => d !== v,
  gt: (d: any, v: any) => d > v,
  gte: (d: any, v: any) => d >= v,
  contains: (d: any[] | string, v: any) => d.includes(v),
};
