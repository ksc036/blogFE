// TodayReviewContent.tsx
export default function TodayReviewContent({ data }: { data: any }) {
  return <div>오늘의 복습 내용: {JSON.stringify(data)}</div>;
}
