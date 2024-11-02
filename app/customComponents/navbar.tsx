"use client"
import React from "react";
import Image from "next/image";
import ThemeToggle from "./theme-toggle";
import { FaUserCircle } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, LucideClipboardList, User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const {data}=useSession();
  return (
    <nav className="h-20 flex mx-40 flex-row items-center md:justify-between ">
      <Link href="/">
      <Image
        src="./icons/swish.svg"
        alt="brand-logo"
        width={160}
        height={160}
      ></Image>
      </Link>
      {data?.user != null ? (
        <>
          <li className="list-none  flex flex-row md:justify-evenly gap-10">
            <a>Dashboard</a>
          </li>
        </>
      ) : (
        ""
      )}
      <div className=" flex flex-row md:justify-evenly gap-6">
      <DropdownMenu>
            <DropdownMenuTrigger> <FaUserCircle className="h-8 w-8"/></DropdownMenuTrigger>
            <DropdownMenuContent>
            {data?.user != null ? (
              <>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem> <User/> Profile</DropdownMenuItem>
              <DropdownMenuItem> <CreditCard/> Billing</DropdownMenuItem>
              <DropdownMenuItem><LucideClipboardList/> Listings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={()=>signOut()}><LogOut/>   Logout</DropdownMenuItem>
              </>
            ): (<Link href="login"> <DropdownMenuItem>Login</DropdownMenuItem></Link>)}
            </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </nav>
  ); 
};                                       

export default Navbar;
