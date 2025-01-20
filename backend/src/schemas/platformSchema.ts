import { z } from 'zod';

export const platformSchema = z.object({
  name: z.string(),
  siteLink: z.string(),
  about: z.string()
});
