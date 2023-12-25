/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { Button, Header, Table } from "../../components";
import { IoMdAdd } from "react-icons/io";
import string from "../../locales/string";
import { columnsData } from "./columns";

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const [usersData, setUsersData] = useState([]);
  const [search, setSearch] = useState("");

  const handleFetch = async () => {
    fetch("http://localhost:3030/users", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsersData(data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const columns = useMemo(() => {
    return columnsData;
  }, [columnsData]);

  return (
    <div>
      <Header title={string.users} />
      <div className="py-10 px-7">
        <div className="flex justify-end mb-10">
          <Button
            title={"Add User"}
            className="bg-c_19A7D8 p-3 flex items-center rounded-md"
            textClassName="text-white font-medium"
            icon={<IoMdAdd size={24} color={"white"} />}
          />
        </div>
        <div className="bg-white">
          <div className="bg-[#F1F3F5] flex justify-between items-center p-6">
            <div className="">
              <span className="text-base font-medium text-gray-400">
                {string.users}
              </span>
            </div>
            <div className="flex items-center">
              <Button
                className="bg-[#4DBE73] p-3"
                textClassName="text-white font-medium"
                title={string.downloadCSV}
              />
              <input
                placeholder={string.search}
                className="p-3 ml-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="p-6">
            {/* @ts-ignore */}
            <Table data={usersData} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
