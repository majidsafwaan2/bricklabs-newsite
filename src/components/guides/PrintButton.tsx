"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return <button className="print-link" type="button" onClick={() => window.print()}><Printer size={16} aria-hidden="true" /> Print this guide</button>;
}
