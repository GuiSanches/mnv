export const hex2rgba = (hex: string, alpha = 1) => {
  const [r, g, b] = hex
    .match(/\w\w/g)!
    .map((x: string) => parseInt(x, 16) / 255);
  let ret = {
    r,
    g,
    b,
    a: alpha,
  };
  return ret;
};

