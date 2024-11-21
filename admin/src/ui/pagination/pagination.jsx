import { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

function Pagination({
  total,
  per_page,
  current,
  onNextPage,
  onPrevPage,
  onToPage,
  className,
}) {
  const [totalPage, setTotalPage] = useState(Math.ceil(total / per_page));
  const [currentPage, setCurrentPage] = useState(current);
  const limitPaginationTop = 2;
  const limitPaginationEnd = 2;

  const [pageStart, setPageStart] = useState([]);
  const [pageEnd, setPageEnd] = useState([]);

  const renderList = () => {
    let list = [];
    if (
      limitPaginationTop + limitPaginationEnd >=
      totalPage - currentPage + 1
    ) {
      let itemStart = totalPage - (limitPaginationTop + limitPaginationEnd);
      if (itemStart < 1) {
        itemStart = 0;
      }
      for (let i = itemStart + 1; i <= itemStart + limitPaginationTop; i++) {
        list.push(i);
      }
    } else {
      for (let i = currentPage; i < currentPage + limitPaginationTop; i++) {
        list.push(i);
      }
    }
    for (let i = totalPage - limitPaginationEnd + 1; i <= totalPage; i++) {
      list.push(i);
    }

    const uniqueList = [...new Set(list)];
    const end = uniqueList.slice(-limitPaginationEnd);
    const remainingList = uniqueList.slice(
      0,
      uniqueList.length - limitPaginationEnd
    );

    const start = remainingList.slice(0, limitPaginationTop);
    setPageStart(start);
    setPageEnd(end);
  };

  useEffect(() => {
    setTotalPage(Math.ceil(total / per_page));
  }, [total, per_page]);

  useEffect(() => {
    setCurrentPage(current);
  }, [current]);

  useEffect(() => {
    renderList();
  }, [totalPage, currentPage]);

  if (totalPage > 1) {
    return (
      <div className={`flex gap-6 justify-center mt-8 ${className}`}>
        {current != 1 && (
          <div
            className="h-14 w-14 flex items-center justify-center bg-scooter-500 rounded-full hover:bg-scooter-600 cursor-pointer"
            onClick={onPrevPage}
          >
            <HiOutlineChevronLeft className="w-8 h-8 text-white" />
          </div>
        )}
        <ul className="h-14 flex items-center justify-center bg-scooter-500 rounded-full gap-2">
          {pageStart.map((item, index) => (
            <li
              key={index}
              className={`h-14 w-14 text-white font-bold text-2xl flex items-center justify-center hover:bg-scooter-600 rounded-full cursor-pointer ${
                item == current && "bg-scooter-800"
              }`}
              onClick={() => onToPage(item)}
            >
              {item}
            </li>
          ))}
          {pageEnd[0] - pageStart[pageStart.length - 1] > 1 && (
            <li
              className={`h-14 w-14 text-white font-bold text-2xl flex items-center justify-center rounded-full cursor-pointer`}
            >
              ...
            </li>
          )}
          {pageEnd.map((item, index) => (
            <li
              onClick={() => onToPage(item)}
              key={index}
              className={`h-14 w-14 text-white font-bold text-2xl flex items-center justify-center hover:bg-scooter-600 rounded-full cursor-pointer ${
                item == current && "bg-scooter-800"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
        {current != totalPage && (
          <div className="h-14 w-14 flex items-center justify-center bg-scooter-500 rounded-full hover:bg-scooter-600 cursor-pointer">
            <HiOutlineChevronRight
              className="w-8 h-8 text-white"
              onClick={onNextPage}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Pagination;
