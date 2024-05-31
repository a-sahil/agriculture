'use client'
import React from "react";
import Link from "next/link";

const ProjectName = () => {
  return (
    <div>
      <Link href="/">
        <img
          src="/images/illustrations/agrobuddy.png"
          alt="title"
          className="absolute left-10 right-0 top-6  w-[32rem]  object-cover"
        />
      </Link>
    </div>
  );
};

export default ProjectName;
