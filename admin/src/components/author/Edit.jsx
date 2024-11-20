import { useEffect, useState } from "react";
import { HiOutlineArrowLeftCircle, HiOutlineCamera } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { GET } from "../../utils/response";
import { data } from "autoprefixer";
import { convertDate } from "../../utils/helper";

function EditAuthor() {
  const [image, setImage] = useState(null);
  const [pictureProfile, setPictureProfile] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [title, setTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [penName, setPenName] = useState("");

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const success = "bg-success-bg border-success-outline text-success-outline";
  const error = "bg-error-bg border-error-outline text-error-outline";

  const navigate = useNavigate();
  const { id } = useParams();

  // Get token
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const handlePictureProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setPictureProfile(file);
    }
  };

  const fetchAuthor = async () => {
    try {
      const { data } = await GET(
        `${import.meta.env.VITE_API_URL}/author/detail/${id}`
      );
      return data ? data : null;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await fetchAuthor();
          if (!data) {
            setStatus("error");
            setMessage("Có lỗi xảy ra lấy thông tin tác giả.");
            navigate("/author");
            return;
          }
          setFullName(data.full_name);
          setPenName(data.pen_name);
          setBirthDate(convertDate(data.birth_date));
        } catch (error) {
          setStatus("error");
          setMessage("Có lỗi xảy ra khi lấy thông tin tác giả.");
          navigate("/author");
        }
      };
    
      fetchData();
  }, [id]);

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 500);
    }
  }, [message]);
  return (
    <div className="w-full bg-white rounded-xl p-6">
      <div className="flex gap-6 items-center mb-6">
        <Link to="/author">
          <HiOutlineArrowLeftCircle className="w-12 h-12 hover:text-scooter-500" />
        </Link>
        <h4 className="text-4xl font-extrabold">Sửa thông tin tác giả</h4>
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
          <span className="ml-4">Full name</span>
          <input
            type="text"
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="ml-4">Pen name</span>
          <input
            type="text"
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
            value={penName}
            onChange={(e) => setPenName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="ml-4">Birth date</span>
          <input
            type="date"
            className="w-full border-2 px-4 py-3 rounded-xl border-gray-300 text-xl focus:ring-scooter-500 focus:border-scooter-500"
            placeholder="dd/mm/yyyy"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="ml-4">Picture profile</span>
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
              onChange={handlePictureProfileChange}
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
          //   onClick={createAuthor}
        >
          Chỉnh sửa
        </button>
      </div>
    </div>
  );
}

export default EditAuthor;
