export async function GET(req, res) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return res.status(500).json({ error: "Missing API key or place ID" });
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`
    );

    const data = await response.json();

    if (!response.ok || !data.result?.reviews) {
      return res.status(500).json({ error: "Failed to fetch Google reviews" });
    }

    // Format reviews to match your frontend needs
    const formattedReviews = data.result.reviews.map((review, i) => ({
      name: review.author_name,
      time: review.relative_time_description,
      text: review.text,
      stars: review.rating,
      profile: review.profile_photo_url || `/images/reviews/user${i + 1}.jpg`, // fallback if no photo
    }));

    res.status(200).json({ reviews: formattedReviews });
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    res.status(500).json({ error: "Internal server error",error });
  }
}
