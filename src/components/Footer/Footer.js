import Loader from "@components/Loader/Loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-[url(/assets/product_home_bg.png)] bg-no-repeat bg-cover bg-center">
      <footer className="body-font">
        <div className="container md:px-5 py-5 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              href="/"
              className="flex title-font font-medium items-center md:justify-start justify-center"
            >
              <Image
                src="/assets/LOGO-phone.png"
                width={100}
                height={100}
                className="w-[3rem] h-[3rem] rounded-full bg-black shadow-md"
                alt="logo"
              />
              <span className="ml-3 text-xl">Gahanalya</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Wear the beauty & bring happiness
            </p>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-2 grid-rows-2 lg:grid-rows-1 md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center text-[0.8rem]">
            <div className="md:w-full px-4">
              <h2 className="title-font font-medium  tracking-widest mb-3">
                CATEGORIES
              </h2>
              <ul className="list-none mb-4 lg:mb-10">
                <li>
                  <Link href="/gold">Gold collections</Link>
                </li>
                <li>
                  <Link href="/silver">Silver collections</Link>
                </li>
                <li>
                  <Link href="/gold">Ear Rings & others</Link>
                </li>
              </ul>
            </div>
            <div className="md:w-full px-4">
              <h2 className="title-font font-medium  tracking-widest mb-3">
                COLLECTIONS
              </h2>
              <ul className="list-none mb-4 lg:mb-10">
                <li>
                  <Link href="/gold">Weeding</Link>
                </li>
                <li>
                  <Link href="/gold">Kids</Link>
                </li>
                <li>
                  <Link href="/gold">Historical</Link>
                </li>
                <li>
                  <Link href="/gold">Daily Usage</Link>
                </li>
              </ul>
            </div>
            <div className="lg:w-full px-4 col-span-2 md:col-span-1">
              <h2 className="title-font font-medium  tracking-widest mb-3">
                ABOUT
              </h2>
              <ul className="list-none mb-4 lg:mb-10">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/about">Contact Us</Link>
                </li>
                <li>
                  <Link href="/about">Terms & Policy</Link>
                </li>
              </ul>
            </div>
            <div className="lg:w-full px-4 col-span-2 md:col-span-1">
              <h2 className="title-font font-medium  tracking-widest mb-3">
                CONTACT
              </h2>
              <ul className="list-none mb-4 lg:mb-10 text-red-400">
                <li>
                  <span>
                    <i className="ri-phone-line text-xl"></i>: +91-9093446447
                  </span>
                </li>
                <li>
                  <span>
                    <i className="ri-whatsapp-line text-xl"></i>:{" "}
                    <a href="https://wa.me/9093446447" target="_blank">
                      9674400480
                    </a>
                  </span>
                </li>
                <li>
                  <span>
                    <i className="ri-mail-unread-line text-xl"></i>
                    <a href="mail_to:shantanubhs1985@gmail.com" target="_blank">
                      shantanubhs1985@gmail.com
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-black/30 bg-opacity-75">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-white text-sm text-center sm:text-left">
              © {new Date().getFullYear()} GAHANALYA -All rights reserved
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start text-white">
              Made with <i className="ri-heart-line"></i> by - Shantanu Dutta
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
