import React, { useEffect, useMemo, useState } from "react";
import { Header, Table } from "../../components";
import string from "../../locales/string";
import { columnsData } from "./columns";

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const [usersData, setUsersData] = useState([]);

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
      <div className=""></div>
      <Table data={usersData} columns={columns} />
    </div>
  );
};

export default Users;
