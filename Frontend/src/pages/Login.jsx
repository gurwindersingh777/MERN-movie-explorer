import { Link } from "react-router-dom";
import { Input, LinkBtn } from "../components/Components.jsx";

export default function Login() {
  return (
    <div className=" w-screen h-screen flex justify-center items-center p-10">
      <div className="flex h-full w-115  justify-between  flex-col rounded-md  border border-neutral-800  p-8">
        <Link className="font-semibold text-xl ml-1" to="/">
          {" "}
          Movie Explorer
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Login now</h1>

        <form className="flex flex-col gap-5 mb-20 ">
          <Input
            label="Username"
            id="username"
            placeholder="Enter a username"
          />
          <Input
            label="Create Password"
            id="password"
            placeholder="Enter password"
          />
          <LinkBtn
            text="Log in"
            className="bg-blue-700 hover:bg-white hover:text-black"
          />
          <Link className="text-center text-xs text-neutral-300">Forget password?</Link>
        </form>

        <span className="text-sm mt-10 font-light">
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
