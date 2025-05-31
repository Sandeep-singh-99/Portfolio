import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import { typeDefs } from './graphql/typeDefs.js';
import resolvers from './graphql/Resolver.js';
import { ConnectDB } from './config/db.js';
import User from './models/user.model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  try {
    await ConnectDB();
    await server.start();
    app.use('/graphql', expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = req.cookies.token;
        let user = null;

        if (token) {
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            user = await User.findById(decoded.userId).select('-password');
            if (!user) {
              console.error('User not found for ID:', decoded.userId);
            }
            console.log("User found in context:", user.username);
          } catch (error) {
            console.error('Context auth error:', error.message);
          }
        } else {
          console.error('No token provided');
        }

        return { req, res, user };
      },
    }));

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();