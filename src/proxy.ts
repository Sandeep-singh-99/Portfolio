
import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/admin-panel/login", 
    },
});

export const config = {
    matcher: ["/admin-panel/:path*"], // protect all admin + intro
};