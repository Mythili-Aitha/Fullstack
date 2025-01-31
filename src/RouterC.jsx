import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import Test from "./Components/Test";
const RouterC = () => {
  const [notification, setNotification] = useState([]);
  const [items, setItems] = useState([]);
  const [dataFrom, setDataFrom] = useState("");

  const getUser = () => {
    fetch("http://localhost:3000/api/notifications")
      .then((res) => res.json())
      .then((json) => {
        console.log("Notifications from backend:", json);
        setNotification(json.data);
      })
      .catch((error) => console.error("Error fetching notifications:", error));

    fetch("http://localhost:3000/api/items")
      .then((res) => res.json())
      .then((json) => {
        console.log("Items from backend:", json);
        setItems(json);
      })
      .catch((error) => console.error("Error fetching items:", error));
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard itemsGet={items} />} />
        <Route path="/bye" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default RouterC;
