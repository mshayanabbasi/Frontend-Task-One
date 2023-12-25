import React from "react";

interface ButtonProps {
  className: string;
  icon?: JSX.Element;
  textClassName?: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  icon = <></>,
  textClassName = "",
  title,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      <div className="mr-1">{icon}</div>
      <span className={`text-base ${textClassName}`}>{title}</span>
    </button>
  );
};

export default Button;
