import { useState } from "react";
import { Button } from "../../components";
import DeleteModal from "../../components/DeleteModal";
import string from "../../locales/string";

export const Columns = () => {
  const [deleteModal, setDeleteModal] = useState(false);
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
      Header: "Experience",
      accessor: "experience",
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
      Header: "Employability",
      accessor: "employability",
    },
    {
      Header: "Skill Readiness",
      accessor: "skillReadiness",
    },
    {
      Header: "Future Readiness",
      accessor: "futureReadiness",
    },
    {
      Header: "Total Assessment",
      accessor: "totalAssement",
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
                onClick={() => {}}
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
          </>
        );
      },
    },
  ];
  return { columnsData };
};
