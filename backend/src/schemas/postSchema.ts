import { z } from 'zod';

export const postSchema = z.object({
  title: z.string(),
  problemId: z.string(),
  link: z.string(),
  description: z.string(),
  difficulty: z.number(),
  platformId: z.number(),
  tags: z.array(z.number())
});

export const postDeleteSchema = z.object({
  postIds: z.array(z.number())
});
