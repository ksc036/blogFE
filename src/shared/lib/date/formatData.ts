export function formatToKoreanDate(isoString: string): string {
  // 1. ISO 문자열을 Date 객체로 파싱
  const utcDate = new Date(isoString);

  // 2. KST 기준으로 9시간 더함
  const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

  const year = kstDate.getFullYear();
  const month = (kstDate.getMonth() + 1).toString().padStart(2, "0");
  const day = kstDate.getDate().toString().padStart(2, "0");

  let hour = kstDate.getHours();
  const minute = kstDate.getMinutes().toString().padStart(2, "0");
  const isPM = hour >= 12;
  const period = isPM ? "오후" : "오전";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${year}.${month}.${day}. ${period} ${hour
    .toString()
    .padStart(2, "0")}:${minute}`;
}
// export function formatToKoreanDate(isoString: string): string {
//   return new Date(isoString).toLocaleString("ko-KR", {
//     timeZone: "Asia/Seoul",
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// }
