import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const tweetRouter = createTRPCRouter({
  infiniteTweets: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10).optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ ctx, input: { limit, cursor } }) => {
      const currentUserId = ctx.session?.user.id;

      const tweets = await ctx.prisma.tweet.findMany({
        take: limit,
        skip: 1,
        cursor: cursor ? { createdAt_id: cursor } : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: {
          id: true,
          content: true,
          createdAt: true,
          _count: {
            select: { likes: true },
          },
          likes:
            currentUserId == null
              ? false
              : { where: { authorId: currentUserId } },
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined;
      if (tweets.length === limit) {
        const lastTweet = tweets[tweets.length - 1];
        if (lastTweet) {
          nextCursor = {
            id: lastTweet.id,
            createdAt: lastTweet.createdAt,
          };
        }
      }

      return {
        tweets,
        nextCursor,
      };
    }),

  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input: { content } }) => {
      const tweet = await ctx.prisma.tweet.create({
        data: {
          content,
          authorId: ctx.session.user.id,
        },
      });

      return tweet;
    }),
});
