// src/shared/lib/date/formatDate.ts

export function formatToKoreanDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
