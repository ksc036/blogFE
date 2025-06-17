export function formatToKoreanDate(isoString: string): string {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  // // console.log("isoString", isoString);
  return formatter.format(date);
  // // 1. ISO 문자열을 Date 객체로 파싱
  // const utcDate = new Date(isoString); //localTime으로 변환함.
  // // console.log("utcDate", utcDate);
  // // 2. KST 기준으로 9시간 더함

  // const kstDate = new Date(utcDate.getTime());
  // // console.log("kstDate", kstDate);

  // const year = kstDate.getFullYear();
  // const month = (kstDate.getMonth() + 1).toString().padStart(2, "0");
  // const day = kstDate.getDate().toString().padStart(2, "0");

  // let hour = kstDate.getHours();
  // const minute = kstDate.getMinutes().toString().padStart(2, "0");
  // const isPM = hour >= 12;
  // const period = isPM ? "오후" : "오전";
  // // console.log(
  // //   "result",
  // //   `${year}.${month}.${day}. ${period} ${hour
  // //     .toString()
  // //     .padStart(2, "0")}:${minute}`
  // // );

  // hour = hour % 12;
  // if (hour === 0) hour = 12;

  // return `${year}.${month}.${day}. ${period} ${hour
  //   .toString()
  //   .padStart(2, "0")}:${minute}`;
}
export function formatToKoreanOnlyDate(isoString: string): string {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date);

  // const utcDate = new Date(isoString);

  // // 2. KST 기준으로 9시간 더함
  // const kstDate = new Date(utcDate.getTime());

  // const year = kstDate.getFullYear();
  // const month = (kstDate.getMonth() + 1).toString().padStart(2, "0");
  // const day = kstDate.getDate().toString().padStart(2, "0");

  // return `${year}.${month}.${day}`;
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
