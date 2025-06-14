export const statusToEmoji = (status: "PENDING" | "DONE" | "MISSED") => {
  switch (status) {
    case "PENDING":
      return "⏳"; // 시계 이모티콘
    case "DONE":
      return "✅"; // V 체크 이모티콘
    case "MISSED":
      return "❌"; // X 표시 이모티콘
    default:
      return "";
  }
};
