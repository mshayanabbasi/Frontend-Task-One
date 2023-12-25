/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";

import { IoMdAdd } from "react-icons/io";

import { Button, Header, Table } from "../../components";
import AddModal from "../../components/AddModal";

import string from "../../locales/string";
import { Columns } from "./columns";
import { API_URL } from "../../constants";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";
import ViewModal from "../../components/ViewModal";

interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const [usersData, setUsersData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleFetch = async () => {
    fetch(`${API_URL}/users`, {
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
  const columnsData = Columns(
    // @ts-ignore
    setSelectedUser,
    setDeleteModal,
    setEditModal,
    setViewModal
  );

  const columns = useMemo(() => {
    return columnsData.columnsData;
  }, [columnsData.columnsData]);

  return (
    <div>
      <Header title={string.users} />
      <div className="py-10 px-7">
        <div className="flex justify-end mb-10">
          <Button
            title={string.addUser}
            className="bg-c_19A7D8 p-3 flex items-center rounded-md"
            textClassName="text-white font-medium"
            icon={<IoMdAdd size={24} color={"white"} />}
            onClick={() => setOpen(!open)}
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
                onClick={() => {}}
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
      {open ? (
        <AddModal open={open} setOpen={setOpen} getUsers={handleFetch} />
      ) : null}
      {deleteModal ? (
        <DeleteModal
          open={deleteModal}
          setOpen={setDeleteModal}
          // @ts-ignore
          id={selectedUser?.id}
          getUsers={handleFetch}
        />
      ) : null}
      {editModal ? (
        <EditModal
          open={editModal}
          setOpen={setEditModal}
          // @ts-ignore
          user={selectedUser}
          getUsers={handleFetch}
        />
      ) : null}
      {viewModal ? (
        <ViewModal
          open={viewModal}
          setOpen={setViewModal}
          // @ts-ignore
          user={selectedUser}
        />
      ) : null}
    </div>
  );
};

export default Users;
