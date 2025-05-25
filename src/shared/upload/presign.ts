import axiosInstance from "@/shared/lib/axiosInstance";
export async function getPresign(file: File) {
  const res = await axiosInstance.post("/presign", {
    filename: file.name,
  });
  return res.data;
}
