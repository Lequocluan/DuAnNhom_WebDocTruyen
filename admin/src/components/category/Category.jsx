import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import Pagination from "../../ui/pagination/pagination";
import { NavLink } from "react-router-dom";

const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const queryParams = new URLSearchParams(location.search);
  const pageFromQuery = queryParams.get("page"); // Extract the 'page' from the query string

  // Default to page 1 if there is no page query
  const [currentPage, setCurrentPage] = useState(
    pageFromQuery ? parseInt(pageFromQuery, 10) : 1
  );

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
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
        setItemsPerPage(apiData.per_page); // Số mục trên mỗi trang
        setTotalPages(apiData.last_page); // Tổng số trang
      } else {
        setMessage("Không thể tải dữ liệu thể loại.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setMessage("Lỗi khi tải dữ liệu thể loại.");
    } finally {
      setLoading(false);
    }
  };

  // Update page in the URL when currentPage changes (pagination actions only)
  const updatePageInUrl = (page) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page);
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
        range = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        range = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        range = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
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
    <div className="w-full h-full max-h-full bg-white rounded-xl p-8 relative overflow-hidden flex-col flex flex-1">
      <div className="flex justify-between items-center">
        <h4 className="text-4xl font-extrabold">Thể loại</h4>
        <Link
          to="/category/add"
          className="bg-scooter-500 px-8 py-3 text-2xl text-white rounded-2xl hover:bg-scooter-400 transition-all"
        >
          Thêm thể loại
        </Link>
      </div>

      <div className="d-flex justify-content-between mb-3 align-items-center">
        <p className="mb-5 mt-2 ml-4">{totalItem} thể loại có sẵn</p>
      </div>

      <div className="w-full mt-2 flex flex-col gap-4 flex-1 h-1/2">
        <div className="w-full bg-scooter-100 p-5 rounded-3xl font-semibold grid grid-cols-11 gap-4">
          <span>No.</span>
          <span className="col-span-2">Name</span>
          <span className="col-span-2">Slug</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-3">Description</span>
          <span>Action</span>
        </div>
        <div className="flex flex-col h-full overflow-y-scroll no-scrollbar">
          <div className="flex flex-col gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="w-full bg-slate-50 p-5 rounded-3xl grid grid-cols-11 gap-2 items-center hover:shadow-sm hover:bg-slate-100 transition-all"
              >
                <div>
                  {index + 1 + (currentPage - 1) * (itemsPerPage || 15)}
                </div>
                <span className="col-span-2">
                  {category.name}
                </span>
                <span className="col-span-2">
                  {category.slug}
                </span>
                <span className="col-span-2">
                {category.status === "1" ? "Hiển thị" : "Không hiển thị"}
                </span>
                <span className="col-span-3 truncate">
                {category.description ? category.description : "Không có mô tả chi tiết"}
                </span>
                <div className="flex gap-6 text-2xl">
                  <NavLink to={`/category/edit/${category.id}`}>
                    <HiOutlinePencilSquare className="w-9 h-9 hover:text-scooter-500" />
                  </NavLink>
                  <HiOutlineTrash
                    className="w-9 h-9  hover:text-scooter-500 hover:cursor-pointer"
                    onClick={() => handleDelete(category.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
        total={totalItem}
        per_page={itemsPerPage}
        current={currentPage}
        onPrevPage={prevPage}
        onNextPage={nextPage}
        onToPage={(page) => paginate(page)}
      />
      </div>
    </div>
  );
};

export default Category;
