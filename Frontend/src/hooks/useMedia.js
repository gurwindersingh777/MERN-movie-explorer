import { useQuery } from "@tanstack/react-query"
import { getMediaCategory, getMediaDetails, getMediaDiscover, getMediaGenre, getMediaSearch, getMediaTrending } from "../services/mediaService"

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
  })
}

export function useSearch(q) {
  return useQuery({
    queryFn: () => getMediaSearch(q),
    queryKey: ["search", q],
  })
}

export function useGenre(media_type) {
  return useQuery({
    queryFn: () => getMediaGenre(media_type),
    queryKey: ["genre", media_type],
  })
}

export function useDiscover(media_type, filters) {
  return useQuery({
    queryFn: () => getMediaDiscover(media_type, filters),
    queryKey: ["discover", media_type, filters],
  })
}
