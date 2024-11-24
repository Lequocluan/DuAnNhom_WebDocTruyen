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

function Comic() {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  const [deleteAuthor, setDeleteAuthor] = useState(null);
  const [popup, setPopup] = useState(false);

  // Get token
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  // Fetch data author
  const fetchAuthors = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/author/list`
      );
      if (response.data.status === 200) {
        setAuthors(response.data.body.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const openPopup = (author) => {
    setDeleteAuthor(author);
    setPopup(true);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleDeleteAuthor = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/author/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAuthors();
      setDeleteAuthor(null);
      setPopup(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-xl p-8 relative overflow-hidden flex flex-col">
      <div className="flex justify-between items-center">
        <h4 className="text-4xl font-extrabold">Truyện tranh</h4>
      </div>
      <div className="w-full mt-10 flex flex-col gap-4 h-full overflow-hidden flex-1">
        <div className="w-full bg-scooter-100 p-5 rounded-3xl font-semibold grid grid-cols-10 gap-2">
          <span className="col-span-3">Name</span>
          <span className="col-span-3">Category</span>
          <span className="col-span-3">Status</span>
          <span>Action</span>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            {authors.map((author, index) => (
              <div
                key={index}
                className="w-full bg-slate-50 p-5 rounded-3xl grid grid-cols-10 gap-2 items-center hover:shadow-sm hover:bg-slate-100 transition-all"
              >
                <div className="col-span-3">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16">
                      <img
                        src={author.profile_picture?.path ?? image}
                        alt={author.profile_picture?.title ?? ""}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span>{author.full_name}</span>
                  </div>
                </div>
                <span className="col-span-3">
                  {author.pen_name ?? "Không xác định"}
                </span>
                <span className="col-span-3">
                  {author.birth_date ?? "Không xác định"}
                </span>
                <div className="flex gap-6 text-2xl">
                  <NavLink to={`/author/edit/${author.id}`}>
                    <HiOutlinePencilSquare className="w-9 h-9 hover:text-scooter-500" />
                  </NavLink>
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
                  Bạn muốn xoá thông tin tác giả
                </h5>
                <span className="text-gray-500 text-2xl">
                  Bạn chắc chắn muốn xoá thông tin của tác giả "
                  {deleteAuthor?.full_name ?? "Không xác định"}"?
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="w-full py-2 bg-error-outline hover:bg-error-outline/85 rounded-md text-white"
                onClick={() => handleDeleteAuthor(deleteAuthor.id)}
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
export default Comic;
