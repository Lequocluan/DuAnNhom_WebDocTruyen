import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

const EditCategory = () => {
  const { id } = useParams();  // Lấy id từ URL
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');  // Thêm trạng thái
  const navigate = useNavigate();
  
  const cookies = new Cookies();
  const token = cookies.get('authToken');

  // Lấy thông tin thể loại cần chỉnh sửa
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
          setStatus(categoryData.status);  // Lấy trạng thái từ dữ liệu
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

  // Xử lý cập nhật thể loại
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/category/update`,
        { id,name, description, status },  // Thêm status vào payload
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response)
      if (response.data.status === 200) {
        Swal.fire('Thành công!', 'Cập nhật thể loại thành công!', 'success').then(() => {
          navigate('/category');
        });
      } else {
        Swal.fire('Lỗi!', 'Cập nhật thể loại thất bại.', 'error');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thể loại:', error);
      Swal.fire('Lỗi!', 'Cập nhật thể loại thất bại.', 'error');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (message) {
    return <p className="text-red-500">{message}</p>;
  }

  if (!category) {
    return <p>Không tìm thấy thể loại này.</p>;
  }

  return (
    <div className="container mx-auto mt-8 p-4 max-w-lg">
      <h2 className="text-2xl font-semibold mb-6">Chỉnh sửa thể loại</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên thể loại</label>
          <input
            type="text"
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
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
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
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
