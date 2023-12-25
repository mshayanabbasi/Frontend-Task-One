import { Button } from "../../components";
import string from "../../locales/string";
import { calculateAge } from "../../utils";
import { Users } from "../../types/user.types";

export const Columns = (
  setSelectedUser: (user: Users) => void,
  setDeleteModal: (deleteModal: boolean) => void,
  setEditModal: (editModal: boolean) => void,
  setViewModal: (viewModal: boolean) => void
) => {
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
      Header: "Email Verified",
      accessor: "emailVerified",
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
                onClick={() => {
                  setSelectedUser(row.original);
                  setViewModal(true);
                }}
              />
              <Button
                title={string.edit}
                className="bg-[#4BBD72] p-2 mr-3"
                textClassName="text-white"
                onClick={() => {
                  setSelectedUser(row.original);
                  setEditModal(true);
                }}
              />
              <Button
                title={string.delete}
                className="p-2 bg-[#F86A6A]"
                onClick={() => {
                  setSelectedUser(row.original);
                  setDeleteModal(true);
                }}
                textClassName="text-white"
              />
            </div>
          </>
        );
      },
    },
  ];
  return { columnsData };
};
