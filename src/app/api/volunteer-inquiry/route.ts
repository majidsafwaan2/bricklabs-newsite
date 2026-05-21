import { handleFormSubmission, volunteerInquirySchema } from "@/lib/formHandling";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: volunteerInquirySchema,
    subject: "New BricklabClips mentor/judge inquiry",
    successMessage: "Thanks - we'll review your note and reach out with next steps."
  });
}

