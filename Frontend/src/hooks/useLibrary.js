import { addToFavorite, addToWatchlater, getAllFavorite, getAllWatchlater, getMediaFavorite, getMediaWatchlater, removeFromFavorite, removeFromWatchlater } from "@/services/libraryService";
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

export function useAllWatchlater(page) {
  return useQuery({
    queryFn: () => getAllWatchlater(page),
    queryKey: ["watchlater", page],
    retry: false
  })
}

export function useAddToFavorite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => addToFavorite(data),
    onSuccess: (_, variables) => {
      toast.success("Added To Favorites");
      queryClient.invalidateQueries({
        queryKey: ["favorite", variables.tmdbID]
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message || 'Failed to Add in Favorites');
    },
  })
}

export function useRemoveFromFavorite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }) => removeFromFavorite(id),
    onSuccess: (_, variables) => {
      toast.success("Remove From Favorites");
      queryClient.setQueryData(
        ["favorite", variables.tmdbID],
        null
      )
      queryClient.invalidateQueries({
        queryKey: ["favorite"]
      })
    },
    onError: (error) => {
      toast.error('Failed to Remove From Favorites' || error.response?.data?.message || error.message);
    },
  })
}

export function useMediaFavorite(tmdbID) {
  return useQuery({
    queryFn: () => getMediaFavorite(tmdbID),
    queryKey: ["favorite", tmdbID],
    retry: false
  })
}

export function useAllFavorite(page) {
  return useQuery({
    queryFn: () => getAllFavorite(page),
    queryKey: ["favorite", page],
    retry: false
  })
}