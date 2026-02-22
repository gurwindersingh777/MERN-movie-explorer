import { getCurrentUser, loginUser, logoutUser, registerUser } from "../services/authService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Account created successfully");
      navigate("/", { replace: true });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success(`Welcome back ${data?.user?.username}`);
      navigate("/", { replace: true });
    },

    onError: (error) => {
      toast.error(error.response?.data?.error || error.message);
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong while logout"
      );
    },
  });
}