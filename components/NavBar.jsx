"use client";
import { LogoImg } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeSwitch from "@./components/ThemeSwitcher";
import { signOut, useSession, getProviders, signIn } from "next-auth/react";
const NavBar = () => {
  const { data: session } = useSession();
  const [provider, setProvider] = useState();

  useEffect(() => {
    const getAllProvider = async () => {
      const data = await getProviders();
      setProvider(data);
    };
    getAllProvider();
  }, []);

  return (
    <>
      {/* for desktop */}

      <nav className="flex items-center transition-all duration-1000 ease-in-out ">
        <div className="flex-grow ">
          <Link className="flex items-center w-fit" href={"/"}>
            <Image src={LogoImg} className="h-20 w-14 " alt="fox-logo" />
            <h1 className="font-bold text-black md:text-4xl sm:text-sm dark:text-white">
              Fauro
            </h1>
          </Link>
        </div>

        <ThemeSwitch />

        {session?.user ? (
          <>
            <button
              onClick={() => signOut()}
              className="mr-3 text-3xl font-bold cursor-pointer sm:text-sm text-pop "
            >
              Create
            </button>
            <button
              onClick={() => signOut()}
              className="mr-3 text-3xl font-bold cursor-pointer sm:text-sm text-pop "
            >
              Singout
            </button>

            <button className="mr-3 text-4xl font-bold cursor-pointer sm:text-sm text-pop ">
              <Image
                width={20}
                height={20}
                className="rounded-full sm:w-8 sm:h-8 md:w-12 md:h-12"
                src={session.user.image}
              ></Image>
            </button>
          </>
        ) : (
          <>
            <Link href={"/Login"}>
              {" "}
              <button
                type="button"
                className="mr-3 text-3xl font-bold cursor-pointer sm:text-sm text-pop "
              >
                Sign In
              </button>
            </Link>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;
