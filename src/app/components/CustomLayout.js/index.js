"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { links } from "./links.utils";
import LoadingAnimation from "../loadingAmination";
import { useLoadingAnimationContext } from "@/app/hooks/useLoadingAnimationContext";
import { ProductsListProvider } from "@/app/context/productsListContext";

export default function CustomLayout({ children }) {
  const urlPath = usePathname();
  const { showLoadingAnimation } = useLoadingAnimationContext();

  return (
    <>
      <h1 className="text-gray-600 font-extrabold text-center text-base">
        A Store Admin DashBoard
      </h1>
      <div className="flex h-[94vh] mb-1 mt-1">
        {/* navigation Links */}
        <aside className="bg-black grow-0 p-2 px-4 h text-white flex flex-col gap-3">
          {links.map((link) => {
            return (
              <Link
                key={link.path}
                href={link.path}
                className={clsx(
                  urlPath.startsWith(link.path) && 
                    "bg-white text-black font-bold p-1 rounded"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </aside>
        <section className="grow-1 bg-gray-100 p-4 w-full h-full ml-3 mr-3  mb- rounded overflow-y-auto">
          {children}
        </section>
      </div>
      {showLoadingAnimation && <LoadingAnimation />}
    </>
  );
}
