import { useLocation, useNavigate } from "react-router-dom";

function convertDate(dateStr) {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
}

function calculateOffset(limit, current){
  return (current - 1) * limit
}


export { convertDate, calculateOffset};
