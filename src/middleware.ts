import routes from "@/util/routes";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/app/:path*", "/api/protected/:path*"],
};

/**
 * Protects routes. Uses a conditional to provide correct response to client/api requests.
 * @param request NextRequest
 * @returns NextResponse | undefined
 */
export const middleware = async (request: NextRequest) => {
  // Everything under app is protected
  if (request.nextUrl.pathname.startsWith("/app")) {
    const token = await getToken({ req: request });
    if (!token)
      return NextResponse.redirect(new URL(routes.login, request.url));
  }

  // Everything under api/protected is protected
  if (request.nextUrl.pathname.startsWith("/api/protected")) {
    const token = await getToken({ req: request });

    if (!token)
      return new NextResponse(
        JSON.stringify({ success: false, message: "authentication failed" }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
  }
};
