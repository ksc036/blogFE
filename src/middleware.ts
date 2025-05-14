import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  console.log("Request Hostname:", hostname);

  const domainOnly = "ksc036.store"; // 기본 도메인
  console.log("middleware request", request.nextUrl.pathname);
  // "ksc036.store"로 끝나는 요청만 처리
  if (hostname.endsWith(domainOnly)) {
    if (hostname === domainOnly || hostname === `www.${domainOnly}`) {
      // 👉 기본 도메인(kcs036.store 또는 www.ksc036.store) 요청이면 쓰기,읽기에 대해서 예외처리리
      console.log("here is subdomain", request.nextUrl.pathname);
      const pathname = request.nextUrl.pathname;

      // 경로가 "/posts/:id" 형태일 때만 서브도메인처럼 취급
      const postsRegex = /^\/posts\/[^\/]+$/; // /posts/다음에 하나의 id가 오는 경우

      if (postsRegex.test(pathname)) {
        console.log("post subdomain", request.nextUrl.pathname);
        // 기본 도메인에서는 subdomain을 "home"으로 간주
        url.pathname = `/home${pathname}`;
        return NextResponse.rewrite(url);
      }

      // const writesRegex = /^\/write\/[^\/]+$/;
      // if (writesRegex.test(pathname)) {
      //   console.log("write subdomain", request.nextUrl.pathname);
      //   // 기본 도메인에서는 subdomain을 "home"으로 간주
      //   url.pathname = `/home${pathname}`;
      //   console.log("url.pathname", url.pathname);
      //   return NextResponse.rewrite(url);
      // }
      console.log("else subdomain", request.nextUrl.pathname);
      return NextResponse.rewrite(url);
    }

    // 여기까지 왔으면 무조건 서브도메인이다.
    console.log("here is a subdomain", request.nextUrl.pathname);
    const subdomain = hostname.replace(`.${domainOnly}`, ""); // 서브도메인 추출
    url.pathname = `/${subdomain}${request.nextUrl.pathname}`;
    // const response = NextResponse.next();
    // response.cookies.set("subdomain", subdomain);
    return NextResponse.rewrite(url);
  }
  // 그 외 요청은 그냥 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/|favicon\\.ico$|static/|.*\\.(?:png|jpg|jpeg|svg|gif|css|js|woff|woff2|ttf|map)$).*)",
  ],
};
