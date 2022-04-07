import prismaClient from '$lib/server/prismaClient';
import * as trpc from '@trpc/server';
import { z } from 'zod';
import * as jwt from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';

export default trpc
  .router()
  .query('me', {
    resolve: ({ ctx }: any) => {
      if (!ctx) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.user.email;
    }
  })
  .mutation('signup', {
    input: z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(3)
    }),
    resolve: async ({ input: { ...data } }) => {
      await prismaClient.user.create({
        data: { ...data }
      });
    }
  })
  .mutation('login', {
    input: z.object({
      email: z.string().email(),
      password: z.string().min(3)
    }),
    resolve: async ({ input: { ...data } }) => {
      var user = await prismaClient.user.findFirst({
        where: {
          email: data.email,
          password: data.password
        }
      });
      if (!user) return null;

      return { token: signToken(data.email) };
    }
  });

export const identifier: string = 'ff01Bt0dYnWgD3VKY';
const issuer: string = 'http://localhost:8080/';

export const signToken = (email: string): string => {
  var token = jwt.sign({ issuer: issuer }, identifier, {
    algorithm: 'HS256',
    subject: email,
    expiresIn: '1d'
  });

  return token;
};
