import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/useAuth.js";
import { registerSchema } from "../schema/authSchema.js";
import { Field, FieldError, FieldLabel } from "@/components/ui/field.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Spinner } from "@/components/ui/spinner";

export default function Register() {
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  return (
    <div className="flex h-full items-start justify-center sm:items-center sm:p-10">
      <div className="m-10 flex w-full max-w-md flex-col gap-6 rounded-2xl border border-neutral-800 p-6 sm:p-8">
        <Link className="font-mono text-xl font-semibold text-red-400" to="/">
          Movie Explorer
        </Link>

        <h1 className="text-xl font-bold sm:text-3xl">Create a new account</h1>

        <form
          onSubmit={handleSubmit(mutate)}
          className="flex flex-col gap-4 sm:gap-5"
        >
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>

            {errors.username && (
              <FieldError>{errors.username.message}</FieldError>
            )}

            <Input
              id="username"
              placeholder="Enter username"
              {...register("username")}
            />
          </Field>

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
            {isPending ? <Spinner /> : "Sign up"}
          </Button>
        </form>

        <span className="text-center text-xs font-medium">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline">
            Login now
          </Link>
        </span>
      </div>
    </div>
  );
}
