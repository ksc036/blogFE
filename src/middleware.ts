// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();
  console.log("Request URL:", url.toString()); // 요청 URL 출력
  console.log("Request Hostname:", hostname); // 요청 호스트 이름 출력
  // "ksc036.store"로 끝나는 요청만 처리
  if (hostname.endsWith("ksc036.store")) {
    const subdomain = hostname.replace(".ksc036.store", "");

    if (subdomain && subdomain !== "www") {
      // 서브도메인이 있으면 /profile/서브도메인 으로 rewrite
      url.pathname = `/profile/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  // 그 외 요청은 그냥 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|static|.*\\.(?:png|jpg|jpeg|svg|gif|css|js|woff|woff2|ttf|map)).*)",
  ],
};
