"use client";

export function QuoteForm() {
  return (
    <form className="surface-card space-y-5 p-6 sm:p-8" action="#" method="post">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Name</span>
          <input
            required
            type="text"
            name="name"
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-muted/60 focus:border-brand"
            placeholder="Your full name"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Phone</span>
          <input
            required
            type="tel"
            name="phone"
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-muted/60 focus:border-brand"
            placeholder="Best number to reach you"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Email</span>
          <input
            type="email"
            name="email"
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-muted/60 focus:border-brand"
            placeholder="you@example.com"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Address / ZIP</span>
          <input
            required
            type="text"
            name="location"
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-muted/60 focus:border-brand"
            placeholder="Service address or ZIP"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-ink">What needs to be removed</span>
        <textarea
          required
          name="details"
          rows={5}
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-muted/60 focus:border-brand"
          placeholder="List the items, quantity, floor level, and anything else helpful."
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Preferred time</span>
          <select
            name="time"
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-brand"
            defaultValue="Next available"
          >
            <option>Next available</option>
            <option>Same day</option>
            <option>Next day</option>
            <option>Morning</option>
            <option>Afternoon</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink">Photo upload</span>
          <input
            type="file"
            name="photo"
            className="w-full rounded-2xl border border-dashed border-line bg-surfaceStrong px-4 py-3 text-sm text-muted"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-brand/20 bg-brand-soft p-4 text-sm leading-7 text-brand-dark">
        Texting photos usually gets the fastest quote. This form is wired as a front-end placeholder, so connect it
        to your email, CRM, or form handler when you are ready to go live.
      </div>

      <button type="submit" className="cta-primary w-full sm:w-auto">
        Get My Quote
      </button>
    </form>
  );
}
