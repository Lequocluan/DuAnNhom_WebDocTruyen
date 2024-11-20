import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Swal from "sweetalert2";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const cookies = new Cookies();
    const token = cookies.get("authToken");
    
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/category/list`);
            if (response.data.status === 200) {
                setCategories(response.data.body.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            setMessage('Lỗi khi tải dữ liệu thể loại.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        const category = categories.find((cat) => cat.id === id);
        const categoryName = category?category.name:"thể loại này";
        Swal.fire({
            title:`Bạn có chắc muốn xóa thể loại "${categoryName}" ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, xóa ngay!",
            cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`${import.meta.env.VITE_API_URL}/category/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then(() => {
                setCategories(categories.filter((category) => category.id !== id));
                Swal.fire("Đã xóa!", `"${categoryName}" đã được xóa.`, "success");
              })
              .catch((err) => {
                console.error("Lỗi khi xóa:", err);
                Swal.fire("Lỗi!", "Xóa thể loại không thành công.", "error");
              });
          }
        });
      };

    if (loading) {
        return <p>Loading...</p>;
    }
    if (!loading && message) {
        return <p className="text-danger">Lỗi: {message}</p>;
      }
      
      if (categories.length === 0) {
        return <p>Không có thể loại nào để hiển thị.</p>;
      }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Danh sách thể loại</h2>
            {message && <div className="text-green-500 mb-4">{message}</div>}
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div>
                    <p className="m-0" style={{ lineHeight: '40px' }}>
                        {categories.length} thể loại có sẵn
                    </p>
                </div>
                <Link to="/category/add" className="btn btn-primary">
                    Add New Category
                </Link>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Slug</th>
                            <th>Mô tả</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>{index + 1}</td> {/* STT */}
                                <td>{category.name}</td>
                                <td>{category.slug}</td>
                                <td>{category.description || 'Không có'}</td>
                                <td>{category.status === '1' ? 'Hiển thị' : 'Ẩn'}</td>
                                <td>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => navigate(`/category/edit/${category.id}`)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;
