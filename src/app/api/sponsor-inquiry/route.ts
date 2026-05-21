import { handleFormSubmission, sponsorInquirySchema } from "@/lib/formHandling";

export async function POST(request: Request) {
  return handleFormSubmission({
    request,
    schema: sponsorInquirySchema,
    subject: "New BricklabClips sponsor inquiry",
    successMessage: "Thanks - we'll review your inquiry and reach out to schedule a call."
  });
}

