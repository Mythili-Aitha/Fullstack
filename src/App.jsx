import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import DashBoard from "./Components/DashBoard";
import Test from "./Components/Test";
import Banking from "./Components/Banking";
import { useEffect, useState } from "react";

function App() {
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
    console.log("fff", items);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard itemsGet={items} />} />
        <Route
          path="/:test"
          element={<Banking notificationsGet={notification} />}
        />
        <Route path="/hi" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
