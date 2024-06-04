'use client'
import React from 'react'
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="absolute top-[100%] left-6 right-6 bg-[#104f27]  rounded-lg p-8 ">
<div className="absolute bottom-6 left-6 right-6 top-6 -z-1 rounded-lg bg-primary brightness-50 " />
    <div className="flex justify-between text-sm font-light tracking-tight">
      <div className="flex basis-[14%] flex-col items-center gap-y-5 opacity-90 brightness-0 invert">
        <img
          src="/logo.png"
          alt="agrosurance logo"
          className="aspect-square w-1/2"
        />
        <img src="/images/illustrations/agrobuddy.png" alt="brand name" className="ml-12" />
      </div>

      <div className="flex flex-col text-white">
        <h5 className="font-semibold">Explore</h5>
        <div className="my-7 flex flex-col gap-y-3">
          <Link href="/">Home</Link>
          <Link href="/register">Register</Link>
          <Link href="/dashboard">DashBoard</Link>
          <Link href="/Claim">Claim</Link>
          <Link href="/staker">Staker</Link>
        </div>
      </div>
      <div className="flex flex-col text-white">
        <h5 className="font-semibold">For Farmers</h5>
        <div className="my-7 flex flex-col gap-y-3">
          <Link href="/auth">Get Insured</Link>
          <Link href="/dashboard">Get a quote</Link>
          <Link href="/dashboard">Farmer Dashboard</Link>
        </div>
      </div>
      <div className="flex flex-col text-white">
        <h5 className="font-semibold">Resources</h5>
        <div className="my-7 flex flex-col gap-y-3">
          <Link href="https://tome.app/my-8615/agrobuddy-empowering-farmers-with-blockchain-technology-clwtnd42g029vmr643bzp2c7t/">How it works</Link>
          <Link href="https://chain.link/">BNB</Link>
          <Link href="/calculation">Calculations</Link>
          <Link href="/help">Help</Link>
        </div>
      </div>

      <div className="flex flex-col items-center text-center text-back text-opacity-80 text-[#fefffe]">
        <h5 className="my-3 text-4xl font-bold tracking-tighter text-back">
          TRULY GREEN
        </h5>
        <p>We create possibilities</p>
        <p>for a world which has</p>
        <p>forgotten the true</p>
        {/* <p className="font-semibold text-back">Annapurna</p> */}
        <img
          src="/images/illustrations/annapurna-text.png"
          alt="annapurna"
          className="my-2 h-4"
        />
      </div>
    </div>
    <div className="my-2 flex gap-x-4">
      <p className="font-raleway text-xl font-bold">Follow Us</p>
      <div className="flex items-center gap-x-3 brightness-0 invert">
        <Link
          href="https://www.linkedin.com/in/rishabh-tibrewal-2a4849195/"
          target="_blank"
          className=""
        >
          <img
            src="https://cdn4.iconfinder.com/data/icons/social-media-outline-3/60/Social-35-Linkedin-Outline-1024.png"
            alt="linkedin"
            className="aspect-square w-[2.5ch]"
          />
        </Link>
        
        <Link href="https://github.com/a-sahil/agriculture" className="">
          <img
            src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-outline-128.png"
            alt="github"
            className="aspect-square w-[3ch]"
          />
        </Link>
      </div>
    </div>
    <div className="my-2 w-full border border-back"></div>
    <div className="mt-4 text-xs ">© AgroBuddy 2024</div>
    </footer>
    
  )
}

export default Footer