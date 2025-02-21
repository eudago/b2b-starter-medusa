import { createSelectParams } from "@medusajs/medusa/dist/api/utils/validators";
import { z } from "zod";

export type GetQuoteParamsType = z.infer<typeof GetQuoteParams>;
export const GetQuoteParams = createSelectParams();

export type CreateQuoteType = z.infer<typeof CreateQuote>;
export const CreateQuote = z
  .object({
    cart_id: z.string().min(1),
  })
  .strict();

export type AcceptQuoteType = z.infer<typeof AcceptQuote>;
export const AcceptQuote = z.object({}).strict();

export type RejectQuoteType = z.infer<typeof RejectQuote>;
export const RejectQuote = z.object({}).strict();
