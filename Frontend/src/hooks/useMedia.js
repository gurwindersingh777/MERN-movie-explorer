import { useQuery } from "@tanstack/react-query"
import {  getMediaTrending } from "../services/mediaService"

export function useTrending(media_type, time_window) {
  return useQuery({
    queryFn: () => getMediaTrending(media_type, time_window),
    queryKey: [`trending-${media_type}-${time_window}`],
    retry : false
  })
}