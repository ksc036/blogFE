module.exports = {
  async rewrites() {
    return [
      {
        source: "/:path*", // 요청 경로는 뭐든
        has: [{ type: "host", value: "(?<id>[^.]+)\\.ksc036\\.store" }],
        destination: "/profile/:id", // 항상 /profile/서브도메인 으로
      },
    ];
  },
};
