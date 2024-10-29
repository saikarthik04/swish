"use client"
import React from "react";
import Image from "next/image";
import ThemeToggle from "./theme-toggle";
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const {data}=useSession();
  return (
    <nav className="h-20 flex mx-40 flex-row items-center md:justify-between ">
        <Image src="./icons/swish.svg" alt="brand-logo" width={160} height={160} ></Image>
        {data?.user != null ? (<>
          <li className="list-none  flex flex-row md:justify-evenly gap-10">
        <a>dashboard</a>
        <a>order book</a>
        <a>dashboard</a>
        <a>order book</a>
        <a>dashboard</a>
        <a>order book</a>
        </li>
        </>):("")}
        <div className=" flex flex-row md:justify-evenly gap-6">
        <FaUserCircle className="h-8 w-8"/>
        <ThemeToggle/>
        </div>
    </nav>
  ); 
};                                       

export default Navbar;
