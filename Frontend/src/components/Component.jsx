import { Link } from "react-router-dom";

export function LoginAndSignupBtn() {
  return (
    <div className="flex  gap-2">
      <Link
        to="login"
        className="bg-blue-700 h-8 text-sm font-semibold p-1.5 px-5 rounded-md hover:bg-blue-800 transition"
      >
        Log in
      </Link>
      <Link
        to="register"
        className="bg-white text-black text-sm font-semibold p-1.5 px-5 rounded-md hover:bg-neutral-300 transition"
      >
        Sign up
      </Link>
    </div>
  );
}

