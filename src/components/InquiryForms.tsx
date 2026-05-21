"use client";

import { useState } from "react";
import { siteContent } from "@/data/siteContent";

type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

function payloadFromForm(form: HTMLFormElement, checkboxNames: string[] = []) {
  const formData = new FormData(form);
  const payload: Record<string, string | boolean> = {};

  for (const [key, value] of formData.entries()) {
    payload[key] = String(value);
  }

  for (const name of checkboxNames) {
    payload[name] = formData.get(name) === "on";
  }

  return payload;
}

async function submitPayload(endpoint: string, payload: Record<string, string | boolean>) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = (await response.json().catch(() => null)) as { message?: string } | null;

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong. Please try again.");
  }

  return data?.message || "Thanks - your submission was received.";
}

function HoneypotField() {
  return (
    <div className="honeypot" aria-hidden="true">
      <label>
        Leave this field empty
        <input name="websiteConfirm" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function FormStatus({ state }: { state: FormState }) {
  if (state.status === "idle" || state.status === "loading") {
    return null;
  }

  return (
    <p className={state.status === "success" ? "form-message success" : "form-message error"} role="status">
      {state.message}
    </p>
  );
}

function Field({ label, name, type = "text", required = false, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <label>
      <span>
        {label}
        {required ? <em> required</em> : null}
      </span>
      <input name={name} type={type} required={required} placeholder={placeholder} />
    </label>
  );
}

function TextArea({ label, name, required = false, rows = 4, placeholder }: { label: string; name: string; required?: boolean; rows?: number; placeholder?: string }) {
  return (
    <label className="full-span">
      <span>
        {label}
        {required ? <em> required</em> : null}
      </span>
      <textarea name={name} required={required} rows={rows} placeholder={placeholder} />
    </label>
  );
}

function SelectField({ label, name, options, required = false }: { label: string; name: string; options: readonly string[]; required?: boolean }) {
  return (
    <label>
      <span>
        {label}
        {required ? <em> required</em> : null}
      </span>
      <select name={name} required={required} defaultValue="">
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SponsorInquiryForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ status: "loading", message: "" });

    try {
      const message = await submitPayload("/api/sponsor-inquiry", payloadFromForm(form, ["consent"]));
      form.reset();
      setState({ status: "success", message });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Something went wrong." });
    }
  }

  return (
    <form className="inquiry-form" onSubmit={onSubmit}>
      <HoneypotField />
      <div className="form-grid">
        <Field label="Company name" name="companyName" required />
        <Field label="Contact name" name="contactName" required />
        <Field label="Role/title" name="roleTitle" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Website" name="website" type="url" placeholder="https://example.com" />
        <SelectField label="Sponsor interest" name="sponsorInterest" options={siteContent.forms.sponsorInterestOptions} required />
        <SelectField label="Estimated budget range" name="estimatedBudgetRange" options={siteContent.forms.budgetRanges} />
        <Field label="Timeline" name="timeline" placeholder="Example: summer 2026" />
        <TextArea label="What do you want to support?" name="whatTheyWantToSupport" required />
        <TextArea label="Message" name="message" rows={5} />
        <label className="checkbox-row full-span">
          <input name="consent" type="checkbox" required />
          <span>I understand BricklabClips will follow up to schedule a call.</span>
        </label>
      </div>
      <button className="button button-dark" type="submit" disabled={state.status === "loading"}>
        {state.status === "loading" ? "Sending..." : "Send sponsor inquiry"}
      </button>
      <FormStatus state={state} />
    </form>
  );
}

export function SchoolRequestForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ status: "loading", message: "" });

    try {
      const message = await submitPayload("/api/school-request", payloadFromForm(form));
      form.reset();
      setState({ status: "success", message });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Something went wrong." });
    }
  }

  return (
    <form className="inquiry-form" onSubmit={onSubmit}>
      <HoneypotField />
      <p className="form-note">Adult teachers, coaches, club leaders, librarians, or administrators should submit this form.</p>
      <fieldset>
        <legend>Contact</legend>
        <div className="form-grid">
          <Field label="Adult contact name" name="adultContactName" required />
          <Field label="Role" name="role" required />
          <Field label="School email" name="schoolEmail" type="email" required />
          <Field label="School website" name="schoolWebsite" type="url" placeholder="https://school.edu" />
        </div>
      </fieldset>
      <fieldset>
        <legend>School/program</legend>
        <div className="form-grid">
          <Field label="School or organization" name="schoolOrOrgName" required />
          <Field label="District" name="district" />
          <Field label="City" name="city" required />
          <Field label="State" name="state" required />
          <SelectField label="Title I status" name="isTitleI" options={siteContent.forms.titleIOptions} required />
          <SelectField label="Program type" name="currentProgramType" options={siteContent.forms.programTypes} required />
        </div>
      </fieldset>
      <fieldset>
        <legend>What you need</legend>
        <div className="form-grid">
          <TextArea label="Requested materials" name="requestedMaterials" required placeholder="Motors, sensors, tools, cardboard, kits, or parts" />
          <TextArea label="Item links" name="itemLinks" placeholder="Optional example links" />
          <Field label="Approximate budget" name="approximateBudget" required placeholder="Example: $350" />
          <Field label="Students reached" name="studentsReached" required placeholder="Example: 24" />
        </div>
      </fieldset>
      <fieldset>
        <legend>How it will be used</legend>
        <div className="form-grid">
          <TextArea label="Classroom, club, or team plan" name="howMaterialsWillBeUsed" required />
          <Field label="Timeline" name="timeline" placeholder="Example: before fall robotics season" />
          <SelectField label="Can accept shipped materials" name="canAcceptShippedMaterials" options={siteContent.forms.yesNoUnsureOptions} required />
        </div>
      </fieldset>
      <fieldset>
        <legend>Permissions</legend>
        <div className="form-grid">
          <SelectField label="Public listing" name="publicListingPermission" options={siteContent.forms.permissionOptions} required />
          <SelectField label="Photos or quotes" name="photoOrQuotePermission" options={siteContent.forms.permissionOptions} required />
          <TextArea label="Anything else?" name="message" rows={4} />
        </div>
      </fieldset>
      <button className="button button-dark" type="submit" disabled={state.status === "loading"}>
        {state.status === "loading" ? "Sending..." : "Request materials"}
      </button>
      <FormStatus state={state} />
    </form>
  );
}

export function VolunteerInquiryForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ status: "loading", message: "" });

    try {
      const message = await submitPayload("/api/volunteer-inquiry", payloadFromForm(form, ["canJudgeBuildChallenge", "canMentorStudents"]));
      form.reset();
      setState({ status: "success", message });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Something went wrong." });
    }
  }

  return (
    <form className="inquiry-form compact-form" onSubmit={onSubmit}>
      <HoneypotField />
      <div className="form-grid">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <TextArea label="Background" name="background" required placeholder="STEM, robotics, teaching, engineering, judging, mentoring, or maker experience" />
        <label className="checkbox-row">
          <input name="canJudgeBuildChallenge" type="checkbox" />
          <span>Can judge Build Challenge projects</span>
        </label>
        <label className="checkbox-row">
          <input name="canMentorStudents" type="checkbox" />
          <span>Can mentor students</span>
        </label>
        <TextArea label="Message" name="message" rows={4} />
      </div>
      <button className="button button-dark" type="submit" disabled={state.status === "loading"}>
        {state.status === "loading" ? "Sending..." : "Send mentor/judge inquiry"}
      </button>
      <FormStatus state={state} />
    </form>
  );
}
