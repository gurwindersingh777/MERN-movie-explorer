import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/authSchema";
import { useLogin } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="flex min-h-screen items-start justify-center px-10 pt-20 sm:items-center sm:py-10">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-neutral-800 p-6 sm:p-8">
        <Link className="font-mono text-xl font-semibold text-red-400" to="/">
          Movie Explorer
        </Link>

        <h1 className="text-2xl font-bold sm:text-3xl">Welcome back!</h1>

        <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4 sm:gap-5">
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            {errors.email && <FieldError>{errors.email.message}</FieldError>}

            <Input
              id="email"
              type="email"
              placeholder="Email address"
              {...register("email")}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}

            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
          </Field>

          <Button disabled={isPending} className="w-full">
            {isPending ? <Spinner /> : "Log in"}
          </Button>

          <Link className="text-center text-xs">Forget password?</Link>
        </form>

        <span className="text-center text-xs font-medium">
          Create a new account?{" "}
          <Link to="/register" className="hover:underline">
            Register now
          </Link>
        </span>
      </div>
    </div>
  );
}
