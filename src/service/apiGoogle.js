// export const getReviewHandler=async()=> {
//   try {
//     const apiKey = "AIzaSyD9Ubz-DThoPFYnuptWWvovKRYavOX21ko";
//     const placeId = 'ChIJFzsxpaWnGToRceDWZiWMa_4';
// console.log(apiKey,placeId,'called');

//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`
//     );

//     if (!response.ok) {
//       return response.status(500).json({ error: "Google API request failed" });
//     }

//     const data = await response.json();

//     const reviews =
//       data.result?.reviews?.map((r, i) => ({
//         name: r.author_name,
//         time: r.relative_time_description,
//         text: r.text,
//         stars: r.rating,
//         profile:
//           r.profile_photo_url || `/images/reviews/user${(i % 4) + 1}.jpg`,
//       })) || [];

//     response.status(200).json({ reviews });
//   } catch (err) {
//     console.error("Error fetching Google reviews:", err);
//     response.status(500).json({ error: "Failed to fetch reviews" });
//   }
// }

export const getReviewHandler = async () => {
  return await fetch("/api/reviews",{ method: "GET" });
};