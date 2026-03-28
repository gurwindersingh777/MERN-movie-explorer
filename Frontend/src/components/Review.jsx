import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { CircleUser, SendHorizontal, Star, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  useAddReview,
  useDeleteReview,
  useMediaReview,
  useUpdateReview,
} from "@/hooks/useReview";
import { Spinner } from "./ui/spinner";
import { useReviews } from "@/hooks/useMedia";
import MediaPagination from "./MediaPagination";

export default function Review({ media_type, tmdbID }) {

  const [page, setPage] = useState(1);

  const { data: tmdbReviews } = useReviews(media_type, tmdbID, { page });

  const { data: allReviews, isFetching } =
    useMediaReview(media_type, tmdbID);

  const { myReview, otherReviews } = allReviews || {};

  const { mutate: addReview, isPending: addPending } = useAddReview();
  const { mutate: deleteReview, isPending: deletePending } = useDeleteReview();
  const { mutate: updateReview, isPending: updatePending } = useUpdateReview();

  const [editPanel, setEditPanel] = useState(false);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState([0]);

  function handleReview(e) {
    e.preventDefault();

    if (editPanel) {
      updateReview(
        {
          id: myReview._id,
          media_type,
          tmdbID,
          content: review,
          rating: rating[0],
        },
        {
          onSuccess: () => {
            setEditPanel(false);
            setReview("");
            setRating([0]);
          },
        }
      );
    } else {
      addReview({
        content: review,
        rating: rating[0],
        media_type,
        tmdbID,
      });
    }
  }

  useEffect(() => {
    if (editPanel && myReview) {
      setReview(myReview.content);
      setRating([myReview.rating]);
    }
  }, [editPanel]);

  return (
    <div className="flex flex-col gap-6">

    
      <h2 className="text-2xl font-semibold flex items-center gap-2 border-b border-neutral-800 pb-3">
        <Star className="text-yellow-400" size={20} />
        Reviews & Ratings
      </h2>

      {/* ADD REVIEW */}
      {!myReview || editPanel ? (
        <form
          onSubmit={handleReview}
          className="flex flex-col gap-5 border border-neutral-800 p-6 rounded-2xl bg-neutral-900 shadow-sm"
        >

          <Textarea
            className="min-h-25 resize-none"
            placeholder="Share your thoughts about this movie..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div className="w-full sm:w-64">

              <div className="flex justify-between text-sm mb-2">

                <Label>Rating</Label>

                <span className="flex items-center gap-1 text-yellow-400 font-medium">
                  <Star size={14} fill="currentColor" />
                  {rating[0]}/10
                </span>

              </div>

              <Slider
                value={rating}
                onValueChange={setRating}
                min={0}
                max={10}
                step={1}
              />

            </div>

            <div className="flex gap-2">

              {editPanel && (
                <Button
                  variant="outline"
                  onClick={() => setEditPanel(false)}
                >
                  Cancel
                </Button>
              )}

              <Button disabled={!review.trim() || rating[0] === 0}>

                {addPending || updatePending || isFetching ? (
                  <Spinner />
                ) : (
                  <SendHorizontal />
                )}

              </Button>

            </div>

          </div>

        </form>
      ) : null}

      {/* MY REVIEW */}
      {myReview && !editPanel && (
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl flex flex-col gap-4 hover:border-neutral-700 transition">

          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">

            <div className="flex items-center gap-2 text-sm font-medium">
              My Review
              <span className="flex items-center gap-1 text-yellow-400">
                <Star size={14} fill="currentColor" />
                {myReview.rating}/10
              </span>
            </div>

            <div className="flex gap-2">

              <Button size="sm" onClick={() => setEditPanel(true)}>
                <PencilIcon size={16} />
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() =>
                  deleteReview({
                    id: myReview._id,
                    media_type,
                    tmdbID,
                  })
                }
              >
                {deletePending ? <Spinner /> : <TrashIcon size={16} />}
              </Button>

            </div>

          </div>

          <p className="text-sm leading-relaxed text-neutral-300">
            {myReview.content}
          </p>

        </div>
      )}

      {/* OTHER REVIEWS */}
      {otherReviews?.length > 0 && (
        <ScrollArea className="max-h-112.5 pr-3">

          <div className="flex flex-col gap-4">

            {otherReviews.map((review) => (

              <div
                key={review._id}
                className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl flex flex-col gap-4 hover:border-neutral-700 transition"
              >

                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">

                  <div className="flex items-center gap-3">

                    {review.user.avatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={review.user.avatar} />
                        <AvatarFallback>
                          {review.user.username[0]}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <CircleUser size={24} />
                    )}

                    <span className="text-sm font-medium">
                      {review.user.username}
                    </span>

                  </div>

                  <span className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Star size={14} fill="currentColor" />
                    {review.rating}
                  </span>

                </div>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {review.content}
                </p>

              </div>

            ))}

          </div>

          <ScrollBar orientation="vertical" />

        </ScrollArea>
      )}

      {/* TMDB REVIEWS */}
      {tmdbReviews?.results?.map((review) => (

        <div
          key={review.id}
          className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl flex flex-col gap-3"
        >

          <span className="text-xs font-medium text-neutral-400">
            TMDB • {review.author}
          </span>

          <p className="text-sm text-neutral-300 leading-relaxed">
            {review.content}
          </p>

        </div>

      ))}

      {tmdbReviews?.results?.length > 0 && (
        <MediaPagination
          totalPages={tmdbReviews.total_pages}
          page={page}
          setPage={setPage}
        />
      )}

    </div>
  );
}