import React from "react";

const Header = () => {
  return (
    <div className="h-7vh flex items-center justify-between  ">
      <div className="">
        <p className="text-3xl font-bold text-black">Tech Blog</p>
      </div>
      <div className="text-black w-70">
        <ul className="flex cursor-pointer justify-between">
          <li className="hover:scale-110 transition-transform duration-200 hover:text-blue-400">
            Home
          </li>
          <li className="hover:scale-110 transition-transform duration-200 hover:text-blue-400">
            Blog
          </li>
          <li className="hover:scale-110 transition-transform duration-200 hover:text-blue-400">
            About
          </li>
          <li className="hover:scale-110 transition-transform duration-200 hover:text-blue-400">
            Contact
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
