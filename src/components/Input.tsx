import React from "react";

interface InputProps {
  type?: string;
  className?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = React.forwardRef(
  ({ type = "text", className = "", value, placeholder, onChange }, ref) => {
    return (
      <input
        value={value}
        placeholder={placeholder}
        className={`p-2 border border-gray-400 rounded ${className}`}
        onChange={onChange}
        // @ts-ignore
        ref={ref}
        type={type}
      />
    );
  }
);

export default Input;
