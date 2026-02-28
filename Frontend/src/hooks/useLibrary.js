import { addToWatchlater, getMediaWatchlater } from "@/services/libraryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export function useAddToWatchlater() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => addToWatchlater(data),
    onSuccess: (_,variable) => {
      toast.success("Added To Watchlaters");
      queryClient.invalidateQueries({
        queryKey:["watchlater",variable.tmdbID]
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  })
}

export function useMediaWatchlater(tmdbID) {
  return useQuery({
    queryFn: () => getMediaWatchlater(tmdbID),
    queryKey: ["watchlater", tmdbID],
    retry : false
  })
}