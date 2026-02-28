import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { CircleUser, SendHorizontal, Star } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useAddReview, useMediaReview } from "@/hooks/useReview";
import { Spinner } from "./ui/spinner";

export default function Review({ reviews, media_type, tmdbID }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState([0]);

  const { mutate, isPending } = useAddReview();
  const { data: myReview , isFetching } = useMediaReview(media_type, tmdbID);

  function handleReview(e) {
    e.preventDefault();
    mutate({ content: review, rating: rating[0], media_type, tmdbID });
  }
  return (
    <div className="mt-30 flex flex-col items-start border-t">
      <h1 className=" self-start text-2xl my-8 font-medium">
        Reviews and Ratings
      </h1>

      <div className="flex flex-col gap-3 w-full ">

        {myReview ? (
          <div className="flex flex-col gap-3 bg-neutral-800 p-5 rounded-lg">
            <div className="flex items-center justify-between border-b pb-2">
              <h1 className="text-sm">My Review</h1>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
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
              <Button disabled={!review.trim() || rating[0] === 0}>
                {isPending || isFetching ? <Spinner /> : <SendHorizontal />}
              </Button>{" "}
            </div>
          </form>
        )}

        {reviews?.results?.map((review) => (
          <div
            key={review.id}
            className="flex gap-4 bg-neutral-800 p-5 rounded-lg justify-between"
          >
            <div className="flex items-center gap-4 ">
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
              <ScrollArea>
                <p className="text-sm max-h-18">{review.content}</p>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
            {review.author_details.rating && (
              <span className="flex justify-center items-center gap-1 text-sm  p-1">
                <Star size={14} /> {review.author_details.rating}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
