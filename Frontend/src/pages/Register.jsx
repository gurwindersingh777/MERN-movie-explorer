import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authService.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const registerSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Register() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const { accessToken, user } = data;
      localStorage.setItem("accessToken", accessToken);
      setUser(user);
      navigate("/");
      toast.success("Account created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  return (
    <div className=" w-screen h-screen flex justify-center items-center p-10">
      <div className="flex h-full w-100  justify-between flex-col rounded-3xl  border border-neutral-700  p-10">
        <Link className="font-semibold text-xl ml-1" to="/">
          {" "}
          Movie Explorer
        </Link>
        <h1 className=" text-3xl font-bold mb-5 ">Create a free account</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 "
        >
          {/* Username */}
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between items-center">
              <label
                className="text-[12px] text-neutral-200"
                htmlFor="password"
              >
                {" "}
                Username
              </label>
              {errors.username && (
                <span className="text-[11.5px]  text-red-700" an>
                  {errors.username.message}
                </span>
              )}
            </div>

            <input
              {...register("username")}
              id="username"
              className="w-full h-10 border border-neutral-700 bg-neutral-900 text-[13px] px-3   rounded-sm "
              placeholder="Enter a username"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between items-center">
              <label
                className="text-[12px] text-neutral-200"
                htmlFor="password"
              >
                {" "}
                Email address
              </label>
              {errors.email && (
                <span className="text-[11.5px]  text-red-700">
                  {errors.email.message}
                </span>
              )}
            </div>
            <input
              {...register("email")}
              id="email"
              className="w-full h-10 border border-neutral-700 bg-neutral-900 text-[13px] px-3   rounded-sm "
              placeholder="Email address to get started"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between items-center">
              <label
                className="text-[12px] text-neutral-200"
                htmlFor="password"
              >
                {" "}
                Create Password
              </label>
              {errors.password && (
                <span className="text-[11.5px]  text-red-700" an>
                  {errors.password.message}
                </span>
              )}
            </div>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="w-full h-10 border border-neutral-700 bg-neutral-900 text-[13px] px-3   rounded-sm "
              placeholder="Enter password"
            />
          </div>

          <button
            disabled={mutation.isPending}
            className="flex items-center justify-center h-10 w-full  text-sm border font-medium border-neutral-500   rounded-md transition bg-blue-700 hover:bg-blue-800"
          >
            {mutation.isPending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <span className="text-xs mt-10 font-light">
          Already have an account?{" "}
          <Link to="/login">
            <span className="font-semibold hover:underline cursor-pointer">
              Login now
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
}
