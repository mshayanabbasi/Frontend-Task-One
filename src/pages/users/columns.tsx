import { useState } from "react";
import { Button } from "../../components";
import DeleteModal from "../../components/DeleteModal";
import string from "../../locales/string";
import EditModal from "../../components/EditModal";
import { calculateAge } from "../../utils";

export const Columns = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const columnsData = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Age",
      accessor: "dob",
      Cell: ({ row }: any) => {
        const dob = calculateAge(row.original.dob);
        return <span className="text-black text-center">{dob.toString()}</span>;
      },
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Country",
      accessor: "country",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "Profession",
      accessor: "profession",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }: any) => {
        return (
          <div className="bg-c_19A7D8 p-2 flex items-center justify-center">
            <span className="text-white text-center capitalize">
              {row.original.status}
            </span>
          </div>
        );
      },
    },
    {
      Header: "Actions",
      accessor: "action",
      Cell: ({ row }: any) => {
        return (
          <>
            <div className="flex items-center">
              <Button
                title={string.view}
                className="bg-[#FFBF06] p-2 mr-3"
                onClick={() => {}}
              />
              <Button
                title={string.edit}
                className="bg-[#4BBD72] p-2 mr-3"
                textClassName="text-white"
                onClick={() => setEditModal(!editModal)}
              />
              <Button
                title={string.delete}
                className="p-2 bg-[#F86A6A]"
                onClick={() => setDeleteModal(!deleteModal)}
                textClassName="text-white"
              />
            </div>
            {deleteModal ? (
              <DeleteModal
                open={deleteModal}
                setOpen={() => setDeleteModal(false)}
              />
            ) : null}
            {editModal ? (
              <EditModal open={editModal} setOpen={() => setEditModal(false)} />
            ) : null}
          </>
        );
      },
    },
  ];
  return { columnsData };
};
