import { useQuery } from "@tanstack/react-query"
import { getMediaCategory, getMediaDetails, getMediaRecommendations, getMediaSearch, getMediaTrending } from "../services/mediaService"

export function useTrending(media_type, time_window) {
  return useQuery({
    queryFn: () => getMediaTrending(media_type, time_window),
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

export function useSearch(q) {
  return useQuery({
    queryFn: () => getMediaSearch(q),
    queryKey: ["search",q],
    retry : false
  })
}

