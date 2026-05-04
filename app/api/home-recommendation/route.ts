import { NextResponse } from "next/server";
import { auth } from "@/auth";
import * as recoService from "@/modules/home/services/recommendationServices";
import { buildUserPreferenceVector } from "@/lib/recommendation-item";

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user.id;

    // SCENARIO 1: GUEST USER (Execute parallelly)
    if (!userId) {
      const [recommended, youMayLike] = await Promise.all([
        recoService.getTrendingProducts(),
        recoService.getNewArrivals(),
      ]);
      return NextResponse.json({ recommended, youMayLike });
    }

    // SCENARIO 2: LOGGED IN USER
    const prefs = await buildUserPreferenceVector(userId);
    const hasPrefs = prefs.topCategories.length > 0;

    // Fetch data in parallel to save time
    const [personalizedRecs, personalizedLike, trending, arrivals, topRated] = await Promise.all([
      hasPrefs ? recoService.fetchProductsByCategory(prefs.topCategories, 10) : Promise.resolve([]),
      hasPrefs ? recoService.fetchProductsByCategory(prefs.topCategories, 12) : Promise.resolve([]),
      recoService.getTrendingProducts(),
      recoService.getNewArrivals(),
      recoService.getTopRated(),
    ]);

    return NextResponse.json({
      recommended: personalizedRecs.length > 0 ? personalizedRecs : topRated,
      youMayLike: personalizedLike.length > 0 ? personalizedLike : arrivals,
    });

  } catch (error) {
    console.error("RECOMMENDATION_API_ERROR:", error);
    return NextResponse.json({ error: "Failed to load recommendations" }, { status: 500 });
  }
}