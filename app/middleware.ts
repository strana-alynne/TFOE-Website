import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const adminRoutes = ["/portal", "/admin-cms"];
const memberRoutes = ["/portal-member"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAdminRoute = adminRoutes.some(route => path.startsWith(route));
  const isMemberRoute = memberRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

// Redirect unauthenticated users to login
if ((isAdminRoute || isMemberRoute) && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Handle role-based access
  if (session?.userId) {
    const userRole = session.role || "member"; // Default to member if role is not specified

    // Redirect authenticated users from public routes to their appropriate dashboard
    if (isPublicRoute) {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/portal", req.nextUrl));
      } else {
        return NextResponse.redirect(new URL("/portal-member", req.nextUrl));
      }
    }

    // Prevent members from accessing admin routes
    if (isAdminRoute && userRole !== "admin") {
      return NextResponse.redirect(new URL("/portal-member", req.nextUrl));
    }

    // Prevent admins from accessing member routes
    if (isMemberRoute && userRole === "admin") {
      return NextResponse.redirect(new URL("/portal", req.nextUrl));
    }
  }

  return NextResponse.next();
}