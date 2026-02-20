import { Link } from "react-router-dom";
import { Input, LinkBtn } from "../components/Components.jsx";

export default function Register() {
  return (
    <div className=" w-screen h-screen flex justify-center items-center p-10">
      <div className="flex h-full w-115  justify-between flex-col rounded-md  border border-neutral-800  p-8">
        <Link className="font-semibold text-xl ml-1" to="/">
          {" "}
          Movie Explorer
        </Link>
        <h1 className="mt-6 text-3xl font-bold mb-5">Create a free account</h1>

        <form className="flex flex-col gap-5 ">
          <Input
            label="Username"
            id="username"
            placeholder="Enter a username"
          />
          <Input
            label="Email address"
            id="email"
            placeholder="Email address to get started"
          />
          <div className="flex w-full justify-between my-2">
            <Input
              label="Create Password"
              id="password"
              placeholder="Enter password"
            />
            <Input
              label="Repeat Password"
              id="repeatPassword"
              placeholder="Repeat password"
            />
          </div>

          <LinkBtn
            text="Sign up"
            className="bg-blue-700 hover:bg-white hover:text-black"
          />
        </form>

        <span className="text-sm mt-10 font-light">
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

{
  /* {usernameErr && (
              <span className="text-[11px] text-red-600">
                Username must be at least 5 characters
              </span>
            )} */
}

{
  /* {emailErr && (
              <span className="text-[11px] text-red-600">
                Enter a valid e-mail
              </span>
            )} */
}
