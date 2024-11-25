import { Link } from "react-router-dom";

function StoryItem({ data }) {
  return (
    <>
      <div className="story-item">
        <Link
          to={`/${data.type == "comic" ? "truyen-tranh" : "truyen-chu"}/${
            data.slug
          }`}
          className="d-block text-decoration-none"
        >
          <div className="story-item__image">
            <img
              src={
                data.type == "story" ? data.story_picture?.path : data.thumbnail
              }
              alt={data.type == "story" ? data.story_picture?.title : data.name}
              className="w-full h-full"
              loading="lazy"
              style={{ height: "225px", width: "150px" }}
            />
          </div>
          <h3 className="story-item__name text-one-row story-name text-truncate">
            {data.name}
          </h3>

          <div className="list-badge">
            {data.type == "story" && data.status === 2 && (
              <span className="story-item__badge badge text-bg-success">
                Full
              </span>
            )}
            {data.type == "comic" ? (
              <span className="story-item__badge story-item__badge-hot badge text-bg-primary">
                Truyện tranh
              </span>
            ) : (
              <span className="story-item__badge story-item__badge-hot badge text-bg-warning">
                Truyện chữ
              </span>
            )}
            {data.is_vip == 1 && (
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

export default StoryItem;
