//@ts-nocheck
import { useTable, usePagination } from "react-table";
import ReactPaginate from "react-paginate";

interface TableProps {
  data: Array<[]>;
  columns: Array<[]>;
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
      <table {...getTableProps()} className="w-full overflow-y-scroll">
        <thead className="bg-[#FEFEFE]">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  className={`text-[#1E1E1E] text-base font-normal py-3 px-3 text-left ${
                    index === 0
                      ? "rounded-tl-2xl rounded-bl-2xl"
                      : headerGroup.headers.length - 1 === index
                      ? "rounded-tr-2xl rounded-br-2xl"
                      : ""
                  }`}
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
              <tr {...row.getRowProps()} className="bg-[#FEFEFE]">
                {row.cells.map((cell, cellIndex) => {
                  // if (cell.column.Header === "Status" && !noDropdown) {
                  return (
                    <td
                      className={`text-[#1E1E1E] text-base font-normal px-4 !h-24 ${
                        cellIndex === 0
                          ? "rounded-tl-2xl rounded-bl-2xl"
                          : row.cells.length - 1 === cellIndex
                          ? "rounded-tr-2xl rounded-br-2xl"
                          : ""
                      }`}
                      {...cell.getCellProps()}
                    >
                      {/* {cell.row.original.is_active ? (
                          <StatusCell
                            value={
                              cell.row.original.is_active === false
                                ? "disabled"
                                : "enabled"
                            }
                            onStatusChange={(newStatus) =>
                              handleStatusChange(cell, newStatus)
                            }
                          />
                        ) : (
                          <DisableStatusCell
                            value={
                              cell.row.original.is_active === false
                                ? "disabled"
                                : "enabled"
                            }
                            onStatusChange={(newStatus) =>
                              handleStatusChange(cell, newStatus)
                            }
                          />
                        )} */}
                    </td>
                  );
                  // }

                  return (
                    <td
                      className={`text-[#1E1E1E] text-base font-normal px-4 !h-24 ${
                        cellIndex === 0
                          ? "rounded-tl-2xl rounded-bl-2xl"
                          : row.cells.length - 1 === cellIndex
                          ? "rounded-tr-2xl rounded-br-2xl"
                          : ""
                      }`}
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
      {/* {data.length > 10 && (
        <div className="flex justify-center w-full my-10">
          <div className="bg-white rounded-2xl">
            {pageNumbers.map(pageNumber => (
              <button
                className={`py-3 px-6 hover:border-transparent rounded-2xl font-normal focus:outline-none text-sm ${
                  pageIndex + 1 === pageNumber
                    ? 'bg-CCDF9C text-white'
                    : 'bg-white text-1E1E1E'
                }`}
                key={pageNumber}
                onClick={() => {
                  gotoPage(pageNumber - 1);
                }} // subtract 1 because pageIndex is 0-based
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      )} */}
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
