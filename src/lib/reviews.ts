/**
 * Real Google reviews for ACE Game Room Gallery, all 5 stars, checked on the
 * Google Maps listing on 2026-11-05. The text is our summary of each review,
 * not the reviewer's words, so don't add quotation marks around it. To show
 * exact wording, get Ace's OK or use Google's Places API.
 */

export const GOOGLE_RATING = { score: "4.9", count: 277 }

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/ACE+Game+Room+Gallery/@41.073975,-85.1741569,17z"

export interface ReviewSummary {
  name: string
  topic: string
  summary: string
}

export const REVIEWS: ReviewSummary[] = [
  {
    name: "Rob H.",
    topic: "New Olhausen table",
    summary: "Credits the install crew with an excellent job, and says the staff know the business well.",
  },
  {
    name: "Jase O.",
    topic: "Pool table purchase",
    summary: "Had a good experience with both sales and install, and the table went exactly where it was wanted.",
  },
  {
    name: "Dylan S.",
    topic: "Rainbow playset install",
    summary: "The kids love it. The crew finished quickly on a job that would have taken days alone.",
  },
  {
    name: "Jake B.",
    topic: "Pool table move",
    summary: "Hired Ace to move a used table between homes, and found everyone from the manager to the crew professional.",
  },
  {
    name: "Carolyn Z.",
    topic: "Playset",
    summary: "Appreciated clear communication on pricing and delivery, and friendly, efficient installers.",
  },
  {
    name: "M. L.",
    topic: "Move and re-felt",
    summary: "A 25-year-old table was moved, re-felted, and reinstalled, leaving the family very happy with the result.",
  },
  {
    name: "Kyle N.",
    topic: "Repeat customer",
    summary: "Has bought several items over the years and reports an outstanding experience every time.",
  },
  {
    name: "Jaxon H.",
    topic: "New cloth and bumpers",
    summary: "An older table got new cloth and bumpers from installers who worked fast and did the job well.",
  },
  {
    name: "B. C.",
    topic: "New pool table install",
    summary: "Two kind, professional installers set up the table efficiently and answered every question.",
  },
]
