import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/**
 * Reviews page component.
 * Fetches and displays client reviews with a rating of 4 or higher.
 */
const Reviews = () => {
  // State for reviews and error handling
  const [reviews, setReviews] = useState<any[]>([]);
  const [error, setError] = useState("");

  // Fetch reviews from the internal API on mount
  useEffect(() => {
    fetch("/api/admin/reviews", {
      headers: { Authorization: "Bearer mock-session-token" },
    })
      .then(res => res.json())
      .then(data => setReviews((data.reviews || []).filter((r: any) => r.rating >= 4)))
      .catch(() => setError("Failed to load reviews"));
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Client Testimonials
      </h1>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle>{review.name}</CardTitle>
              <div className="text-xs text-gray-500">{review.created_at?.slice(0, 10)}</div>
              <div className="flex items-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-gray-700">{review.comment}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews; 