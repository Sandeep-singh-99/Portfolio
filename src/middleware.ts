import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Allow unauthenticated access to the login page
      if (req.nextUrl.pathname === "/admin-panel/login") {
        return true;
      }
      return !!token;
    },
  },
  pages: {
    signIn: "/admin-panel/login",
  },
});

export const config = {
  matcher: ["/admin-panel/((?!login).*)$", "/admin-panel"],
};
