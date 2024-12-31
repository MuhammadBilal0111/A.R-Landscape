import React from "react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-green-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img
                src="/plant_logo.png"
                className="h-8 me-3"
                loading="lazy"
                alt="A. R Landscape"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">
                A. R Landscape
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-300 font-medium">
                <li className="mb-4">
                  <a href="/" className="hover:underline">
                    A. R Landscape
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Avaliable Services
              </h2>
              <ul className="text-gray-500 dark:text-gray-300 font-medium">
                <li className="mb-4">
                  <a href="/services" className="hover:underline">
                    Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-300 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-300 block">
              © {new Date().getFullYear()}{" "}
              <a href="/" className="hover:underline">
                A. R Landscape
              </a>
              . All Rights Reserved.
            </span>
          </div>
          <span className="text-gray-300">
            Developed by:{" "}
            <a
              href="mailto:m.bilal0111@gmail.com"
              className="text-blue-500 hover:underline"
            >
              m.bilal0111@gmail.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
