import { addToSearchHistory, getSearchHistory } from "@/services/searchhistoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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