import React from 'react'
import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-4 text-white-400 md:px-10 lg:px-16">

      <div className="mx-auto max-w-6xl">


        <div className="text-center">

          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} Netflix. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  )
}