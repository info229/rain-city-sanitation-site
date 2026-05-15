# Rain City Sanitation Website

Production-ready retail junk removal website for Rain City Sanitation, built with Next.js, TypeScript, and Tailwind CSS.

## What is included

- Conversion-focused Home, Pricing, How It Works, What We Take, Areas We Serve, and Contact pages
- Reusable component system for CTAs, pricing cards, FAQs, service grids, testimonials, gallery placeholders, and quote form
- Mobile-first layout with a sticky mobile CTA bar
- Theme tokens in a single editable file: [app/theme.css](C:/Users/peopl/OneDrive/Irrelevant/Desktop/Rain%20CIty%20Sanitation/bots/Outreach_engine/EV1/app/theme.css)
- Basic SEO metadata plus `robots.ts`, `sitemap.ts`, and local business schema
- Provided logo files wired into `public/` with editable placeholders still available if needed

## Run locally

1. Install Node.js 20 or newer.
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Live Google reviews setup

The site can fetch live reviews server-side from Google's Places API and safely fall back to curated testimonials when credentials are missing.

1. Create a Google Maps Platform API key with billing enabled.
2. Enable the Places API.
3. Get your Google Place ID for the business listing.
4. Create a local `.env.local` file based on `.env.example`.
5. Add:

```bash
GOOGLE_MAPS_API_KEY=your_key_here
GOOGLE_PLACE_ID=your_place_id_here
```

6. Restart the dev server.

Important notes:

- The Google API key should stay server-side only. Do not put it in client-side code.
- If the API key or Place ID is missing, the site will keep using curated review content instead of breaking.

## Instant estimate approval notifications

The instant quote tool now includes a confirmation step where a customer can approve the estimate, leave their email, phone number, and preferred pickup date, and send the request to you.

Recommended setup:

1. Create a [Resend](https://resend.com/) account.
2. Add and verify your sending domain.
3. Create an API key.
4. Add these values to `.env.local`:

```bash
RESEND_API_KEY=your_resend_api_key_here
NOTIFICATION_FROM_EMAIL=quotes@yourdomain.com
NOTIFICATION_EMAIL=info@raincitysanitation.com
```

Optional:

- If you prefer Zapier, Make, Slack, or another automation flow instead of email, you can set `ESTIMATE_NOTIFICATION_WEBHOOK_URL` and post approvals to your own webhook.

Important notes:

- `NOTIFICATION_FROM_EMAIL` must be a verified sender for your email service.
- If neither Resend nor a webhook is configured, the site will still accept the request but will not automatically notify you.

## Key files

- [app/page.tsx](C:/Users/peopl/OneDrive/Irrelevant/Desktop/Rain%20CIty%20Sanitation/bots/Outreach_engine/EV1/app/page.tsx)
- [app/instant-quote/page.tsx](C:/Users/peopl/OneDrive/Irrelevant/Desktop/Rain%20CIty%20Sanitation/bots/Outreach_engine/EV1/app/instant-quote/page.tsx)
- [app/api/estimate-approval/route.ts](C:/Users/peopl/OneDrive/Irrelevant/Desktop/Rain%20CIty%20Sanitation/bots/Outreach_engine/EV1/app/api/estimate-approval/route.ts)
- [components/instant-estimator.tsx](C:/Users/peopl/OneDrive/Irrelevant/Desktop/Rain%20CIty%20Sanitation/bots/Outreach_engine/EV1/components/instant-estimator.tsx)
- [lib/data.ts](C:/Users/peopl/OneDrive/Irrelevant/Desktop/Rain%20CIty%20Sanitation/bots/Outreach_engine/EV1/lib/data.ts)
- [lib/estimator.ts](C:/Users/peopl/OneDrive/Irrelevant/Desktop/Rain%20CIty%20Sanitation/bots/Outreach_engine/EV1/lib/estimator.ts)
- [app/theme.css](C:/Users/peopl/OneDrive/Irrelevant/Desktop/Rain%20CIty%20Sanitation/bots/Outreach_engine/EV1/app/theme.css)

## Customization notes

- Update the brand color tokens in `app/theme.css` when exact Rain City hex values are available.
- Replace the current logo assets in `public/brand-logo.png` and `public/favicon.png` with final brand files when ready.
- Swap placeholder testimonial copy in `lib/data.ts` for real customer reviews.
- Replace before/after placeholder panels with real project photos once available.
- Connect the instant estimate approval route to your preferred email service, CRM, or webhook flow.
- Update business contact details in `lib/data.ts` with the final phone, email, and service coverage language.

## Content assumptions

- Street address is still a placeholder value.
- Visuals are intentionally placeholder-first because the current media folder appears to be a raw working set rather than the final curated website photo set.
- The current theme palette is intentionally derived from the provided logo and can be refined once the final brand palette is chosen.
