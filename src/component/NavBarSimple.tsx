import { useState } from "react";

export default function NavBarSimple() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center h-16">
        <div className="text-xl font-semibold text-gray-800">Cache Visualizer</div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none ">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Navigation links */}
      <div
        className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 ${isOpen ? "flex" : "hidden"}`}>
        <a href="/" className="block px-3 py-2 text-gray-600 hover:text-blue-500">About</a>
        <a href="/direct-mapped-cache" className="block px-3 py-2 text-gray-600 hover:text-blue-500">Direct Mapped</a>
        <a href="/n-way" className="block px-3 py-2 text-gray-600 hover:text-blue-500">N-Way associative</a>
        <a href="#" className="block px-3 py-2 text-gray-600 hover:text-blue-500">Fully Associative</a>

        {/* LinkedIn links dropdown hover */}
        <div className="relative group">
          <div className="flex flex-col">
            <a href="#" className="block px-3 py-2 text-blue-600 hover:text-blue-500">
              LinkedIn
            </a>
            <ul className="absolute left-0 top-full hidden min-w-[8rem] bg-white shadow-md rounded-md group-hover:block z-10">
              <li>
                <a target="_blank" href="https://www.linkedin.com/in/giovanni-paredes-3774801b5/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500">
                  Giovanni
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com/in/bruno-mascali-9a7426253/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500">
                  Bruno
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
