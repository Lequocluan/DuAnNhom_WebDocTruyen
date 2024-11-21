import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

function EditStory() {
  const { id } = useParams();
  const [story, setStory] = useState({
    name: "",
    description: "",
    slug: "",
    author_id: "",
    status: "",
    categories: [],
  });
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  // Fetch story details
  const fetchStory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/story/detail/${id}`
      );
      setStory(response.data.body.data);
    } catch (error) {
      console.error("Error fetching story:", error);
    }
  };

  // Fetch authors and categories
  const fetchAuthorsAndCategories = async () => {
    // try {
      const authorsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/author/list`
      );
      setAuthors(authorsResponse.data.body.data.data);

      const categoriesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/category/list`
      );

      console.log(categoriesResponse)
      const abc = categoriesResponse.data.body.data;
      setCategories(abc.data);
    //   console.log(abc)
    // } catch (error) {
    //   console.error("Error fetching authors or categories:", error);
    // }
  };

  useEffect(() => {
    fetchStory();
    fetchAuthorsAndCategories();
  }, []);

useEffect(() => {
    console.log("Fetched categories:", categories);
  }, [categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStory({ ...story, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { options } = e.target;
    const selectedCategories = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setStory({ ...story, categories: selectedCategories });
  };
console.log(categories)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/story/edit/${id}`,
        story,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/stories");
    } catch (error) {
      console.error("Error updating story:", error);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-xl">
      <h2 className="text-4xl font-bold mb-6">Edit Story</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={story.name}
          onChange={handleInputChange}
          placeholder="Story Name"
          className="p-4 border rounded-lg"
          required
        />
        <textarea
          name="description"
          value={story.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="p-4 border rounded-lg"
        />
        <input
          type="text"
          name="slug"
          value={story.slug}
          onChange={handleInputChange}
          placeholder="Slug"
          className="p-4 border rounded-lg"
        />
        {/* <select
          name="author_id"
          value={story.author_id}
          onChange={handleInputChange}
          className="p-4 border rounded-lg"
          required
        >
          <option value="">Select Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.full_name}
            </option>
          ))}
        </select> */}
        <select
          multiple
          name="categories"
          value={story.categories}
          onChange={handleCategoryChange}
          className="p-4 border rounded-lg"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
        >
          Update Story
        </button>
      </form>
    </div>
  );
}

export default EditStory;
