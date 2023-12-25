import React from "react";

interface DropdownProps {
  options: string[];
  id: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  id,
  placeholder,
  onChange,
  value,
}: DropdownProps) => {
  return (
    <div className="w-full">
      <select
        id={id}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-3"
      >
        {options.map((item, index) => {
          return (
            <React.Fragment key={`option-${index}`}>
              {index === 0 ? (
                <option selected={!value}>{placeholder}</option>
              ) : null}
              <option value={item}>{item}</option>
            </React.Fragment>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
