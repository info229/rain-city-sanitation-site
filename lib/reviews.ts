import { testimonials } from "@/lib/data";

export type Review = {
  author: string;
  quote: string;
  rating: number;
  relativeTime?: string;
};

type ReviewSource = "curated" | "google";

export async function getReviews(): Promise<{
  reviews: Review[];
  source: ReviewSource;
  averageRating: number;
  totalRatings?: number;
}> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return {
      reviews: testimonials.map((testimonial) => ({
        author: testimonial.name,
        quote: testimonial.quote,
        rating: 5,
      })),
      source: "curated",
      averageRating: 5,
      totalRatings: testimonials.length,
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "displayName,rating,userRatingCount,reviews.text.text,reviews.rating,reviews.relativePublishTimeDescription,reviews.authorAttribution.displayName",
      },
      signal: controller.signal,
      next: { revalidate: 3600 },
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      throw new Error(`Google reviews request failed with ${response.status}`);
    }

    const data = (await response.json()) as {
      rating?: number;
      userRatingCount?: number;
      reviews?: Array<{
        rating?: number;
        relativePublishTimeDescription?: string;
        text?: { text?: string };
        authorAttribution?: { displayName?: string };
      }>;
    };

    const liveReviews =
      data.reviews
        ?.map((review) => ({
          author: review.authorAttribution?.displayName || "Google reviewer",
          quote: review.text?.text || "",
          rating: review.rating || 5,
          relativeTime: review.relativePublishTimeDescription,
        }))
        .filter((review) => review.quote.trim().length > 0)
        .slice(0, 6) || [];

    if (liveReviews.length === 0) {
      throw new Error("Google reviews returned no text reviews");
    }

    return {
      reviews: liveReviews,
      source: "google",
      averageRating: data.rating || 5,
      totalRatings: data.userRatingCount,
    };
  } catch {
    return {
      reviews: testimonials.map((testimonial) => ({
        author: testimonial.name,
        quote: testimonial.quote,
        rating: 5,
      })),
      source: "curated",
      averageRating: 5,
      totalRatings: testimonials.length,
    };
  }
}
