export default function PostLike({ likeCnt, commentCnt }) {
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
          srcSet="https://minio.ksc036.store/log404default/white-heart.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="https://minio.ksc036.store/log404default/heart.svg"
          alt="heart"
          width={20}
          height={20}
        />
      </picture>
      <span style={{ fontSize: "12px" }}>{likeCnt}</span>
      <picture style={{ marginLeft: "2px" }}>
        <source
          srcSet="https://minio.ksc036.store/log404default/message-circle-white.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="https://minio.ksc036.store/log404default/message-circle-black.svg"
          alt="heart"
          width={20}
          height={20}
        />
      </picture>
      <span style={{ fontSize: "12px" }}>{commentCnt}</span>
    </div>
  );
}
