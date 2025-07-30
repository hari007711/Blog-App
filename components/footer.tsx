import { Github, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between px-20 mt-8">
        <div className="text-start">
          <h1 className="font-bold text-2xl mb-5">TechBlog</h1>
          <p>
            Your go-to source for the latest in web development,<br></br>{" "}
            programming tutorials, and technology insights
          </p>
          <div className="flex mt-5 ">
            <Twitter className="mr-5 cursor-pointer hover:text-blue-400" />
            <Github className="mr-5 cursor-pointer hover:text-blue-400" />
            <Linkedin className="mr-5 cursor-pointer hover:text-blue-400" />
          </div>
        </div>
        <div className="text-start">
          <h4 className="font-semibold text-lg mb-5 ">Quick Links</h4>
          <p className="cursor-pointer mb-2 hover:text-blue-400">Home</p>
          <p className="cursor-pointer mb-2 hover:text-blue-400">About</p>
          <p className="cursor-pointer mb-2 hover:text-blue-400">Contact</p>
          <p className="cursor-pointer mb-2 hover:text-blue-400">
            Privacy Policy
          </p>
        </div>
        <div className="text-start">
          <h4 className="font-semibold text-lg mb-5">Categories</h4>
          <p className="cursor-pointer mb-2 hover:text-blue-400">
            Web Development
          </p>
          <p className="cursor-pointer mb-2 hover:text-blue-400">React</p>
          <p className="cursor-pointer mb-2 hover:text-blue-400">TypeSript</p>
          <p className="cursor-pointer mb-2 hover:text-blue-400">Next.js</p>
        </div>
      </div>
      <hr className="my-10 border-gray-700"></hr>
      <p>&copy; {new Date().getFullYear()} TechBlog. All rights reserved</p>
    </div>
  );
};

export default Footer;
