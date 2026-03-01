
import { addReview, deleteReview, getMediaReview, updateReview } from "@/services/reviewService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export function useAddReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => addReview(data),
    onSuccess: (_, variables) => {
      toast.success("Review Added");
      queryClient.invalidateQueries({
        queryKey: ["review", variables.media_type, variables.tmdbID]
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  })
}

export function useUpdateReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, content, rating  }) => updateReview(id, { content, rating }),
    onSuccess: (_, variables) => {
      toast.success("Review Updated");
      queryClient.invalidateQueries({
        queryKey: ["review", variables.media_type, variables.tmdbID]
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  })
}

export function useDeleteReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }) => deleteReview(id),
    onSuccess: (_, variables) => {
      toast.success("Review Deleted");
      queryClient.invalidateQueries({
        queryKey: ["review", variables.media_type, variables.tmdbID]
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  })
}

export function useMediaReview(media_type, tmdbID) {
  return useQuery({
    queryFn: () => getMediaReview(media_type, tmdbID),
    queryKey: ["review", media_type, tmdbID],
    retry: false
  })
}



