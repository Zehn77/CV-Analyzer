"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="">
            <Link href="/" className="text-xl font-semibold text-gray-800">
              CV Analyzer
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/profile"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Profile
            </Link>
            <button
              onClick={() => {
                signOut();
              }}
              className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
