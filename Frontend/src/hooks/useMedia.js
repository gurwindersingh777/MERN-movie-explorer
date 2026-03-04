import { useQuery } from "@tanstack/react-query"
import { getMediaCategory, getMediaDetails, getMediaDiscover, getMediaGenre, getMediaSearch, getMediaTrending } from "../services/mediaService"

export function useTrending(media_type, time_window, filters) {
  return useQuery({
    queryFn: () => getMediaTrending(media_type, time_window, filters),
    queryKey: ["trending", time_window, filters],
  })
}

export function useCategory(media_type, category, filters) {
  return useQuery({
    queryFn: () => getMediaCategory(media_type, category, filters),
    queryKey: ["category", media_type, category, filters],
  })
}

export function useDetails(media_type, tmdbID) {
  return useQuery({
    queryFn: () => getMediaDetails(media_type, tmdbID),
    queryKey: ["details", media_type, tmdbID],
  })
}

export function useSearch(q, page) {
  return useQuery({
    queryFn: () => getMediaSearch(q, page),
    queryKey: ["search", q, page],
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
