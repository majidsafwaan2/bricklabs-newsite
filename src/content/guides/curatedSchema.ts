import { z } from "zod";
import { GUIDE_DIFFICULTIES, VERIFICATION_BASES, type GuideCategory } from "./types";

const mathSchema = z.object({
  title: z.string().min(8),
  formula: z.string().min(3),
  variables: z.array(z.string().min(3)).min(2),
  substitution: z.string().min(5),
  result: z.string().min(5),
  interpretation: z.string().min(15),
  assumptions: z.string().min(15)
});

const testSchema = z.object({
  firstTest: z.string().min(15),
  success: z.string().min(15),
  measure: z.string().min(10),
  variable: z.string().min(3),
  controls: z.string().min(10),
  trials: z.array(z.string().min(3)).min(3)
});

const codeSchema = z.object({
  language: z.string().min(2),
  filename: z.string().min(3),
  source: z.string().min(40),
  explanation: z.string().min(15)
});

const wiringRowSchema = z.object({
  from: z.string().min(2),
  to: z.string().min(2),
  purpose: z.string().min(8)
});

export const curatedGuideSeedSchema = z.object({
  number: z.number().int().min(1).max(125),
  title: z.string().min(4),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  difficulty: z.enum(GUIDE_DIFFICULTIES),
  ageRange: z.string().min(3),
  estimatedTime: z.string().min(5),
  timeMinutes: z.number().int().min(20),
  maxCost: z.number().min(0).max(100),
  description: z.string().min(45),
  hook: z.string().min(60),
  outcome: z.string().min(45),
  concepts: z.array(z.string().min(2)).min(3),
  tags: z.array(z.string().min(2)).min(4),
  featured: z.boolean(),
  input: z.string().min(3),
  output: z.string().min(3),
  motion: z.string().min(3),
  losses: z.array(z.string().min(3)).min(4),
  principleName: z.string().min(3),
  principle: z.string().min(60),
  observe: z.string().min(25),
  materials: z.array(z.string().regex(/^[^|]+\|[^|]+\|[^|]+$/)).min(5),
  tools: z.array(z.string().min(2)).min(2),
  alternatives: z.array(z.string().min(12)).min(3),
  safety: z.array(z.string().min(15)).min(3),
  access: z.array(z.string().min(12)).min(3),
  orientation: z.string().min(45),
  steps: z.array(z.string().regex(/^[^|]+\|[^|]+\|[^|]+$/)).min(8).max(18),
  checkpoints: z.array(z.string().min(15)).min(3),
  math: mathSchema,
  test: testSchema,
  failures: z.array(z.string().regex(/^[^|]+\|[^|]+\|[^|]+\|[^|]+$/)).length(4),
  tuning: z.string().min(45),
  extensions: z.array(z.string().regex(/^(Easier|Performance|Creative|Advanced)\|[^|]+\|[^|]+$/)).min(3),
  classroom: z.string().min(45),
  reflection: z.array(z.string().min(12)).min(3),
  glossary: z.array(z.string().regex(/^[^|]+\|[^|]+$/)).min(4),
  related: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).min(3).max(6),
  verificationBasis: z.enum(VERIFICATION_BASES),
  advancedExtension: z.boolean(),
  householdFriendly: z.boolean(),
  classroomFriendly: z.boolean(),
  electronicsOrCode: z.boolean(),
  builderMoment: z.string().min(25),
  wiring: z.array(wiringRowSchema).min(3).optional(),
  code: codeSchema.optional()
});

export type CuratedGuideSeed = z.infer<typeof curatedGuideSeedSchema>;

export function parseGuideSeeds(input: unknown, category: GuideCategory) {
  return z.array(curatedGuideSeedSchema).parse(input).map((seed) => ({ ...seed, category }));
}
