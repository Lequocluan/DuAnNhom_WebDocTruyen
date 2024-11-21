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

function Advertise() {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();
  const [deleteAds, setDeleteAds] = useState(null);
  const [popup, setPopup] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0)
  const limit = 2;

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


  // Hàm fetch quảng cáo
  const fetchAds = async () => {
    if (!token) {
      console.error("Token không tồn tại!");
      return;
    }

    try {
      const offset = calculateOffset(limit, currentPage);
      setOffset(offset)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ads/list`,
        { limit, offset },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === 200) {
        setAds(response.data.body.data);
        setTotal(response.data.body.count);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Hàm xóa quảng cáo
  const handleDeleteAds = async (id) => {
    if (!token) {
      console.error("Token không tồn tại!");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/ads/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAds();
      setDeleteAds(null);
      setPopup(false);
    } catch (error) {
      console.error("Lỗi khi xóa quảng cáo:", error);
    }
  };


  const openPopup = (ads) => {
    setDeleteAds(ads);
    setPopup(true);
  };

  useEffect(() => {
    const queryPage = parseInt(getQueryParam("page"), 10) || 1;
    setCurrentPage(Math.max(queryPage, 1));
  }, []);

  useEffect(() => {
    fetchAds();
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
        <h4 className="text-4xl font-extrabold">Quảng cáo</h4>
        <Link
          to="add"
          className="bg-scooter-500 px-8 py-3 text-2xl text-white rounded-2xl hover:bg-scooter-400 transition-all"
        >
          Thêm quảng cáo
        </Link>
      </div>

      <div className="w-full mt-10 flex flex-col gap-4 flex-1 h-1/2">
        <div className="w-full bg-scooter-100 p-5 rounded-3xl font-semibold grid grid-cols-12 gap-4">
          <span>No.</span>
          <span className="col-span-4">Picture</span>
          <span className="col-span-3">Link</span>
          <span className="col-span-3">Created at</span>
          <span>Action</span>
        </div>
        <div className="flex flex-col h-full overflow-y-scroll no-scrollbar">
          <div className="flex flex-col gap-2">
            {ads.map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-50 p-5 rounded-3xl grid grid-cols-12 gap-2 items-center hover:shadow-sm hover:bg-slate-100 transition-all"
              >
                <span>{offset + index + 1}</span>
                <div className="col-span-4">
                  <div className="w-full h-56">
                    <img
                      src={item.picture?.path ?? image}
                      alt={item.picture?.title ?? ""}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
                <Link
                  to={item.link ? item.link : ""}
                  className="col-span-3 hover:text-scooter-500 truncate"
                  target="_blank"
                >
                  {item.link ?? "Không xác định"}
                </Link>
                <span className="col-span-3">
                  {item.created_at ?? "Không xác định"}
                </span>
                <div className="flex gap-6 text-2xl">
                  <NavLink to={`/ads/edit/${item.id}`}>
                    <HiOutlinePencilSquare className="w-9 h-9 hover:text-scooter-500" />
                  </NavLink>
                  <HiOutlineTrash
                    className="w-9 h-9  hover:text-scooter-500 hover:cursor-pointer"
                    onClick={() => openPopup(item)}
                  />
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

      {popup ? (
        <div className="w-full h-full absolute top-0 left-0 bg-gray-950/35 flex items-center justify-center">
          <div className="bg-white min-w-[34rem] rounded-xl ring-1 ring-gray-100 shadow-xl px-20 py-14 flex flex-col gap-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-error-bg rounded-lg flex items-center justify-center">
                <HiOutlineXCircle className="w-12 h-12 text-error-outline" />
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-3xl text-black font-extrabold">
                  Bạn muốn xoá thông tin quảng cáo
                </h5>
                <span className="text-gray-500 text-2xl">
                  Bạn chắc chắn muốn xoá thông tin của quảng cáo có link "
                  {deleteAds?.link ?? "Không xác định"}"?
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="w-full py-2 bg-error-outline hover:bg-error-outline/85 rounded-md text-white"
                onClick={() => handleDeleteAds(deleteAds.id)}
              >
                Xác nhận xoá
              </button>
              <button
                className="w-full py-2 bg-scooter-500 hover:bg-scooter-400 rounded-md text-white"
                onClick={() => setPopup(false)}
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Advertise;
