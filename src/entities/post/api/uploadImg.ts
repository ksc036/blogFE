import axios from "axios";
export async function uploadImg(file: File, url: string) {
  await axios.put(process.env.NEXT_PUBLIC_S3_URL + url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
}
