export const fileSizeText = (size: number): string => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 ** 2) return `${Math.round((size / 1024) * 10) / 10} KB`;
  if (size < 1024 ** 3) return `${Math.round((size / 1024 ** 2) * 10) / 10} MB`;
  return `${Math.round((size / 1024 ** 3) * 10) / 10} GB`;
};

export const formattedDate = (dateString: string): string => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
};
