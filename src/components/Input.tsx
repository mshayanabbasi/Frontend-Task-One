import React from "react";

interface InputProps {
  type?: string;
  className?: string;
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hidden?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = React.forwardRef(
  (
    {
      type = "text",
      className = "",
      value,
      placeholder,
      onChange,
      disabled,
      hidden,
      ...props
    },
    ref
  ) => {
    return (
      <input
        value={value}
        placeholder={placeholder}
        className={`p-2 border border-gray-400 rounded ${className}`}
        onChange={onChange}
        // @ts-ignore
        ref={ref}
        type={type}
        hidden={hidden}
        disabled={disabled}
        {...props}
      />
    );
  }
);

export default Input;
