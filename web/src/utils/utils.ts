export const formatPrice = (value: number | undefined) => {
  if (value == null) return "฿0.00";

  return `฿${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatFileSize = (size: number) => {
  const fileSizeInBytes = size;
  const fileSizeInKB = fileSizeInBytes / 1024;
  const fileSizeInMB = fileSizeInKB / 1024;

  return fileSizeInMB;
};
