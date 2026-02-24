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
    <div className=" w-screen h-screen flex justify-center items-center p-10">
      <div className="flex h-full w-100  justify-between  flex-col rounded-3xl  border border-neutral-800  p-10">
        <Link className="font-semibold text-xl ml-1 font-mono text-red-400" to="/">
          {" "}
          Movie Explorer
        </Link>
        <h1 className="mt-6  text-3xl font-bold mb-10 ">Welcome back!</h1>

        <form
          onSubmit={handleSubmit(mutate)}
          className="flex flex-col gap-5 mb-10 "
        >
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

          <Button disabled={isPending}>
            {isPending ? <Spinner /> : "Log in"}
          </Button>
          <Link className="text-center text-xs ">Forget password?</Link>
        </form>

        <span className="text-xs font-medium mt-10 ">
          Create a new account?{" "}
          <Link to="/register">
            <Button className="pl-0.5" size="xs" variant="link">Register now</Button>
          </Link>
        </span>
      </div>
    </div>
  );
}
