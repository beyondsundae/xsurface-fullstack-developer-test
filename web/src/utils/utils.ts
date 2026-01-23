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


export function getScreenSize() {
  const width = window.innerWidth;
  if (width < 576) {
      return 'xs';
  } else if (width >= 576 && width < 768) {
      return 'sm';
  } else if (width >= 768 && width < 992) {
      return 'md';
  } else if (width >= 992 && width < 1200) {
      return 'lg';
  } else {
      return 'xl';
  }
}
