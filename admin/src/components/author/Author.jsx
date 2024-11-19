import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";

function Author() {
  const [authors, setAuthors] = useState([]);

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
  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-xl p-8">
      <div className="flex justify-between items-center">
        <h4 className="text-4xl font-extrabold">Tác giả</h4>
        <Link
          to="/author/add"
          className="bg-scooter-500 px-8 py-3 text-2xl text-white rounded-2xl hover:bg-scooter-400 transition-all"
        >
          Thêm tác giả
        </Link>
      </div>
      <div className="w-full mt-10 flex flex-col gap-4">
        <div className="w-full bg-scooter-100 p-5 rounded-3xl font-semibold grid grid-cols-10 gap-2">
          <span className="col-span-3">Full name</span>
          <span className="col-span-3">Pen name</span>
          <span className="col-span-3">Birth date</span>
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
                        src={author.profile_picture.path}
                        alt={author.profile_picture.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span>{author.full_name}</span>
                  </div>
                </div>
                <span className="col-span-3">{author.pen_name}</span>
                <span className="col-span-3">{author.birth_date}</span>
                <div className="flex gap-6 text-2xl">
                  <NavLink to="">
                    <HiOutlinePencilSquare className="w-9 h-9 hover:text-scooter-500" />
                  </NavLink>
                  <NavLink to="">
                    <HiOutlineTrash className="w-9 h-9  hover:text-scooter-500" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Author;
