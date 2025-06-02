import { login } from "../controller/user.controller.js"
import { createIntro, deleteIntro, getIntro, updateIntro } from "../controller/intro.controller.js";
import { GraphQLUpload } from 'graphql-upload';
import { createAbout, deleteAbout, getAbout, updateAbout } from "../controller/about.controller.js";


export default {
    Upload: GraphQLUpload,
    Query: {
        checkAuth: async (_, __, { user }) => {
             console.log('checkAuth user:', user);
            if (!user) {
                throw new Error('Unauthorized');
            }
            return user;
        } ,

        getIntro: async () => {
            const intro = await getIntro()
            return intro;
        },

        getAbout: async () => {
            const about = await getAbout()
            return about;
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


        createIntro: async (_, { name, techStack, description, image, file }) => {
            const newIntro = await createIntro(name, techStack, description, image, file);
            console.log('Intro created:', newIntro);
            return newIntro;
        },

        deleteIntro: async (_, { _id }) => {
            const deletedIntro = await deleteIntro(_id);
            console.log('Intro deleted:', deletedIntro);
            return deletedIntro;
        },

        updateIntro: async (_, { _id, name, techStack, description, image, file }) => {
            const updatedIntro = await updateIntro(_id, name, techStack, description, image, file);
            console.log('Intro updated:', updatedIntro);
            return updatedIntro;
        },


        createAbout: async (_, { description, image }) => {
            const newAbout = await createAbout(description, image);
            console.log('About created:', newAbout);
            return newAbout;
        },

        updateAbout: async (_, { _id, description, image }) => {
            const updatedAbout = await updateAbout(_id, description, image);
            console.log('About updated:', updatedAbout);
            return updatedAbout;
        },

        deleteAbout: async (_, { _id }) => {
            const deletedAbout = await deleteAbout(_id);
            console.log('About deleted:', deletedAbout);
            return deletedAbout;
        }
    }
}