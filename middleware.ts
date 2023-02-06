// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //   return NextResponse.rewrite(new URL("/clients", request.nextUrl));
  //   return NextResponse.rewrite(request.nextUrl);
  const response = new NextResponse();
  response.cookies.set("auth", "secret"), { path: "/clients" };

  const allCookies = response.cookies.get("auth");

  console.log(`allCookies`, allCookies);

  return NextResponse.rewrite(request.nextUrl);
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/", "/events/"],
// };
