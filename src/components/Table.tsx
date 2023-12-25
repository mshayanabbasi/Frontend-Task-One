//@ts-nocheck
import { useTable, usePagination, Column } from "react-table";
import ReactPaginate from "react-paginate";
import { Users } from "../types/user.types";

interface TableProps {
  data: Array<Users>;
  columns: Column<Users[]>[];
  count?: number;
  perPage?: number;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  count,
  perPage,
}: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex },
    gotoPage,
  } = useTable({ data, columns }, usePagination);
  const rowsPerPage = perPage || 10; // Number of rows per page
  const pageCount = Math.ceil((count || data.length) / rowsPerPage);

  const pageNumbers = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  );

  return (
    <>
      <table
        {...getTableProps()}
        className="w-full overflow-y-scroll border-separate border bg-gray-300"
      >
        <thead className="bg-[#FEFEFE]">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  className={`text-[#1E1E1E] text-base font-normal py-3 px-3 text-left`}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={row.index % 2 === 0 ? "bg-[#F2F2F2]" : "bg-white"}
              >
                {row.cells.map((cell, cellIndex) => {
                  return (
                    <td
                      className={`text-[#1E1E1E] text-base font-normal px-4 !h-24`}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {count > 10 && (
        <div className="flex justify-center w-full my-10">
          <ReactPaginate
            pageCount={pageNumbers.length}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            initialPage={pageIndex}
            onPageChange={({ selected }) => {
              gotoPage(selected);
            }}
            containerClassName={"pagination"}
            activeClassName={"active"}
            // activeClassName="bg-CCDF9C text-white"
            // pageClassName="page-item"
            // breakClassName="break-item"
            previousClassName="!hidden"
            nextClassName="!hidden"
          />
        </div>
      )}
    </>
  );
};

export default Table;
