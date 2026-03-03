import { addToWatchlater, getAllWatchlater, getMediaWatchlater, removeFromWatchlater } from "@/services/libraryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddToWatchlater() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => addToWatchlater(data),
    onSuccess: (_, variables) => {
      toast.success("Added To Watchlaters");
      queryClient.invalidateQueries({
        queryKey: ["watchlater", variables.tmdbID]
      })
    },
    onError: (error) => {
      toast.error('Failed to Add in  Watchlaters' || error.response?.data?.message || error.message);
    },
  })
}

export function useRemoveFromWatchlater() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }) => removeFromWatchlater(id),
    onSuccess: (_, variables) => {
      toast.success("Remove From Watchlaters");
      queryClient.setQueryData(
        ["watchlater", variables.tmdbID],
        null
      )
    },
    onError: (error) => {
      toast.error('Failed to Remove From Watchlaters' || error.response?.data?.message || error.message);
    },
  })
}

export function useMediaWatchlater(tmdbID) {
  return useQuery({
    queryFn: () => getMediaWatchlater(tmdbID),
    queryKey: ["watchlater", tmdbID],
    retry: false
  })
}

export function useAllWatchlater() {
  return useQuery({
    queryFn: () => getAllWatchlater(),
    queryKey: ["watchlater"],
    retry: false
  })
}