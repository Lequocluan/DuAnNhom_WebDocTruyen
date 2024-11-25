import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SectionChapterComicContent from "./SectionChapterComicContent";
import SectionChapterComicNav from "./SectionChapterComicNav";

function SectionChapterComic() {
  const { slugComic, slugChapter } = useParams();
  const chapterNumber = parseInt(slugChapter.split("-")[1]);
  const [story, setStory] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [error, setError] = useState(null);
  const [apiChapter, setApiChapter] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [chaptersList, setChaptersList] = useState([]);
  const [totalChapters, setTotalChapters] = useState("");
  const navigate = useNavigate();

  // Fetch story data and set apiChapter
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(
          `https://otruyenapi.com/v1/api/truyen-tranh/${slugComic}`
        );
        if (res.status === 200) {
          const serverData = res.data.data.item.chapters[0].server_data;
          const chapterApi =
            serverData && serverData[chapterNumber - 1]?.chapter_api_data;
          if (chapterApi) {
            setApiChapter(chapterApi);
            setStory(res.data.data.item);
            setChaptersList(serverData);
            setTotalChapters(serverData.length);
          } else {
            console.error("Chapter API not found for given chapterNumber");
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [slugComic, chapterNumber]);

  useEffect(() => {
    const fetchData = async () => {
      if (!apiChapter) return;
      try {
        const res = await axios.get(apiChapter);
        if (res.status === 200) {
          setChapter(res.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiChapter]);

  const handlePrevChapter = () => {
    const prevChapterIndex = chapterNumber - 2;
    if (prevChapterIndex >= 0) {
      const prevChapterSlug = chaptersList[prevChapterIndex].chapter_name;
      navigate(`/truyen-tranh/${slugComic}/chuong-${prevChapterSlug}`);
    }
  };

  //! Cập nhật title website
  useEffect(() => {
    if (story) {
      document.title = `Truyện online.vn - ${story.name} - Chương ${
        chapter?.item?.chapter_name || "N/A"
      }`;
    }
  }, [story, chapter]);

  const handleNextChapter = () => {
    const nextChapterIndex = chapterNumber;
    if (nextChapterIndex < chaptersList.length) {
      const nextChapterSlug = chaptersList[nextChapterIndex]?.chapter_name;
      if (nextChapterSlug) {
        navigate(`/truyen-tranh/${slugComic}/chuong-${nextChapterSlug}`);
      } else {
        console.error("Next chapter slug is undefined");
      }
    } else {
      console.log("No next chapter available");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="chapter-wrapper container my-5 text-center">
      <Link to={`/truyen-tranh/${story.slug}`} className="text-decoration-none">
        <h1
          className="text-center text-2xl text-success"
          style={{ display: "inline-block" }}
        >
          {story.name}
        </h1>
      </Link>
      <p className="text-center text-dark">
        Chương {chapter?.item?.chapter_name || "N/A"} | Tổng số chương:{" "}
        {totalChapters}
      </p>
      <hr className="chapter-start container-fluid" />
      <SectionChapterComicNav
        onPrevChapter={handlePrevChapter}
        onNextChapter={handleNextChapter}
        hasPrev={chapterNumber > 1}
        hasNext={chapterNumber < totalChapters}
        chapters={chaptersList}
        slugStory={story.slug}
        currentChapterSlug={chapter?.item?.slug}
      />
      <hr className="chapter-end container-fluid" />
      {chapter?.item && <SectionChapterComicContent data={chapter.item} />}
      <hr className="chapter-end container-fluid" />
      <SectionChapterComicNav
        onPrevChapter={handlePrevChapter}
        onNextChapter={handleNextChapter}
        hasPrev={chapterNumber > 1}
        hasNext={chapterNumber < totalChapters}
        chapters={chaptersList}
        slugStory={story.slug}
        currentChapterSlug={chapter?.item?.slug}
      />
      <div
        className="text-center px-2 py-2 alert alert-success d-none d-lg-block"
        role="alert"
      >
        Bạn có thể dùng phím mũi tên hoặc WASD để lùi/sang chương
      </div>
    </div>
  );
}

export default SectionChapterComic;
