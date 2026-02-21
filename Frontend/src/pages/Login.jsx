import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { accessToken, user } = data;
      localStorage.setItem("accessToken", accessToken);
      setUser(user);
      navigate("/");
      toast.success("Login Successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data.error);
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }
  return (
    <div className=" w-screen h-screen flex justify-center items-center p-10">
      <div className="flex h-full w-100  justify-between  flex-col rounded-3xl  border border-neutral-700  p-10">
        <Link className="font-semibold text-xl ml-1" to="/">
          {" "}
          Movie Explorer
        </Link>
        <h1 className="mt-6  text-3xl font-bold mb-10">Login now</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mb-10 "
        >
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
                Password
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
            text={`${mutation.isPending ? "Logging..." : "Log in"}`}
            className="flex items-center justify-center h-10 w-full  text-sm border font-medium border-neutral-500   rounded-md transition bg-blue-700 hover:bg-blue-800"
          >
            Log in
          </button>
          <Link className="text-center text-xs text-neutral-300">
            Forget password?
          </Link>
        </form>

        <span className="text-xs mt-10 font-light">
          Create a new account?{" "}
          <Link to="/register">
            <span className="font-semibold hover:underline cursor-pointer">
              Register now
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
}
