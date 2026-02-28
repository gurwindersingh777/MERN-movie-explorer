
import { addReview, getMediaMyReview } from "@/services/reviewService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export function useAddReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => addReview(data),
    onSuccess: (_, variable) => {
      toast.success("Review Added");
      queryClient.invalidateQueries({
        queryKey: ["review", variable.media_type, variable.tmdbID]
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  })
}

export function useMediaReview(media_type, tmdbID) {
  return useQuery({
    queryFn: () => getMediaMyReview(media_type, tmdbID),
    queryKey: ["review", media_type, tmdbID],
    retry: false
  })
}
