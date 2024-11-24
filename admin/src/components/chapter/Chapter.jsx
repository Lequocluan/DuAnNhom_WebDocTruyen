import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";

function Chapter() {
  const [chapters, setChapters] = useState([]);
  const [deleteChapter, setDeleteChapter] = useState(null);
  const [popup, setPopup] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  const fetchStories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/story/list`
      );
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

  const fetchChapters = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/chapter/list`,
        {
          params: {
            story_id: selectedStory?.value || undefined,
          },
        }
      );
      if (response.data.status === 200) {
        setChapters(response.data.body.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const openPopup = (chapter) => {
    setDeleteChapter(chapter);
    setPopup(true);
  };

  useEffect(() => {
    fetchStories();
    fetchChapters();
  }, []);

  useEffect(() => {
    fetchChapters();
  }, [selectedStory]);

  const handleDeleteChapter = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/chapter/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      fetchChapters();
      setDeleteChapter(null);
      setPopup(false);
    } catch (error) {
      console.error("Lỗi khi xóa chương:", error);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-xl p-8 relative overflow-hidden">
      <div className="flex gap-4 items-center mb-6">
        <Select
          options={stories}
          value={selectedStory}
          onChange={setSelectedStory}
          isSearchable
          placeholder="Tìm kiếm hoặc chọn truyện"
          className="w-1/2"
        />
      </div>
      <div className="flex justify-between items-center">
        <h4 className="text-4xl font-extrabold">Chương của truyện</h4>
        <Link
          to="/chapter/add"
          className="bg-scooter-500 px-8 py-3 text-2xl text-white rounded-2xl hover:bg-scooter-400 transition-all"
        >
          Thêm chương
        </Link>
      </div>
      <div className="w-full mt-10 flex flex-col gap-4">
        <div className="w-full bg-scooter-100 p-5 rounded-3xl font-semibold grid grid-cols-12 gap-2">
          <span className="col-span-3">Title</span>
          <span className="col-span-3">Description</span>
          <span className="col-span-3">Story</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-1">Action</span>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className="w-full bg-slate-50 p-5 rounded-3xl grid grid-cols-12 gap-2 items-center hover:shadow-sm hover:bg-slate-100 transition-all"
              >
                <div className="col-span-3">
                  <div className="flex items-center gap-4">
                    <span>{chapter.title}</span>
                  </div>
                </div>
                <span className="col-span-3 truncate">{chapter.content}</span>
                <span className="col-span-3">{chapter.story.name}</span>
                <span className="col-span-2">
                  {chapter.status == 1 ? (
                    <button className="bg-active-500 px-8 py-3 text-2xl text-white rounded-2xl hover:bg-active-400 transition-all">
                      Active
                    </button>
                  ) : (
                    <button className="bg-error-outline px-8 py-3 text-2xl text-white rounded-2xl transition-all">
                      UnActive
                    </button>
                  )}
                </span>

                <div className="flex gap-6 text-2xl col-span-1">
                  <NavLink to={`/chapter/edit/${chapter.id}`}>
                    <HiOutlinePencilSquare className="w-9 h-9 hover:text-scooter-500" />
                  </NavLink>
                  <HiOutlineTrash
                    className="w-9 h-9 hover:text-scooter-500 hover:cursor-pointer"
                    onClick={() => openPopup(chapter)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {popup ? (
        <div className="w-full h-full absolute top-0 left-0 bg-gray-950/35 flex items-center justify-center">
          <div className="bg-white min-w-[34rem] rounded-xl ring-1 ring-gray-100 shadow-xl px-20 py-14 flex flex-col gap-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-error-bg rounded-lg flex items-center justify-center">
                <HiOutlineXCircle className="w-12 h-12 text-error-outline" />
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-3xl text-black font-extrabold">
                  Bạn muốn xoá thông tin chương này?
                </h5>
                <span className="text-gray-500 text-2xl">
                  Bạn chắc chắn muốn xoá
                  {" " + deleteChapter?.title}?
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="w-full py-2 bg-error-outline hover:bg-error-outline/85 rounded-md text-white"
                onClick={() => handleDeleteChapter(deleteChapter.id)}
              >
                Xác nhận xoá
              </button>
              <button
                className="w-full py-2 bg-scooter-500 hover:bg-scooter-400 rounded-md text-white"
                onClick={() => setPopup(false)}
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Chapter;
