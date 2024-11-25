import { useState, useEffect } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import SectionChapterContent from "./SectionChapterContent";
import SectionChapterNav from "./SectionChapterNav";

function SectionChapter() {
  const { slugStory, slugChapter } = useParams();

  const [story, setStory] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chaptersList, setChaptersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://truyen.ntu264.vpsttt.vn/api/chapter/detail/${slugStory}/${slugChapter}`
        );
        const data = await response.json();
        if (data.status === 404) {
          setError(404);
          return;
        }

        setStory(data.body.data.story);
        setChapter(data.body);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterData();
  }, [slugStory, slugChapter]);

  useEffect(() => {
    const fetchChaptersList = async () => {
      try {
        const response = await fetch(
          `https://truyen.ntu264.vpsttt.vn/api/story/${slugStory}/chapters`
        );
        const data = await response.json();
        if (data.status === 200) {
          setChaptersList(data.body.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (slugStory) {
      fetchChaptersList();
    }
  }, [slugStory]);

  //!  Cập nhật title website
  useEffect(() => {
    if (story) {
      document.title = `Truyện online.vn - Đọc truyện ${story.name} - Chương ${chapter?.data?.title}`;
    }
  }, [story, chapter]);

  const handlePrevChapter = () => {
    if (story && chapter.previous_chapter) {
      navigate(`/${slugStory}/${chapter.previous_chapter.slug}`);
    }
  };

  const handleNextChapter = () => {
    if (story && chapter && chapter.next_chapter) {
      navigate(`/${slugStory}/${chapter.next_chapter.slug}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error === 404) {
    return <Navigate to={<Error />} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="chapter-wrapper container my-5 text-center">
        <Link to={`/${story.slug}`} className="text-decoration-none">
          <h1
            className="text-center text-success "
            style={{ display: "inline-block" }}
          >
            {story.name}
          </h1>
        </Link>
        <p className="text-center text-dark">{chapter.data.title}</p>

        <hr className="chapter-start container-fluid" />

        <SectionChapterNav
          onPrevChapter={handlePrevChapter}
          onNextChapter={handleNextChapter}
          hasPrev={!!chapter.previous_chapter}
          hasNext={!!chapter.next_chapter}
          chapters={chaptersList}
          slugStory={story.slug}
          currentChapterSlug={chapter.data.slug}
        />
        <hr className="chapter-end container-fluid" />
        <SectionChapterContent text={chapter.data.content} />

        <div
          className="text-center px-2 py-2 alert alert-success d-none d-lg-block"
          role="alert"
        >
          Bạn có thể dùng phím mũi tên hoặc WASD để lùi/sang chương
        </div>
      </div>
    </>
  );
}

export default SectionChapter;
