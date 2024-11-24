import { useState, useEffect } from "react";
import { HiOutlineArrowLeftCircle, HiOutlineCamera, HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import axios from "axios";

function AddStory() {
  const [story, setStory] = useState({
    name: "",
    description: "",
    author_id: "",
    status: 1,
    categories: [],
    story_picture: null,
});

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const success = "bg-success-bg border-success-outline text-success-outline";
  const error = "bg-error-bg border-error-outline text-error-outline";
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("authToken");

    if (!token) {
        console.error("Auth token is missing!");
        navigate("/login"); 
        return;
    }
    
    const validateFields = () => {
        const newErrors = {};
      
        if (!story.name.trim()) newErrors.name = "Vui lòng nhập tên truyện.";
        if (!story.description.trim()) newErrors.description = "Vui lòng nhập mô tả cho truyện.";
        if (!story.categories.length) newErrors.categories = "Vui lòng chọn ít nhất một danh mục.";
        if (!story.author_id) newErrors.author_id = "Vui lòng chọn tác giả.";
        if (!story.story_picture) newErrors.story_picture = "Vui lòng chọn ảnh cho truyện.";
        if (!title.trim()) newErrors.title = "Vui lòng nhập tiêu đề cho ảnh.";
        if (story.status === "") newErrors.status = "Vui lòng chọn trạng thái cho truyện.";
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };
    
  const fetchData = async () => {
    try {
        const [authorsResponse, categoriesResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/author/list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }),
            axios.get(`${import.meta.env.VITE_API_URL}/category/data`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }),
      ]);
  
      const formattedAuthors = authorsResponse.data.body.data.map((author) => ({
        value: author.id,
        label: author.full_name,
      }));
      setAuthors(formattedAuthors);
  
      const formattedCategories = categoriesResponse.data.body.data.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching categories/authors", error);
      setMessage("Lỗi tải dữ liệu danh mục hoặc tác giả.");
      setStatus("error");
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (selectedOptions) => {
    setStory((prev) => ({ ...prev, categories: selectedOptions || [] }));
  };

  const handleAuthorChange = (selectedOption) => {
    setStory({ ...story, author_id: selectedOption.value });
  };

  const handlePictureStoryChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setStory((prev) => ({ ...prev, story_picture: file }));
    }else{
        setStatus(error)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
  
    try {
      let pictureId = null;
  
      if (story.story_picture) {
        const responseImage = await uploadStoryImage(story.story_picture, title);
        if (responseImage && responseImage?.data?.status < 400) {
          pictureId = responseImage.data.body.data.id;
        } else {
          toast.error("Upload ảnh thất bại.");
          setMessage("Upload ảnh thất bại.");
          setStatus("error");
          return;
        }
      }
  
      const response = await createStoryRequest(pictureId);
  
      if (response?.error) { 
        setStatus("error");
        return;  
      }
  
      if (response?.status >= 200 && response?.status < 300) {
        toast.success("Thêm truyện thành công!");
        setMessage("Thêm truyện thành công!");
        setStatus("success");
        navigate("/story");
      } else {
        const errors = Array.isArray(response.data.body.message)
          ? response.data.body.message
          : [];
  
        const nameError = errors.find((err) => err.field === "name");
        if (nameError) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: nameError.error_message,
          }));
        }
  
        setMessage("Có lỗi xảy ra, vui lòng kiểm tra lại.");
        setStatus("error");
      }
    } catch (error) {
      console.error("Lỗi trong khi submit:", error);
      setStatus("error");
      setMessage("Lỗi kết nối tới server.");
    }
  };
  

  const uploadStoryImage = async (file, title) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title || "Default Title"); 
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Upload response:", response.data);
  
      if (response?.data?.status < 400) {
        return response; 
      } else {
        throw new Error("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null; 
    }
  };
  const createStoryRequest = async (pictureId) => {
    try {
      const payload = {
        name: story.name,
        description: story.description,
        author_id: story.author_id,
        status: story.status || 1,
        thumbnail_id: pictureId,
        category_ids: story.categories.map((cat) => cat.value),
        story_images: story.story_picture.title,
      };
  
      console.log("Creating story with data:", payload);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/story/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.status === 400) {
        const errors = response.data.body.message;
        const newErrors = {};
        errors.forEach((error) => {
          if (error.field === "name") {
            newErrors.name = error.error_message; 
          }
        });
  
        setErrors(newErrors);
        return { error: errors[0]?.error_message };
      }
  
      return response;
    } catch (error) {
      console.error("Error creating story:", error);
      return { error: "Có lỗi xảy ra, vui lòng thử lại sau." };
    }
  };
  
  useEffect(() => {
    if (message || errors) {
      const timeout = setTimeout(() => {
        setMessage("");
        setErrors("");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [message, errors]);
  

  return (
    <div className="w-full bg-white rounded-xl overflow-auto h-screen flex flex-col p-6 font-mulish">
        <div className="flex gap-6 items-center mb-6">
            <Link to="/story">
            <HiOutlineArrowLeftCircle className="w-12 h-12 hover:text-scooter-500" />
            </Link>
            <h4 className="text-4xl font-extrabold">Thêm truyện mới</h4>
        </div>
        {message && (
            <div
            name="toast"
            className={`flex gap-3 items-center w-fit min-w-48 rounded-2xl border-2 px-4  py-3 ${
                status == "success" && success
            } ${status == "error" && error}`}
            >
            {status == "success" && <HiOutlineCheckCircle className="w-9 h-9" />}
            {status == "error" && <HiOutlineXCircle className="w-9 h-9" />}

            <span className="text-black font-semibold">{message}</span>
            </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
            <div className="flex flex-col gap-2">
                <span className="ml-4">Story Name</span>
                <input
                    type="text"
                    name="name"
                    value={story.name}
                    onChange={handleInputChange}
                    placeholder="Story Name"
                    className={`p-4 border rounded-lg ${
                        errors.name ? "border-error-outline" : ""
                    }`}
                />{errors.name && <span className="text-xl text-error-outline">{errors.name}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <span className="ml-4">Description</span>
                <ReactQuill
                    value={story.description}
                    onChange={(value) => setStory((prev) => ({ ...prev, description: value }))}
                    style={{ height: "200px", marginBottom: "20px" }}
                />
                <br/>
                {errors.description && <span className="text-xl text-error-outline">{errors.description}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <span className="ml-4">Categories</span>
                <Select
                    isMulti
                    options={categories}
                    value={story.categories}
                    onChange={handleCategoryChange}
                    placeholder="Find categories..."
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
                {errors.categories && <span className="text-xl text-error-outline">{errors.categories}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <span className="ml-4">Author</span>
                <Select
                    id="author"
                    options={authors}
                    value={authors.find((author) => author.value === story.author_id)}
                    onChange={handleAuthorChange}
                    placeholder="Choose Author"
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable
                />
                {errors.author_id && <span className="text-xl text-error-outline">{errors.author_id}</span>}
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <span className="ml-4">Story Picture</span>
                <div className="w-full h-80 border-2 border-dashed rounded-xl hover:border-scooter-500 overflow-hidden relative group">
                {image || (story.story_picture && story.story_picture.path) ? (
                    <img
                        src={image || story.story_picture.path}
                        alt="Story Image"
                        className="object-contain w-full h-full absolute"
                    />
                    ) : (
                    <HiOutlineCamera className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200 group-hover:text-scooter-500" />
                    )}

                    <input
                    type="file"
                    className="w-full h-full opacity-0"
                    accept="image/*"
                    onChange={handlePictureStoryChange}
                    />
                </div>
                {errors.story_picture && <span className="text-xl text-error-outline">{errors.story_picture}</span>}
                <input
                    type="text"
                    className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <span className="text-xl text-error-outline">{errors.title}</span>}
                
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <span className="ml-4">Status</span>
                <select
                    name="status"
                    value={story.status}
                    onChange={(e) => handleInputChange({ target: { name: "status", value: parseInt(e.target.value, 10) } })}
                    className="p-4 border rounded-lg"
                    >
                    <option value="2">Completed</option>
                    <option value="0">Inactive</option>
                    <option value="1">Is Launching</option>
                </select>
            </div>
            <div className="mt-6 justify-center flex gap-4">
                <button type="submit" className="px-8 py-4 text-white bg-scooter-500 rounded-xl font-semibold">
                    Thêm truyện
                </button>
            </div>
      </form>
    </div>
  );
}

export default AddStory;
