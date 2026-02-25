import { useQuery } from "@tanstack/react-query"
import { getMediaCategory, getMediaDetails, getMediaRecommendations, getMediaTrending } from "../services/mediaService"

export function useTrending( time_window) {
  return useQuery({
    queryFn: () => getMediaTrending( time_window),
    queryKey: ["trending", time_window],
  })
}

export function useCategory(media_type, category) {
  return useQuery({
    queryFn: () => getMediaCategory(media_type, category),
    queryKey: ["category", media_type, category],
  })
}

export function useDetails(media_type, tmdbID) {
  return useQuery({
    queryFn: () => getMediaDetails(media_type, tmdbID),
    queryKey: ["details", media_type, tmdbID],
    retry : false
  })
}

