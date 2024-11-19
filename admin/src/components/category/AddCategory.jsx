import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const [message, setMessage] = useState("");

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
        setStatus(1);
      } else {
        setMessage("Có lỗi xảy ra khi thêm thể loại.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm thể loại:", error);
      setMessage("Lỗi kết nối tới server.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thêm mới Thể loại</h2>
      {message && <div className="text-red-500 mb-4">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Tên thể loại</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            rows="4"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <div>
            <input
              type="radio"
              id="statusActive"
              name="status"
              value={1}
              checked={status === 1}
              onChange={() => setStatus(1)}
            />
            <label htmlFor="statusActive" className="ms-2">
              Hoạt động
            </label>

            <input
              type="radio"
              id="statusInactive"
              name="status"
              value={0}
              checked={status === 0}
              onChange={() => setStatus(0)}
              className="ms-3"
            />
            <label htmlFor="statusInactive" className="ms-2">
              Không hoạt động
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm Thể loại
        </button>
      </form>
    </div>
  );
};
export default AddCategory;
