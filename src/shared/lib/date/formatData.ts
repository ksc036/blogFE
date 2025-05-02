export function formatToKoreanDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  let hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const isPM = hour >= 12;
  const period = isPM ? "오후" : "오전";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${year}.${month}.${day}. ${period} ${hour
    .toString()
    .padStart(2, "0")}:${minute}`;
}
