import { handleFormSubmission, schoolRequestSchema } from "@/lib/formHandling";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: schoolRequestSchema,
    subject: "New BricklabClips school STEM support request",
    successMessage: "Thanks - we'll review your request and reach out to schedule a quick call."
  });
}

