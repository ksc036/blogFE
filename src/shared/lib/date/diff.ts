export function getDateDiffInDays(aStr: string, bStr: string) {
  const a = new Date(aStr);
  const b = new Date(bStr);

  // UTC 기준 날짜 일수로 변환 → 시간 영향 없음
  const aDays =
    Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()) /
    (1000 * 60 * 60 * 24);
  const bDays =
    Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) /
    (1000 * 60 * 60 * 24);

  return bDays - aDays;
}
