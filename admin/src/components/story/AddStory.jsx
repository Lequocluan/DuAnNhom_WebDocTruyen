import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Select from 'react-select';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HiOutlineArrowLeftCircle, HiOutlineCamera } from "react-icons/hi2";

function AddStory() {
  const [story, setStory] = useState({
    name: "",
    description: "",
    slug: "",
    author_id: "",
    status: "",
    categories: [],
    story_picture: null,
  });
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null); 
  const [newImageFile, setNewImageFile] = useState(null); 
  const [title, setTitle] = useState(""); 
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  
  const fetchAuthorsAndCategories = async () => {
    try {
      const authorsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/author/list`
      );
      const formattedAuthors = authorsResponse.data.body.data.map((author) => ({
        value: author.id,
        label: author.full_name,  
      }));
      setAuthors(formattedAuthors);

      const categoriesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/category/data`
      );
      const rawCategories = categoriesResponse.data.body.data;
      const formattedCategories = rawCategories.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching authors or categories:", error);
    }
  };

  useEffect(() => {
    fetchAuthorsAndCategories();
  }, []);

  const handlePictureProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
      setNewImageFile(file); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let storyPicturePath = story.story_picture?.path; 

      if (newImageFile) {
      const formData = new FormData();
      formData.append("file", newImageFile);
      try {
        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/image/upload`, 
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        storyPicturePath = uploadResponse.data.body.filePath; 
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
        return;
      }
    }

    const payload = {
      ...story,
      description: value, 
      categories: story.categories.map((category) => category.value),
      author_id: story.author_id,
      story_picture: {
        path: storyPicturePath,
        title: title || "Untitled Image",
      },
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/story/create`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/story");
    } catch (error) {
      console.error("Error adding story:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStory({ ...story, [name]: value });
  };

  const handleCategoryChange = (selectedOptions) => {
    setStory({ ...story, categories: selectedOptions || [] });
  };

  const handleAuthorChange = (selectedOption) => {
    setStory({ ...story, author_id: selectedOption.value });
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-auto h-screen flex flex-col p-6 font-mulish">
    <div className="flex gap-6 items-center mb-6">
      <Link to="/story">
        <HiOutlineArrowLeftCircle className="w-12 h-12 hover:text-scooter-500" />
      </Link>
      <h4 className="text-4xl font-extrabold">Thêm truyện mới</h4>
    </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
        <div className="flex flex-col gap-2">
          <span className="ml-4">Name</span>
          <input
            type="text"
            name="name"
            value={story.name}
            onChange={handleInputChange}
            placeholder="Story Name"
            className="p-4 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="ml-4">Description</span>
          <ReactQuill
            value={value}
            onChange={setValue}
            style={{ height: "200px", marginBottom: "20px" }}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
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
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <span className="ml-4">Author</span>
          <Select
            id="author"
            options={authors}
            placeholder="Choose author..."
            className="basic-single"
            classNamePrefix="select"
            value={authors.find(author => author.value === story.author_id)} 
            onChange={handleAuthorChange}
            isSearchable
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="ml-4">Story Picture</span>
          <div className="w-full h-80 border-2 border-dashed rounded-xl hover:border-scooter-500 overflow-hidden relative group">
            {image || story.story_picture ? (
              <img
                src={image || story.story_picture.path}
                alt={title || "Story Image"}
                className="object-contain w-full h-full absolute"
              />
            ) : (
              <HiOutlineCamera className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200 group-hover:text-scooter-500" />
            )}
            <input
              type="file"
              className="w-full h-full opacity-0"
              accept="image/*"
              onChange={handlePictureProfileChange}
            />
          </div>
          <input
            type="text"
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Image Title"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 py-2 px-4 rounded-lg text-white"
        >
          Add Story
        </button>
        <div className="flex flex-col gap-2">
          <span className="ml-4">Status</span>
          <select
            name="status"
            value={story.status}
            onChange={handleInputChange}
            className="p-4 border rounded-lg"
            required
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default AddStory;
