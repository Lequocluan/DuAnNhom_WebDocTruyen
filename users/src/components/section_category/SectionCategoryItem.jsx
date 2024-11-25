import { Link } from "react-router-dom";
import img11 from "../../assets/images/diu_dang_tan_xuong.jpg";

function SectionCategoryItem({ novel, novel_type }) {
  // console.log(novel)
  const novelConfig = {
    comic: {
      type: "Truyện tranh",
      name: novel.name,
      status: novel.status,
      thumbnail: novel.thumbnail,
      slug: `/truyen-tranh/${novel.slug}`,
    },
    story: {
      type: "Truyện chữ",
      name: novel.name,
      status: novel.status,
      thumbnail: novel.story_picture?.path ?? img11,
      slug: `/truyen-chu/${novel.slug}`,
    },
  };
  const novelInfo = novelConfig[novel_type];
  return (
    <>
      <div className="story-item">
        <Link to={`${novelInfo.slug}`} className="d-block text-decoration-none">
          <div className="story-item__image">
            <img
              src={novelInfo.thumbnail}
              alt={novelInfo.name}
              className="img-fluid"
              style={{ width: "150px", height: "230px" }}
              loading="lazy"
            />
          </div>
          <h3 className="story-item__name text-one-row story-name truncate">
            {novelInfo.name}
          </h3>

          <div className="list-badge">
            {novel_type == "comic" ? (
              <span className="story-item__badge story-item__badge-hot badge text-bg-primary">
                {novelInfo.type}
              </span>
            ) : (
              <span className="story-item__badge story-item__badge-hot badge text-bg-warning">
                {novelInfo.type}
              </span>
            )}
            {novelInfo.status === 2 && (
              <span className="story-item__badge badge text-bg-success">
                Full
              </span>
            )}
            {novel.is_vip == 1 && (
              <span className="story-item__badge badge bg-[#Ffd700] text-black ">
                VIP
              </span>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}

export default SectionCategoryItem;
