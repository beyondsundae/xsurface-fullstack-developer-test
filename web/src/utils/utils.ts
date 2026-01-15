export const formatPrice = (value: number|undefined) => {
  return `฿${Number(value)?.toFixed(2)}`;
};
