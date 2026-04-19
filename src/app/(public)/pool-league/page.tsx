import type { Metadata } from "next"
import PoolLeagueClient from "./PoolLeagueClient"

export const metadata: Metadata = {
  title: "Pool League",
  description:
    "Ace Game Room Gallery's Fort Wayne pool league — tournaments, banquets, and league play. Join the community that racks every week.",
}

export default function PoolLeaguePage() {
  return <PoolLeagueClient />
}
