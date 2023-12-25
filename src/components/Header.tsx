import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }: HeaderProps) => {
  return (
    <header className="bg-white px-8 py-4">
      <h1 className="text-2xl font-sans text-gray-600 font-bold">{title}</h1>
    </header>
  );
};

export default Header;
