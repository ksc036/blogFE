import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  console.log("Request Hostname:", hostname);

  const domainOnly = "ksc036.store"; // 기본 도메인

  // "ksc036.store"로 끝나는 요청만 처리
  if (hostname.endsWith(domainOnly)) {
    if (hostname === domainOnly || hostname === `www.${domainOnly}`) {
      // 👉 기본 도메인(kcs036.store 또는 www.ksc036.store) 요청이면 아무것도 안 한다
      return NextResponse.next();
    }

    // 여기까지 왔으면 무조건 서브도메인이다.
    const subdomain = hostname.replace(`.${domainOnly}`, ""); // 서브도메인 추출
    url.pathname = `/profile/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  // 그 외 요청은 그냥 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|static|.*\\.(?:png|jpg|jpeg|svg|gif|css|js|woff|woff2|ttf|map)).*)",
  ],
};
