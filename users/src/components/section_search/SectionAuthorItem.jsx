import { Link } from "react-router-dom";
function AuthorItem({ id, full_name, pen_name, profile_picture }) {
  return <Link to={`/categoryAuthor/${id}`} className="flex flex-col items-center justify-center gap-2">
    <div className="h-44 w-44">
        <img src={profile_picture?.path ?? ""} alt={profile_picture?.title ?? ""} className="w-full h-full rounded-full object-cover" />
    </div>
    <div className="text-center text-xl font-semibold">{pen_name? pen_name : full_name}</div>
  </Link>;
}

export default AuthorItem;
