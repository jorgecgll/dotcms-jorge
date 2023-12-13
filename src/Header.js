import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header class="absolute inset-x-0 top-0 z-50">
      <nav
        class="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>

        <div class="lg:flex lg:gap-x-12">
          <Link to="/" class="text-sm font-semibold leading-6 text-gray-900">
            Home
          </Link>
          <Link
            to="/blog"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Blog
          </Link>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </nav>
    </header>
  );
};

export default Header;
