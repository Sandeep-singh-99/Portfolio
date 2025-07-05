
import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/admin-panel/login", // redirect here if not authenticated
    },
});

// export const config = {
//     matcher: ["/dashboard", "/intro"], // protected routes
// };


export const config = {
    matcher: ["/admin-panel/:path*"], // protect all admin + intro
};