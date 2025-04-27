module.exports = {
  async rewrites() {
    return [
      {
        source: "/:path*", // 요청 경로는 뭐든
        has: [{ type: "host", value: "(?<user>[^.]+)\\.example\\.com" }],
        destination: "/profile/:user", // 항상 /profile/서브도메인 으로
      },
    ];
  },
};
