export default function PostLike() {
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
      12
    </div>
  );
}
