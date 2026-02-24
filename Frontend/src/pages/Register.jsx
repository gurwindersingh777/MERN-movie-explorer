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
    <div className=" w-screen h-screen flex justify-center items-center p-8">
      <div className="flex h-full w-100  justify-between flex-col rounded-3xl  border border-neutral-800  p-10">
        <Link className="font-semibold text-xl ml-1 font-mono text-red-400" to="/">
          {" "}
          Movie Explorer
        </Link>
        <h1 className=" text-3xl font-bold mb-2 ">Create a new account</h1>

        <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-5 ">
          <Field  >
            <FieldLabel htmlFor="username">Username</FieldLabel>
            {errors.username && (
              <FieldError>{errors?.username.message}</FieldError>
            )}

            <Input
              id="username"
              type="username"
              placeholder="Enter a username"
              {...register("username")}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            {errors.email && <FieldError>{errors?.email.message}</FieldError>}

            <Input
              id="email"
              type="email"
              placeholder="Email address to get started"
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
              placeholder="Password address to get started"
              {...register("password")}
            />
          </Field>

          <Button
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Sign up"}
          </Button>
        </form>

        <span className="text-xs font-medium mt-5 ">
          Already have an account?{" "}
          <Link to="/login">
          <Button className="pl-0.5" size="xs" variant="link">Login now</Button>
          </Link>
        </span>
      </div>
    </div>
  );
}
