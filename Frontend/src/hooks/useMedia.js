import { useQuery } from "@tanstack/react-query"
import { getMediaCategory, getMediaRecommendations, getMediaTrending } from "../services/mediaService"

export function useTrending(media_type, time_window) {
  return useQuery({
    queryFn: () => getMediaTrending(media_type, time_window),
    queryKey: [`trending-${media_type}-${time_window}`],
    retry: false
  })
}

export function useCategory(media_type, category) {
  return useQuery({
    queryFn: () => getMediaCategory(media_type, category),
    queryKey: [`category-${category}-${media_type}`],
    retry: false
  })
}

