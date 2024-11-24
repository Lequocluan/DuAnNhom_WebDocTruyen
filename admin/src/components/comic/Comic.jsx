import axios from "axios";
import { useEffect, useState } from "react";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import image from "../../assets/img/placeholder.jpg";
import Cookies from "universal-cookie";
import Pagination from "../../ui/pagination/pagination";
import { calculateOffset } from "../../utils/helper";

function Comic() {
  const [comics, setComics] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 12;

  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const location = useLocation();

  const addQueryParam = (key, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const getQueryParam = (key) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(key);
  };

  const updateComic = async (id, status) => {
    if (!token) {
      console.error("Token không tồn tại!");
      return;
    }

    try {
      const offset = calculateOffset(limit, currentPage);
      setOffset(offset);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comic/update`,
        { id, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComic();
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  // Hàm fetch quảng cáo
  const fetchComic = async () => {
    if (!token) {
      console.error("Token không tồn tại!");
      return;
    }

    try {
      const offset = calculateOffset(limit, currentPage);
      setOffset(offset);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comic/list`,
        { limit, offset },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 200) {
        setComics(response.data.body.data);
        setTotal(response.data.body.count);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handleUpdateComic = (id, status) => {
    let statusChange = 0;
    if (status == 0) {
      statusChange = 1;
    }
    updateComic(id, statusChange);
  };
  useEffect(() => {
    const queryPage = parseInt(getQueryParam("page"), 10) || 1;
    setCurrentPage(Math.max(queryPage, 1));
  }, []);

  useEffect(() => {
    fetchComic();
  }, [currentPage, limit]);

  const totalPages = Math.ceil(total / limit);

  const onNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      addQueryParam("page", nextPage);
      setCurrentPage(nextPage);
    }
  };

  const onPrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      addQueryParam("page", prevPage);
      setCurrentPage(prevPage);
    }
  };

  const onToPage = (page) => {
    const targetPage = Math.min(Math.max(page, 1), totalPages);
    addQueryParam("page", targetPage);
    setCurrentPage(targetPage);
  };

  return (
    <div className="w-full h-full max-h-full bg-white rounded-xl p-8 relative overflow-hidden flex-col flex flex-1">
      <div className="flex justify-between items-center">
        <h4 className="text-4xl font-extrabold">Truyện tranh</h4>
      </div>

      <div className="w-full mt-10 flex flex-col gap-4 flex-1 h-1/2">
        <div className="w-full bg-scooter-100 p-5 rounded-3xl font-semibold grid grid-cols-10 gap-2">
          <span className="col-span-5">Name</span>
          <span className="col-span-3">Category</span>
          <span className="col-span-2 text-center">Status</span>
        </div>
        <div className="flex flex-col h-full overflow-y-scroll no-scrollbar">
          <div className="flex flex-col gap-2">
            {comics.map((comic, index) => (
              <div
                key={comic.id}
                className="w-full bg-slate-50 p-5 rounded-3xl grid grid-cols-10 gap-2 items-center hover:shadow-sm hover:bg-slate-100 transition-all"
              >
                <div className="col-span-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img
                        src={comic.thumbnail ?? image}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span className="truncate">{comic.name}</span>
                  </div>
                </div>
                <span className="col-span-3 truncate">
                  {comic.categories.map((item) => item.name).join(", ")}
                </span>
                <div className="col-span-2 flex items-center justify-center">
                  {comic.status == 1 ? (
                    <button
                      className="bg-success-outline text-success-bg px-8 py-3 rounded-xl"
                      onClick={() => handleUpdateComic(comic.id, comic.status)}
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      className="bg-error-outline text-error-bg px-8 py-3 rounded-xl"
                      onClick={() => handleUpdateComic(comic.id, comic.status)}
                    >
                      Disable
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          total={total}
          per_page={limit}
          current={currentPage}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          onToPage={(page) => onToPage(page)}
        />
      </div>
    </div>
  );
}

export default Comic;
