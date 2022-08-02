import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { signIn, signUp, logOut } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${isScrolled && "bg-zinc-900"}`}>
      {/* <img src="" alt="" /> */}
      <div className="flex items-center space-x-2 md:space-x-10">
        <h1 className="xl:text-4xl lg:text-3xl font-bold text-blue-500">
          spydeX
        </h1>
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">Anime Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">My List</li>
          <li className="headerLink">New & Popular</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-lg font-bold">
        <SearchIcon className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">Otaku</p>
        <BellIcon className="w-6 h-6" />
        {/* <Link href="/account"> */}
        <img
          src="https://i.pinimg.com/originals/95/76/c7/9576c7b87d576bf39bf245210e7e9f11.jpg"
          alt=""
          width={40}
          height={40}
          onClick={logOut}
          className="cursor-pointer"
        />
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Header;
