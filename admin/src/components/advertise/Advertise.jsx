import axios from "axios";
import { useEffect, useState } from "react";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import image from "../../assets/img/placeholder.jpg";
import Cookies from "universal-cookie";

function Advertise() {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();
  const [deleteAds, setDeleteAds] = useState(null);
  const [popup, setPopup] = useState(false);

  // Get token
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  // Fetch data ads
  const fetchAds = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ads/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 200) {
        setAds(response.data.body.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handleDeleteAds = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/ads/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAds();
      setDeleteAds(null);
      setPopup(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const openPopup = (ads) => {
    setDeleteAds(ads);
    setPopup(true);
  };

  useEffect(() => {
    fetchAds();
  }, []);

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
        <div>
          <div className="flex flex-col gap-2">
            {ads.map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-50 p-5 rounded-3xl grid grid-cols-12 gap-2 items-center hover:shadow-sm hover:bg-slate-100 transition-all"
              >
                <span>{index  + 1}</span>
                <div className="col-span-4">
                  <div className="w-full h-56">
                    <img
                      src={item.picture?.path ?? image}
                      alt={item.picture?.title ?? ""}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
                <Link to={item.link ? item.link : ""} className="col-span-3">
                  {item.link ?? "Không xác định"}
                </Link>
                <span className="col-span-3">
                  {item.created_at ?? "Không xác định"}
                </span>
                <div className="flex gap-6 text-2xl">
                  <NavLink to={`/author/edit/${item.id}`}>
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
