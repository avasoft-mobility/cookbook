import { Route, Routes } from "react-router-dom";
import DetailsPage from "../Pages/DetailsPage.page";
import HomePage from "../Pages/Home.page";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/topics" element={<HomePage />} />
      <Route path="/topics/:topicSlug" element={<DetailsPage />} />
    </Routes>
  );
};

export default RouterConfig;
