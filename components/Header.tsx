import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

const Header = () => {
  return (
    <div className="h-7vh flex items-center justify-between  ">
      <div className="">
        <Link href="/">
          <p className="text-3xl font-bold text-black hover:text-[#468d95] transition-colors duration-200 hover:scale-105 transition-transform duration-200">
            Tech Blog
          </p>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="mr-5">{/* <ThemeToggle /> */}</div>
        <div className="text-black w-70">
          <ul className="flex cursor-pointer justify-between">
            <li className="hover:scale-110 transition-transform duration-200 hover:text-[#468d95]">
              Home
            </li>
            <li className="hover:scale-110 transition-transform duration-200 hover:text-[#468d95]">
              Blog
            </li>
            <li className="hover:scale-110 transition-transform duration-200 hover:text-[#468d95]">
              About
            </li>
            <li className="hover:scale-110 transition-transform duration-200 hover:text-[#468d95]">
              Contact
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
