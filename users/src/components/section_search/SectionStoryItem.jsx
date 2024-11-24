import { Link } from "react-router-dom";

function StoryItem({name, slug, status, story_picture}) {
    return (
        <>
          <div className="story-item">
            <Link to={`/${slug}`} className="d-block text-decoration-none">
              <div className="story-item__image">
                <img
                  src={story_picture?.path}
                  alt={story_picture?.title}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <h3 className="story-item__name text-one-row story-name">{name}</h3>
    
              <div className="list-badge">
                {status === 2 && (
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

export default StoryItem;