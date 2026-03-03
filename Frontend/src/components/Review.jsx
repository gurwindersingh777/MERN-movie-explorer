import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { CircleUser, SendHorizontal, Settings, Star } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  useAddReview,
  useDeleteReview,
  useMediaReview,
  useUpdateReview,
} from "@/hooks/useReview";
import { Spinner } from "./ui/spinner";
import { PencilIcon, TrashIcon } from "lucide-react";

export default function Review({ reviews, media_type, tmdbID }) {
  const { data: allReview, isFetching } = useMediaReview(media_type, tmdbID);
  const { myReview, otherReviews } = allReview || {};
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
        },
      );
    } else {
      addReview({ content: review, rating: rating[0], media_type, tmdbID });
    }
  }

  useEffect(() => {
    if (editPanel && myReview) {
      setReview(myReview.content);
      setRating([myReview.rating]);
    }
  }, [editPanel, allReview]);

  return (
    <div className="mt-30 flex flex-col items-start border-t">
      <h1 className=" self-start text-2xl my-8 font-medium">
        Reviews and Ratings
      </h1>

      <div className="flex flex-col gap-3 w-full ">
        {myReview && !editPanel ? (
          <div className="flex flex-col gap-3 bg-neutral-700 p-5 rounded-lg">
            <div className="flex items-center justify-between border-b pb-3">
              <h1 className="text-sm">My Review</h1>

              <div className="flex gap-3">
                <Button size="sm" onClick={() => setEditPanel(true)}>
                  {" "}
                  <PencilIcon /> Edit{" "}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    deleteReview({
                      id: myReview?._id,
                      media_type,
                      tmdbID,
                    })
                  }
                >
                  {deletePending ? <Spinner /> : <TrashIcon />} Delete
                </Button>
              </div>
            </div>
            <div className="flex  gap-4  justify-between">
              <div className="flex items-center gap-4 ">
                {myReview?.avatar ? (
                  <Avatar>
                    <AvatarImage
                      src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`}
                      alt="Avatar"
                    />
                    <AvatarFallback>{review.author}</AvatarFallback>
                  </Avatar>
                ) : (
                  <span>
                    <CircleUser />
                  </span>
                )}
                <ScrollArea>
                  <p className="text-sm max-h-18">{myReview.content}</p>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
              <span className="flex justify-center items-center gap-1 text-sm  p-1">
                <Star size={14} /> {myReview.rating}
              </span>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleReview}
            className="flex flex-col gap-3 p-5 m-5  border rounded-2xl w-1/2"
          >
            <h5 className="text-sm ">Enter your reviews </h5>
            <Textarea
              placeholder="Type your review here."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
            <div className="flex justify-between w-full">
              <div className=" w-1/2 ">
                <div className="flex justify-between pb-2">
                  <Label htmlFor="rating">Rating</Label>
                  <span className="text-muted-foreground text-sm flex items-center gap-0.5">
                    <Star size={14} /> {rating[0]}
                  </span>
                </div>
                <Slider
                  id="rating"
                  value={rating}
                  onValueChange={setRating}
                  min={0}
                  max={10}
                  step={1}
                />
              </div>
              <div className="flex gap-2 items-center">
                {editPanel && (
                  <Button variant="outline" onClick={() => setEditPanel(false)}>
                    Cancel
                  </Button>
                )}
                <Button disabled={!review.trim() || rating[0] === 0}>
                  {addPending || isFetching || updatePending ? (
                    <Spinner />
                  ) : (
                    <SendHorizontal />
                  )}
                </Button>{" "}
              </div>
            </div>
          </form>
        )}

        {/* app reviews  */}
        {otherReviews?.map((review) => (
          <div
            key={review._id}
            className="flex flex-col gap-4 bg-neutral-700 p-5 rounded-lg items-start"
          >
            <div className="flex  items-center  gap-2 border-b w-full pb-3">
              {review.user.avatar ? (
                <Avatar>
                  <AvatarImage
                    src={`https://image.tmdb.org/t/p/original${review.user.avatar}`}
                    alt="Avatar"
                  />
                  <AvatarFallback>{review.user.username}</AvatarFallback>
                </Avatar>
              ) : (
              <span>
                <CircleUser />
              </span>
               )} 
              <span className="text-xs">{review?.user.username}</span>
            </div>
            <div className="flex w-full items-center gap-4  justify-between">
              <ScrollArea>
                <p className="text-sm max-h-18">{review.content}</p>
                <ScrollBar orientation="vertical" />
              </ScrollArea>

              <span className="flex justify-center items-center gap-1 text-sm  p-1">
                <Star size={14} /> {review.rating}
              </span>
            </div>
          </div>
        ))}
        {/* tmdb reviews */}
        {reviews?.results?.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-4 bg-neutral-800 p-5 rounded-lg items-start"
          >
            <div className="flex  items-center  gap-2 border-b w-full pb-3">
              {review.author_details.avatar_path ? (
                <Avatar>
                  <AvatarImage
                    src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`}
                    alt="Avatar"
                  />
                  <AvatarFallback>{review.author}</AvatarFallback>
                </Avatar>
              ) : (
                <span>
                  <CircleUser />
                </span>
              )}
              <span className="text-xs">{review.author_details.username}</span>
            </div>
            <div className="flex items-center gap-4 ">
              <ScrollArea>
                <p className="text-sm max-h-18">{review.content}</p>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
              {review.author_details.rating && (
                <span className="flex justify-center items-center gap-1 text-sm  p-1">
                  <Star size={14} /> {review.author_details.rating}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
