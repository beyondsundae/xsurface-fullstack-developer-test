
export const formatPrice = (value: number | undefined) => {
  return `฿${Number(value)?.toFixed(2)}`;
};

export const formatFileSize = (size: number) => {
  const fileSizeInBytes = size;
  const fileSizeInKB = fileSizeInBytes / 1024;
  const fileSizeInMB = fileSizeInKB / 1024;

  return fileSizeInMB;
};

