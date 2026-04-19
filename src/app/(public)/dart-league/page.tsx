import type { Metadata } from "next"
import DartLeagueClient from "./DartLeagueClient"

export const metadata: Metadata = {
  title: "Dart League",
  description:
    "Ace Game Room Gallery's Fort Wayne dart league — tournaments, league play, and community. Next season announced soon.",
}

export default function DartLeaguePage() {
  return <DartLeagueClient />
}
