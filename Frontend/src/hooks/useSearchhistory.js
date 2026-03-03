import { addToSearchHistory, getSearchHistory, removeFromSearchHistory } from "@/services/searchhistoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAddSearchhistory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => addToSearchHistory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["searchhistory"]
      })
    },
  })
}

export function useSearchhistory() {
  return useQuery({
    queryFn: () => getSearchHistory(),
    queryKey: ["searchhistory"]
  })
}

export function useRemoveSearchhistory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => removeFromSearchHistory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["searchhistory"]
      })
    },
  })
}