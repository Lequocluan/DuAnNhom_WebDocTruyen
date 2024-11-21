import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dataCetegory, setDataCetegory] = useState([]);
  const [isBanerOpen, setIsBanerOpen] = useState(true);

  const closeBanerAds = () => {
    setIsBanerOpen(false);

    setTimeout(() => {
      setIsBanerOpen(true);
    }, 100000); //120000
  };

  useEffect(() => {
    axios
      .get("https://truyen.ntu264.vpsttt.vn/api/categories")
      .then((res) => setDataCetegory(res.data.body.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppContext.Provider value={{ dataCetegory, isBanerOpen, closeBanerAds }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
