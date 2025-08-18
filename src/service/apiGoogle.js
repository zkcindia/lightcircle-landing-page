export const getReviewHandler=async()=> {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
console.log(apiKey,placeId);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Google API request failed" });
    }

    const data = await response.json();

    const reviews =
      data.result?.reviews?.map((r, i) => ({
        name: r.author_name,
        time: r.relative_time_description,
        text: r.text,
        stars: r.rating,
        profile:
          r.profile_photo_url || `/images/reviews/user${(i % 4) + 1}.jpg`,
      })) || [];

    res.status(200).json({ reviews });
  } catch (err) {
    console.error("Error fetching Google reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}
