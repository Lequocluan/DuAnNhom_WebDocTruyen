import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Swal from "sweetalert2";
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';

const Category = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get("authToken");

    const queryParams = new URLSearchParams(location.search);
    const pageFromQuery = queryParams.get('page');  // Extract the 'page' from the query string

    // Default to page 1 if there is no page query
    const [currentPage, setCurrentPage] = useState(pageFromQuery ? parseInt(pageFromQuery, 10) : 1);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const [totalItem, setTotalItem] = useState();

    // Fetch categories when currentPage changes
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/category/list?page=${currentPage}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.status === 200) {
                const apiData = response.data.body.data;
                setTotalItem(apiData.total);
                setCategories(apiData.data); // Lấy mảng thực tế
                setItemsPerPage(apiData.per_age); // Số mục trên mỗi trang
                setTotalPages(apiData.last_page); // Tổng số trang
            } else {
                setMessage('Không thể tải dữ liệu thể loại.');
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            setMessage('Lỗi khi tải dữ liệu thể loại.');
        } finally {
            setLoading(false);
        }
    };

    // Update page in the URL when currentPage changes (pagination actions only)
    const updatePageInUrl = (page) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', page);
        navigate({ search: searchParams.toString() });
    };

    useEffect(() => {
        fetchCategories(); // Fetch categories whenever currentPage changes
    }, [currentPage]);

    // Handle next and previous page buttons
    const nextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            updatePageInUrl(newPage); // Only update the URL on pagination
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            updatePageInUrl(newPage); // Only update the URL on pagination
        }
    };

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            updatePageInUrl(pageNumber); // Only update the URL on pagination
        }
    };

    const getPageRange = () => {
        let range = [];
        if (totalPages <= 6) {
            range = Array.from({ length: totalPages }, (_, index) => index + 1);
        } else {
            if (currentPage <= 3) {
                range = [1, 2, 3, 4, '...', totalPages];
            } else if (currentPage >= totalPages - 2) {
                range = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                range = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }
        return range;
    };

    const handleDelete = async (id) => {
        const category = categories.find((cat) => cat.id === id);
        const categoryName = category ? category.name : "thể loại này";
        Swal.fire({
            title: `Bạn có chắc muốn xóa thể loại "${categoryName}"?`,
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
        return <div className="spinner-border" role="status"></div>;
    }
    if (message) {
        return <p className="text-danger">Lỗi: {message}</p>;
    }
    if (categories.length === 0) {
        return <p>Không có thể loại nào để hiển thị.</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Danh sách thể loại</h2>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <p className="m-0" style={{ lineHeight: '40px' }}>
                    {totalItem} thể loại có sẵn
                </p>
                <Link to="/category/add" className="btn btn-primary">
                    Thêm thể loại
                </Link>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Slug</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>{index + 1 + (currentPage - 1) * (itemsPerPage || 15)}</td>
                                <td>{category.name}</td>
                                <td>{category.slug}</td>
                                <td>{category.status === '1' ? 'Hiển thị' : 'Ẩn'}</td>
                                <td>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => navigate(`/category/edit/${category.id}`)}
                                    >
                                        <HiOutlinePencilSquare />
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        <HiOutlineTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-secondary me-2" onClick={prevPage} disabled={currentPage === 1}>
                    {"<"}
                </button>
                {getPageRange().map((page, index) => (
                    <button
                        key={index}
                        className={`btn btn-outline-primary me-2 ${currentPage === page ? 'active' : ''}`}
                        onClick={() => page !== '...' && paginate(page)}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}
                <button className="btn btn-secondary ms-2" onClick={nextPage} disabled={currentPage === totalPages}>
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Category;
