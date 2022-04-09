import { inferAsyncReturnType, TRPCError } from '@trpc/server';
import * as trpc from '@trpc/server';
import auth, { identifier } from './auth';
import * as jwt from 'jsonwebtoken';
import prismaClient from '../prismaClient';
import user from './user';
import type { User } from '@prisma/client';

export type UserContext = {
  user: User;
};

export const createContext = async (req) => {
  try {
    const authToken = req.headers.get('Authorization');
    if (authToken) {
      var userAuth = jwt.verify(authToken, identifier);
      var user = await prismaClient.user.findFirst({
        where: {
          email: userAuth.email
        }
      });
      var context: UserContext = { user: user! };
      return context;
    }
    return null;
  } catch (error) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
};

export const router = trpc
  .router<inferAsyncReturnType<typeof createContext>>()
  .merge('auth:', auth)
  .merge('user:', user);

export type Router = typeof router;
