"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { company } from "@/lib/data";
import {
  calculateEstimate,
  estimateItems,
  formatCurrency,
  type EstimateItemId,
  type EstimateSelections,
} from "@/lib/estimator";

const initialSelections: EstimateSelections = {
  items: {},
  stairs: "none",
  access: "inside",
  disassembly: false,
  sameDay: false,
  heavyMaterial: false,
  zip: "",
  name: "",
  phone: "",
  typedSignature: "",
  approvalChecked: false,
};

const accessOptions = [
  { value: "curbside", label: "Curbside", helper: "Subtracts 10% for the easiest pickup" },
  { value: "inside", label: "Inside home", helper: "Inside home, unit, garage, or office" },
] as const;

const stairsOptions = [
  { value: "none", label: "No stairs" },
  { value: "yes", label: "Yes, there are stairs (+$10)" },
] as const;

type ApprovalFormState = {
  approved: boolean;
  email: string;
  phone: string;
  pickupDate: string;
};

export function InstantEstimator() {
  const [selections, setSelections] = useState<EstimateSelections>(initialSelections);
  const [approval, setApproval] = useState<ApprovalFormState>({
    approved: false,
    email: "",
    phone: "",
    pickupDate: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState("");
  const estimate = useMemo(() => calculateEstimate(selections), [selections]);

  const cartItems = estimate.lineItems;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const canEstimate = cartCount > 0;
  const canSubmitApproval =
    canEstimate &&
    approval.approved &&
    approval.email.trim().includes("@") &&
    approval.phone.trim().length >= 10 &&
    selections.zip.trim().length >= 5 &&
    approval.pickupDate.length > 0;

  useEffect(() => {
    if (submitState === "success") {
      setApproval((current) => ({
        ...current,
        approved: false,
        email: "",
        phone: "",
        pickupDate: "",
      }));
    }
  }, [submitState]);

  function setQuantity(itemId: EstimateItemId, nextQuantity: number) {
    setSelections((current) => ({
      ...current,
      items: {
        ...current.items,
        [itemId]: Math.max(0, nextQuantity),
      },
    }));
  }

  function updateField<K extends keyof EstimateSelections>(key: K, value: EstimateSelections[K]) {
    setSelections((current) => ({ ...current, [key]: value }));
  }

  function updateApproval<K extends keyof ApprovalFormState>(key: K, value: ApprovalFormState[K]) {
    setApproval((current) => ({ ...current, [key]: value }));
  }

  function increment(itemId: EstimateItemId) {
    setQuantity(itemId, (selections.items[itemId] || 0) + 1);
  }

  function decrement(itemId: EstimateItemId) {
    setQuantity(itemId, (selections.items[itemId] || 0) - 1);
  }

  async function handleApprovalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmitApproval) {
      setSubmitState("error");
      setSubmitMessage("Please confirm the estimate and fill in your contact details first.");
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage("");

    const response = await fetch("/api/estimate-approval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: {
          email: approval.email.trim(),
          phone: approval.phone.trim(),
          pickupDate: approval.pickupDate,
        },
        estimate: {
          totalMin: estimate.totalMin,
          totalMax: estimate.totalMax,
          tax: estimate.tax,
          serviceFee: estimate.serviceFee,
          items: estimate.lineItems,
        },
        selections: {
          zip: selections.zip,
          access: selections.access,
          stairs: selections.stairs,
          disassembly: selections.disassembly,
          sameDay: selections.sameDay,
          heavyMaterial: selections.heavyMaterial,
        },
      }),
    });

    const data = (await response.json().catch(() => null)) as { message?: string } | null;

    if (!response.ok) {
      setSubmitState("error");
      setSubmitMessage(data?.message || "We could not send the request. Please call or text us.");
      return;
    }

    setSubmitState("success");
    setSubmitMessage(
      data?.message ||
        "Your estimate approval was sent. We will follow up to confirm your pickup window.",
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-8">
        <section className="surface-card p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="mt-2 text-2xl font-extrabold text-ink">
                Add the items you need removed
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Start with the item list below. Then use the panel on the right to answer a few
                quick questions and see your estimated range at the end.
              </p>
            </div>
            <div className="rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-sm font-bold text-brand-dark">
              Cart: {cartCount} item{cartCount === 1 ? "" : "s"}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {estimateItems.map((item) => {
              const quantity = selections.items[item.id] || 0;
              return (
                <article
                  key={item.id}
                  className="rounded-[1.75rem] border border-line bg-white p-5 shadow-sm"
                >
                  <div className="flex h-full flex-col justify-between gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                        Retail-style estimate
                      </p>
                      <h3 className="mt-3 text-xl font-bold text-ink">{item.label}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{item.helper}</p>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-2xl font-extrabold text-brand-dark">
                          {item.min === item.max
                            ? formatCurrency(item.min)
                            : `${formatCurrency(item.min)}-${formatCurrency(item.max)}`}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                          Price each
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-line bg-surfaceStrong p-1">
                        <button
                          type="button"
                          onClick={() => decrement(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-brand-dark"
                          aria-label={`Decrease ${item.label}`}
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-base font-bold text-ink">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increment(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-xl font-bold text-white"
                          aria-label={`Increase ${item.label}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </div>

      <aside className="space-y-6">
        <section className="overflow-hidden rounded-[2rem] bg-brand-dark text-white shadow-lift">
          <div className="bg-[radial-gradient(circle_at_top_left,rgba(82,201,255,0.24),transparent_30%),linear-gradient(135deg,rgba(10,27,50,1),rgba(20,78,117,0.96))] p-7 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/60">Your cart</p>
            <h2 className="mt-2 text-2xl font-extrabold">Review items and answer a few questions</h2>

            <div className="mt-6 space-y-3">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/60">
                          Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-white">
                        {item.min === item.max
                          ? formatCurrency(item.min)
                          : `${formatCurrency(item.min)}-${formatCurrency(item.max)}`}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-5 text-sm text-white/72">
                  Add items to your cart to get started.
                </div>
              )}
            </div>

            <div className="mt-6 space-y-5 rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                  Quick questions
                </p>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  These details help us show a cleaner estimate before you call or text.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Where is the pickup?</p>
                <div className="mt-3 grid gap-3">
                  {accessOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField("access", option.value)}
                      className={`rounded-2xl border px-4 py-4 text-left ${
                        selections.access === option.value
                          ? "border-white/40 bg-white text-brand-dark"
                          : "border-white/10 bg-white/6 text-white"
                      }`}
                    >
                      <p className="text-sm font-bold">{option.label}</p>
                      <p
                        className={`mt-1 text-xs leading-6 ${
                          selections.access === option.value ? "text-brand-dark/80" : "text-white/70"
                        }`}
                      >
                        {option.helper}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-1">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-white">Stairs</span>
                  <select
                    value={selections.stairs}
                    onChange={(event) =>
                      updateField("stairs", event.target.value as EstimateSelections["stairs"])
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                  >
                    {stairsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-3">
                {[
                  { key: "disassembly", label: "Needs disassembly" },
                ].map((option) => {
                  const checked = selections[option.key as keyof EstimateSelections] as boolean;
                  return (
                    <label
                      key={option.key}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) =>
                          updateField(
                            option.key as keyof EstimateSelections,
                            event.target.checked as never,
                          )
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white p-5 text-ink">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                Total including tax and service fee
              </p>
              <p className="mt-3 text-4xl font-extrabold tracking-tight">
                {canEstimate
                  ? `${formatCurrency(estimate.totalMin)}-${formatCurrency(estimate.totalMax)}`
                  : "$0-$0"}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">{estimate.confidenceNote}</p>
              {estimate.serviceFee ? (
                <div className="flex items-center justify-between gap-4">
                  <p className="mt-4 text-sm font-semibold text-ink">Service fee included</p>
                  <p className="mt-4 text-sm font-bold text-ink">
                    {formatCurrency(estimate.serviceFee.min)}
                  </p>
                </div>
              ) : null}
              {estimate.tax ? (
                <div className="flex items-center justify-between gap-4">
                  <p className="mt-2 text-sm font-semibold text-ink">
                    Estimated tax ({Math.round(estimate.tax.rate * 1000) / 10}%)
                  </p>
                  <p className="mt-2 text-sm font-bold text-ink">
                    {estimate.tax.min === estimate.tax.max
                      ? formatCurrency(estimate.tax.min)
                      : `${formatCurrency(estimate.tax.min)}-${formatCurrency(estimate.tax.max)}`}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="cta-secondary border-white/20 bg-white/5 text-white hover:bg-white hover:text-brand-dark"
                href={company.textHref}
              >
                Text a Photo
              </a>
            </div>

            <form onSubmit={handleApprovalSubmit} className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                Ready to move forward?
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-white">Let&apos;s Get Your Project Scheduled</h3>
              <label className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm text-white">
                <input
                  type="checkbox"
                  checked={approval.approved}
                  onChange={(event) => updateApproval("approved", event.target.checked)}
                  className="mt-1"
                />
                <span>I&apos;m ready for Rain City Sanitation to follow up.</span>
              </label>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-white">Email</span>
                  <input
                    type="email"
                    value={approval.email}
                    onChange={(event) => updateApproval("email", event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-white">Phone</span>
                  <input
                    type="tel"
                    value={approval.phone}
                    onChange={(event) => updateApproval("phone", event.target.value)}
                    placeholder="(206) 555-0123"
                    className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                  />
                </label>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-white">ZIP code</span>
                  <input
                    type="text"
                    value={selections.zip}
                    onChange={(event) => updateField("zip", event.target.value)}
                    placeholder="98108"
                    className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-white">Preferred pickup date</span>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={approval.pickupDate}
                    onChange={(event) => updateApproval("pickupDate", event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand"
                  />
                </label>
              </div>

              <p className="mt-3 text-xs leading-6 text-white/60">
                We use your ZIP code to confirm service availability and final scheduling.
              </p>

              {submitMessage ? (
                <div
                  className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
                    submitState === "success"
                      ? "bg-emerald-500/15 text-emerald-100"
                      : "bg-amber-500/15 text-amber-100"
                  }`}
                >
                  {submitMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitState === "submitting" || !canSubmitApproval}
                className="mt-5 inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-brand-dark transition hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitState === "submitting" ? "Sending request..." : "Confirm this estimate"}
              </button>
            </form>
          </div>
        </section>

        <section className="surface-card p-6">
          <h3 className="text-xl font-extrabold text-ink">Need a custom or specialty pickup?</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            If you do not see the item you need, or the job involves a specialty pickup, call or
            text us for a fast custom quote. We will make the next step easy.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="cta-secondary" href={company.phoneHref}>
              Call Now
            </a>
            <a className="cta-secondary" href={company.textHref}>
              Text for Custom Quote
            </a>
          </div>
        </section>
      </aside>
    </div>
  );
}
