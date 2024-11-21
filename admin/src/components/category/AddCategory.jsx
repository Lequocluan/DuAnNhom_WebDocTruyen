import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { toast } from "react-toastify";
import ErrorMessage from "./ErrorMessage";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

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
        const successMessage = response.data.body.message || "Thêm thể loại thành công!";
        toast.success(successMessage);
        setCategoryName("");
        setDescription("");
        setStatus(1);
        navigate("/category");
      } else {
        const errorMessage = Array.isArray(response.data.body.message) && response.data.body.message.length > 0
          ? response.data.body.message[0].error_message
          : "Có lỗi xảy ra.";
        setErrorMessage(errorMessage); 
      }
    } catch (error) {
      console.error("Lỗi khi thêm thể loại:", error);
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

      <form onSubmit={handleSubmit} className="w-full mt-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="ml-4">Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
          />
          <ErrorMessage errorMessage={errorMessage} /> 
        </div>

        <div className="flex flex-col gap-2">
          <label className="ml-4">Description</label>
          <textarea
            value={description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="ml-4">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value={1}>Hiển thị</option>
            <option value={0}>Ẩn</option>
          </select>
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
