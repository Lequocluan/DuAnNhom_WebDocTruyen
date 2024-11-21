import axios from "axios";
import { useEffect, useState } from "react";
import {
  HiOutlineArrowLeftCircle,
  HiOutlineCalendar,
  HiOutlineCamera,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function AddAds() {
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const success = "bg-success-bg border-success-outline text-success-outline";
  const error = "bg-error-bg border-error-outline text-error-outline";

  const navigate = useNavigate();

  // Get token
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setPicture(file);
    }
  };

  const createAds = async () => {
    if (!link) {
      setStatus("error");
      setMessage("Vui lòng gắn link quảng cáo");
      return;
    }

    if (!picture) {
      setStatus("error");
      setMessage("Vui lòng chọn ảnh quảng cáo");
      return;
    }

    try {
      let pictureId = null;
      if (picture) {
        const title_picture = title ? title : link;
        const responseImage = await uploadPicture(picture, title_picture);
        if (!responseImage) {
          setStatus("error");
          setMessage("Có lỗi xảy ra khi tải ảnh lên.");
          return;
        }
        pictureId = responseImage.data.body.data.id;
      }

      const response = await createAdsRequest(pictureId);
      if (response?.status >= 200 && response?.status < 300) {
        setStatus("success");
        setMessage("Thêm quảng cáo thành công!");
        navigate("/ads");
      } else {
        setStatus("error");
        setMessage(
          response?.data?.message || "Có lỗi xảy ra khi thêm quảng cáo."
        );
      }
    } catch (error) {
      console.error(error); // Log lỗi chi tiết cho dễ debug
      setStatus("error");
      setMessage("Lỗi kết nối tới server.");
    }
  };

  // Hàm upload ảnh
  const uploadPicture = async (file, title) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
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
      return response?.data?.status < 400 ? response : null; // Nếu lỗi trả về null
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Hàm tạo quảng cáo
  const createAdsRequest = async (pictureId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ads/create`,
        {
          link: link,
          picture_id: pictureId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response; // Trả về response để xử lý ở trên
    } catch (error) {
      console.error("Error creating ads:", error);
      return { status: 500, data: { message: "Có lỗi khi tạo quảng cáo." } }; // Trả về đối tượng lỗi
    }
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 500);
    }
  }, [message]);

  return (
    <div className="w-full bg-white rounded-xl p-6 font-mulish">
      <div className="flex gap-6 items-center mb-6">
        <Link to="/ads">
          <HiOutlineArrowLeftCircle className="w-12 h-12 hover:text-scooter-500" />
        </Link>
        <h4 className="text-4xl font-extrabold">Thêm quảng cáo</h4>
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
      <div className="w-full mt-4 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="ml-4">Link</span>
          <input
            type="text"
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="ml-4">Picture</span>
          <div className="w-full h-80 border-2 border-dashed rounded-xl hover:border-scooter-500 overflow-hidden relative group">
            {image ? (
              <img
                src={image}
                className="object-contain w-full h-full absolute"
              />
            ) : (
              <HiOutlineCamera className="w-20 h-20 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200 group-hover:text-scooter-500" />
            )}

            <input
              type="file"
              className="w-full h-full opacity-0"
              accept="image/*"
              onChange={handlePictureChange}
            />
          </div>
          <input
            type="text"
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="bg-scooter-500 font-bold px-9 py-3 text-3xl text-white rounded-2xl hover:bg-scooter-400 transition-all"
          onClick={createAds}
        >
          Tạo mới
        </button>
      </div>
    </div>
  );
}

export default AddAds;
