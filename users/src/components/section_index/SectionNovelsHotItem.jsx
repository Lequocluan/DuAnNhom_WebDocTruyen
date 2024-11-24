import { Link } from "react-router-dom";
import img11 from "../../assets/images/diu_dang_tan_xuong.jpg";

function SectionNovelsHotItem({ novel, novel_type }) {
  const novelConfig = {
    comic: {
      type: "Truyện tranh",
      name: novel.name,
      status: novel.status,
      thumbnail: novel.thumbnail,
      slug: novel.slug,
    },
    story: {
      type: "Truyện chữ",
      name: novel.name,
      status: novel.status,
      thumbnail: novel.story_picture?.path ?? img11,
      slug: novel.slug,
    },
  };
  const novelInfo = novelConfig[novel_type];
  return (
    <>
      <div className="story-item">
        <Link
          className="d-block text-decoration-none"
          to={`/${novelInfo.slug}`}
        >
          <div className="story-item__image">
            <img
              src={novelInfo.thumbnail}
              alt=""
              className="img-fluid"
              width="150"
              height="230"
              loading="lazy"
            />
          </div>
          <h3 className="story-item__name text-one-row story-name">
            {novelInfo.name}
          </h3>

          <div className="list-badge">
            <span className="story-item__badge story-item__badge-hot badge text-bg-danger">{novelInfo.type}</span>
            <span className="story-item__badge story-item__badge-hot badge text-bg-danger">
              Hot
            </span>
            
            {novelInfo.status === 2 && (
              <span className="story-item__badge badge text-bg-success">
                Full
              </span>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}

export default SectionNovelsHotItem;
