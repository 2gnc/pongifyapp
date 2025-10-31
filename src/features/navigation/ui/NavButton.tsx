'use client'

import React from 'react';
import Image from 'next/image';

interface NavButtonProps {
  handleClick: () => void;
}

export const NavButton: React.FC<NavButtonProps> = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="absolute bottom-5 left-5 z-[9999] border-none bg-transparent cursor-pointer p-0 transition-transform duration-100 active:scale-95"
    >
      <Image
        src="/NavButton.jpg"
        alt="Navigation Button"
        width={60}
        height={60}
        className="rounded-xl"
      />
    </button>
  );
};
