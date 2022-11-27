import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const API_URL =
  "https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-emotion";
const HEADERS = new Headers();
HEADERS.append("Authorization", "Bearer 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");

export const messageRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.message.findMany();
  }),
  create: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const newMsg = await ctx.prisma.message.create({
        data: {
          text: input,
          userId: ctx.session.user.id,
        },
      });

      const requestInit: RequestInit = {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ inputs: input }),
      };
      const response = await fetch(API_URL, requestInit);
      const json = await response.json();
      console.log(json);

      const emotion = json[0]["generated_text"];
      console.log(emotion);

      const newAiMsg = await ctx.prisma.message.create({
        data: {
          text: emotion,
          ai: true,
        },
      });

      return [newMsg, newAiMsg];
    }),
});
