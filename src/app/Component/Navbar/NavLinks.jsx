import React from "react";
import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <li>
        <Link className="hover:text-[#945947] hover:bg-transparent " href="/">
          <p className="relative inline-block group">HOME <span className="absolute left-0 bottom-0 w-0 h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-full group-hover:right-full"></span></p> 
        </Link>
      </li>
      <li>
        <details className="hover:text-[#945947] hover:bg-transparent group">
          <summary className="hover:bg-[#F5EDDE] cursor-pointer list-none">
           <p className="relative inline-block group"> SHOPE  <span className="absolute left-0 bottom-0 w-0 h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-full group-hover:right-full"></span></p>
          </summary>
          <ul className="p-2 bg-[#F5EDDE] w-40 z-10 flex flex-col gap-1 shadow-md">
            <li>
              <Link href="/sub1">Submenu 1
              
              </Link>
            </li>
            <li>
              <Link href="/sub2">Submenu 2</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details className="hover:text-[#945947] hover:bg-transparent group">
          <summary className="hover:bg-[#F5EDDE] cursor-pointer list-none">
           <p className="relative inline-block group">
             ABOUT <span className="absolute left-0 bottom-0 w-0 h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-full group-hover:right-full"></span>
           </p>
          </summary>
          <ul className="p-2 bg-[#F5EDDE] w-40 flex flex-col gap-1 shadow-md">
            <li>
              <Link
                href="/sub1"
                className="relative text-[#39180F] font-bold after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#39180F] after:transition-all after:duration-300 hover:after:w-full"
              >
                Submenu 1
              </Link>
            </li>
            <li>
              <Link
                href="/sub2"
                className="relative text-[#39180F] font-bold after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#39180F] after:transition-all after:duration-300 hover:after:w-full"
              >
                Submenu 2
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link
          className="hover:text-[#945947] hover:bg-transparent"
          href="/store"
        >
             <p className="relative inline-block group">
              STORE LOCATOR <span className="absolute left-0 bottom-0 w-0 h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-full group-hover:right-full"></span>
           </p>
         
        </Link>
      </li>
      <li>
        <Link
          className="hover:text-[#945947] hover:bg-transparent"
          href="/circle"
        >
             <p className="relative inline-block group">
               THE CIRCLE <span className="absolute left-0 bottom-0 w-0 h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-full group-hover:right-full"></span>
           </p>
         
        </Link>
      </li>
    </>
  );
}
