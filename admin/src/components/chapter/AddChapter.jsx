import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddChapter() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState("1");

  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const successClass =
    "bg-success-bg border-success-outline text-success-outline";
  const errorClass = "bg-error-bg border-error-outline text-error-outline";

  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const location = useLocation();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [latestChapter, setLatestChapter] = useState("");
  const [totalChapters, setTotalChapters] = useState(null);

  const fetchStories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/story/list`
      );
      if (response.data.status === 200) {
        const options = response.data.body.data.data.map((story) => ({
          value: story.id,
          label: story.name,
          slug: story.slug,
        }));
        setStories([{ value: "", label: "Tất cả" }, ...options]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách truyện:", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slugStory = params.get("story");
    if (slugStory && stories.length > 0) {
      const preselectedStory = stories.find(
        (story) => story.slug === slugStory
      );
      setSelectedStory(preselectedStory || null);
    }
  }, [location.search, stories]);

  const fetchLatestChapter = async (slug) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/story/${slug}/chapters`
      );
      if (response.data.status === 200) {
        const chapters = response.data.body.data;
        const totalChapters = chapters.length;
        setTotalChapters(totalChapters);

        const latestChapter =
          totalChapters > 0 ? chapters[totalChapters - 1] : null;

        setLatestChapter(
          latestChapter ? latestChapter.title : "Chưa có chương nào"
        );
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    if (selectedStory && selectedStory.slug) {
      fetchLatestChapter(selectedStory.slug);
    }
  }, [selectedStory]);

  const createChapter = async () => {
    if (!title || !selectedStory || !content) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("story_id", selectedStory.value);
    formData.append("status", status);
    if (sound) {
      formData.append("sound", sound);
    }

    try {
      const response = await axios.post(
        "https://truyen.ntu264.vpsttt.vn/api/chapter/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === 201) {
        toast.success("Thêm chương thành công!");
        setMessage("Thêm chương thành công!");
        setMessageClass(successClass);
        navigate("/chapters");
      } else {
        toast.error("Thêm chương thất bại!");
        setMessage("Thêm chương thất bại!");
        setMessageClass(errorClass);
      }
    } catch (error) {
      console.error("Lỗi khi thêm chương:", error);
      toast.error("Đã xảy ra lỗi khi thêm chương.");
      setMessage("Đã xảy ra lỗi khi thêm chương.");
      setMessageClass(errorClass);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-6 font-mulish">
      <div className="flex justify-between gap-6 items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to="/chapters">
            <HiOutlineArrowLeftCircle className="w-12 h-12 hover:text-scooter-500" />
          </Link>
          <h4 className="text-4xl font-extrabold">Thêm chương</h4>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p>
            <span className="font-bold">Số chương:</span> {totalChapters}
          </p>
          <p>
            <span className="font-bold">Chương mới nhất:</span> {latestChapter}
          </p>
        </div>
      </div>
      {message && (
        <div className={`p-4 mb-4 rounded-lg ${messageClass}`}>{message}</div>
      )}
      <div className="w-full mt-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="ml-4">Story</span>
          <Select
            options={stories}
            value={selectedStory}
            onChange={setSelectedStory}
            isSearchable
            placeholder="Chọn truyện"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="ml-4">Chapter title</span>
          <input
            type="text"
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 focus:ring-scooter-500 focus:border-scooter-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="ml-4">Chapter content</span>
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{ height: "200px", marginBottom: "20px" }}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <span className="ml-4">Sound</span>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setSound(e.target.files[0])}
            className="border p-4 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="ml-4">Status</span>
          <select
            name="status"
            className="p-4 border rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="0">Inactive</option>
            <option value="1">Active</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="bg-scooter-500 font-bold px-9 py-3 text-3xl text-white rounded-2xl hover:bg-scooter-400 transition-all"
          onClick={createChapter}
        >
          Tạo mới
        </button>
      </div>
    </div>
  );
}
