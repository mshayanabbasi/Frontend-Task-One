import React, { useState } from "react";

interface DropdownProps {
  options?: { name: string }[];
  id?: string;
}

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const Dropdown: React.FC<DropdownProps> = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="w-full">
      <select
        id="countries"
        onChange={(e) => setSelected(e.target.value)}
        value={selected}
        className="bg-white border border-gray-300 text-black text-sm rounded block w-full p-3"
      >
        {people.map((item, index) => {
          return (
            <React.Fragment key={`option-${index}`}>
              {index === 0 ? (
                <option selected={!selected}>Choose a city</option>
              ) : null}
              <option value={item.name}>{item.name}</option>
            </React.Fragment>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
