import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { useLogout } from "../hooks/useAuth";
import { MdLogout } from "react-icons/md";
import { RiSettingsFill } from "react-icons/ri";

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

export function AccountNavbarBtn({ username }) {
  const { mutate, isPending } = useLogout();

  if (isPending) {
    return <Spinner />;
  }

  function handleLogout() {
    mutate();
  }

  return (
    <div className="group relative flex items-center gap-1 bg-neutral-800 px-3 py-1 border border-neutral-700 cursor-pointer hover:bg-neutral-700 transition-colors duration-200">
      <span className="text-[21px]">
        {" "}
        <MdAccountCircle />{" "}
      </span>
      <span className="text-sm ">{username}</span>

      <div className="absolute right-0 top-full opacity-0 group-hover:opacity-100 transition-all duration-200 ">
        <div className="pt-2">
          <div className="bg-neutral-800 border border-neutral-700  w-36">
            <div className="flex items-center gap-2 px-3 py-2 text-sm  hover:bg-neutral-500 hover:text-white cursor-pointer">
              <span className="text-lg">
                <MdAccountCircle />
              </span>
              Account
            </div>
          </div>
          <div className="bg-neutral-800 border border-neutral-700  w-36">
            <div className="flex items-center gap-2 px-3 py-2 text-sm  hover:bg-neutral-500 hover:text-white cursor-pointer">
              <span className="text-lg">
                <RiSettingsFill />
              </span>
              Setting
            </div>
          </div>
          <div className="bg-neutral-800 border border-neutral-700  w-36">
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm  hover:bg-red-500 hover:text-white cursor-pointer"
            >
              <span className="text-lg">
                <MdLogout />
              </span>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Spinner() {
  return (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );
}
