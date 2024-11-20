import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/category/create`,
        {
          name: categoryName,
          description: description,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status < 400) {
        setMessage("Thêm thể loại thành công!");
        setCategoryName("");
        setDescription("");
        toast.success("Thêm thể loại thành công!"); // Hiển thị thông báo thành công
        setStatus(1);
        navigate("/category");
      } else {
        setMessage("Có lỗi xảy ra khi thêm thể loại.");
        toast.error(message); // Hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error("Lỗi khi thêm thể loại:", error);
      setMessage("Lỗi kết nối tới server.");
      toast.error("Lỗi kết nối tới server."); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-6">
      <div className="flex gap-6 items-center mb-6">
        <Link to="/category">
          <HiOutlineArrowLeftCircle className="w-12 h-12 hover:text-scooter-500" />
        </Link>
        <h4 className="text-4xl font-extrabold">Thêm thể loại</h4>
      </div>
      {message && <div className="text-red-500 mb-4">{message}</div>}
      <form onSubmit={handleSubmit} className="w-full mt-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="ml-4">Tên thể loại</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-4">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
            rows="4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-4">Trạng thái</label>
          <div className="flex gap-6 items-center ml-4">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="statusActive"
                name="status"
                value={1}
                checked={status === 1}
                onChange={() => setStatus(1)}
              />
              <label htmlFor="statusActive">Hoạt động</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="statusInactive"
                name="status"
                value={0}
                checked={status === 0}
                onChange={() => setStatus(0)}
              />
              <label htmlFor="statusInactive">
                Không hoạt động
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="w-fit bg-scooter-500 font-bold px-9 py-3 text-3xl text-white rounded-2xl hover:bg-scooter-400 transition-all"
          >
            Thêm thể loại
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
