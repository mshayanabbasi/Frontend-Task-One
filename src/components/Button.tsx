import React from "react";

interface ButtonProps {
  className: string;
  icon?: JSX.Element;
  textClassName?: string;
  title: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  className,
  icon = <></>,
  textClassName = "",
  title,
  onClick,
}: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      <div className="mr-1">{icon}</div>
      <span className={`text-base ${textClassName}`}>{title}</span>
    </button>
  );
};

export default Button;
