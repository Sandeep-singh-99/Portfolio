import { login } from "../controller/user.controller.js"


export default {
    Query: {
        checkAuth: async (_, __, { user }) => {
             console.log('checkAuth user:', user);
            if (!user) {
                throw new Error('Unauthorized');
            }
            return user;
        } 
    },

    Mutation: {
        login: async (_, { username, password}, {res}) => {
            const { userExists, token } = await login(username, password, res);
            return {
                user: userExists,
                token
            }
        },

        logout: async (_, __, { res }) => {
            res.clearCookie('token');
            console.log('User logged out, token cleared');
            return { message: 'Logged out successfully' };
        },
    }
}