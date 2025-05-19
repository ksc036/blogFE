export default function PostLike({
  likeCnt,
  commentCnt,
}: {
  likeCnt: number;
  commentCnt: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        paddingRight: "8px",
      }}
    >
      <picture>
        <source
          srcSet="/images/darkmode/heart.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="/images/lightmode/heart.svg"
          alt="heart"
          width={20}
          height={20}
        />
      </picture>
      <span style={{ fontSize: "12px" }}>{likeCnt}</span>
      <picture style={{ marginLeft: "2px" }}>
        <source
          srcSet="/images/darkmode/message-circle.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="/images/lightmode/message-circle.svg"
          alt="heart"
          width={20}
          height={20}
        />
      </picture>
      <span style={{ fontSize: "12px" }}>{commentCnt}</span>
    </div>
  );
}
