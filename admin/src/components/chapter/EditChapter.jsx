import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

export default function EditChapter() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sound, setSound] = useState(null);
  const [initialSound, setInitialSound] = useState(null); 
  const [status, setStatus] = useState("1");
  const [selectedStory, setSelectedStory] = useState(null);
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/story/list`);
      if (response.data.status === 200) {
        const options = response.data.body.data.data.map((story) => ({
          value: story.id,
          label: story.name,
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

  const fetchChapterData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/chapter/detail/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status === 200) {
        const { title, content, sound, status, story_id } = response.data.body.data;
        setTitle(title);
        setContent(content);
        setInitialSound(sound);
        setStatus(status);
        const story = stories.find((story) => story.value === story_id);
        setSelectedStory(story || null);
      } else {
        toast.error("Không tìm thấy chương.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu chương:", error);
      toast.error("Đã xảy ra lỗi khi tải chương.");
    }
  };

  useEffect(() => {
    if (id) fetchChapterData();
  }, [id, stories, token]);

  const updateChapter = async () => {
    if (!title || !selectedStory || !content) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("story_id", selectedStory.value);
    formData.append("status", status);
    formData.append("id", id);
    if (sound) {
      formData.append("sound", sound); 
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/chapter/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      if (response.data.status === 200) {
        toast.success("Sửa chương thành công!");
        navigate("/chapters");
      } else {
        toast.error("Dung lượng file quá lớn.");
      }
    } catch (error) {
      console.error("Lỗi khi sửa chương:", error);
      toast.error("Đã xảy ra lỗi khi sửa chương.");
    }
  };
  

  return (
    <div className="w-full bg-white rounded-xl p-6 font-mulish">
      <div className="flex justify-between gap-6 items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to="/chapters">
            <HiOutlineArrowLeftCircle className="w-12 h-12 hover:text-scooter-500" />
          </Link>
          <h4 className="text-4xl font-extrabold">Sửa chương</h4>
        </div>
      </div>

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
          {initialSound && !sound && (
  <div className="mt-2">
    <p>Sound hiện tại:</p>
    <audio controls src={initialSound}>
      Your browser does not support the audio element.
    </audio>
  </div>
)}

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
          onClick={updateChapter}
        >
          Sửa
        </button>
      </div>
    </div>
  );
}
