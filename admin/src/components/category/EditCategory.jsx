import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { HiOutlineArrowLeftCircle } from 'react-icons/hi2';
import ErrorMessage from "./ErrorMessage";

const EditCategory = () => {
  const { id } = useParams();  // Lấy id từ URL
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(''); 
  const navigate = useNavigate();
  
  const cookies = new Cookies();
  const token = cookies.get('authToken');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/category/detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.status === 200) {
          const categoryData = response.data.body.data;
          setCategory(categoryData);
          setName(categoryData.name);
          setDescription(categoryData.description);
          setStatus(categoryData.status);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu thể loại:', error);
        setMessage('Lỗi khi tải dữ liệu thể loại.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/category/update`,
        { id,name, description, status },  
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status === 200) {
        Swal.fire('Thành công!', 'Cập nhật thể loại thành công!', 'success').then(() => {
          navigate('/category');
        });
      } else {
        const errorResponse  = Array.isArray(response.data.body.message) && response.data.body.message.length > 0
          ? response.data.body.message[0].error_message
          : "Có lỗi xảy ra.";
          setErrorMessage(errorResponse);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      Swal.fire('Error!', 'Error updating category.', 'error');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (message) {
    return <p className="text-red-500">{message}</p>;
  }

  if (!category) {
    return <p className="text-center text-lg">Không tìm thấy thể loại này.</p>;
  }

  return (
    <div className="w-full bg-white rounded-xl p-6 font-mulish">
        <div className="flex gap-6 items-center mb-6">
            <Link to="/category">
                <HiOutlineArrowLeftCircle className="w-12 h-12 hover:text-scooter-500" />
            </Link>
            <h4 className="text-4xl font-extrabold">Sửa thông tin thể loại</h4>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label htmlFor="name" className="ml-4">Name</label>
          <input
            type="text"
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

      <ErrorMessage errorMessage={errorMessage} />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="ml-4">Description</label>
          <textarea
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>
        
        {/* Trạng thái */}
        <div className="mb-4">
          <label htmlFor="status" className="ml-4">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="1">Hiển thị</option>
            <option value="0">Ẩn</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
