import axios from "axios";
import { useEffect, useState } from "react";

function Author() {
  const [authors, setAuthors] = useState([]);

  // Fetch data author
  const fetchAuthors = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/author/list`
      );
      if (response.data.status === 200) {
        setAuthors(response.data.body.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Full name</th>
            <th>Pen name</th>
            <th>Birth date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center">
                  <div className="w-24 h-24">
                    <img
                      src={author.profile_picture.path}
                      alt={author.profile_picture.title}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span>{author.full_name}</span>
                </div>
              </td>
              <td>{author.pen_name}</td>
              <td>{author.birth_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
