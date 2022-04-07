import prismaClient from '$lib/server/prismaClient';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import type { UserContext } from '.';

export default trpc
  .router()
  .query('me', {
    resolve: async ({ ctx }: any) => {
      var user = await prismaClient.user.findFirst({
        where: {
          id: ctx.user.id
        },
        include: {
          playlist: true,
          followedBy: true,
          following: true
        }
      });

      return {
        username: ctx.user.username,
        email: ctx.user.email,
        followersCount: user?.following.length,
        followedByCount: user?.followedBy.length,
        likedSongs: user?.playlist.length
      };
    }
  })
  .mutation('update_me', {
    input: z.object({
      username: z.string()
    }),
    resolve: async ({ ctx, input: { ...data } }) => {
      var context = ctx as UserContext;

      await prismaClient.user.update({
        where: {
          id: context.user.id
        },
        data: {
          username: data.username
        }
      });

      return data.username;
    }
  })
  .mutation('like_song', {
    input: z.object({
      songId: z.number()
    }),
    resolve: async ({ ctx, input: { ...data } }) => {
      var song = await prismaClient.song.findFirst({
        where: {
          id: data.songId
        }
      });
      if (!song) {
        throw new TRPCError({ code: 'BAD_REQUEST' });
      }
      var context = ctx as UserContext;
      await prismaClient.user.update({
        where: {
          id: context!.user!.id
        },
        data: {
          playlist: {
            create: {
              songId: song.id
            }
          }
        }
      });
    }
  })
  .query('playlist', {
    resolve: async ({ ctx }: any) => {
      var user = await prismaClient.user.findFirst({
        where: {
          email: ctx.user.email
        },
        select: {
          playlist: {
            include: {
              song: {
                select: {
                  name: true,
                  artist: true
                }
              }
            }
          }
        }
      });

      return user!.playlist;
    }
  })
  .query('trending', {
    resolve: async () => {
      var songs = await prismaClient.song.findMany({
        include: {
          artist: true
        }
      });

      var randomSong = songs[Math.floor(Math.random() * songs.length)];
      return {
        songName: randomSong.name,
        artistName: randomSong.artist?.name,
        songId: randomSong.id
      };
    }
  });
