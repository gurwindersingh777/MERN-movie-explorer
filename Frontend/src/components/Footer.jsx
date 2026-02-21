import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full p-20 px-45 border-t border-neutral-800 flex flex-col gap-6 bottom-0">
      <div className="flex items-center gap-1.5">
        <h2 className="font-bold text-lg ml-1">Movie Explorer</h2>
      </div>
      <div>
        <ul className="flex flex-col gap-3">
          <li>
            <div className="flex gap-2 text-[12px] items-center cursor-pointer">
              <span className="text-[18px]">
                <FaInstagram />
              </span>
              Instagram
            </div>
          </li>
          <li>
            <div className="flex gap-2 text-[12px] items-center cursor-pointer">
              <span className="text-[18px]">
                <FaXTwitter />
              </span>
              Twitter
            </div>
          </li>
          <li>
            <div className="flex gap-2 text-[12px] items-center cursor-pointer">
              <span className="text-[18px]">
                <FaLinkedin />
              </span>
              LinkedIn
            </div>
          </li>
          <li>
            <div className="flex gap-2 text-[12px] items-center cursor-pointer">
              <span className="text-[18px]">
                <FaFacebook />
              </span>
              Facebook
            </div>
          </li>
        </ul>
      </div>
      <div className=" text-[11px]">
        © 2026 <br /> Movie Explorer <br /> All rights reserved.
      </div>
      <div>
        <ul className="underline underline-offset-3 cursor-pointer  text-[11px] flex flex-col gap-1">
          <li className="hover:text-blue-600">Privacy Policy</li>
          <li className="hover:text-blue-600">Terms of Service</li>
          <li className="hover:text-blue-600">Cookie preferences</li>
        </ul>
      </div>
    </footer>
  );
}
