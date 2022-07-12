import { Navigate, Route, Routes } from "react-router-dom";
import { CookbookPage } from "../Pages/CookbookPage.page";
import DetailsPage from "../Pages/DetailsPage.page";
import HomePage from "../Pages/Home.page";
import Stackpage from "../Pages/Stackpage.page";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/topics" />} />
      <Route path="/topics" element={<HomePage />} />
      <Route path="/topics/:topicSlug" element={<DetailsPage />} />
      <Route path="/create/stack" element={<Stackpage />} />
      <Route path="/create/cookbook" element={<CookbookPage />} />
    </Routes>
  );
};

export default RouterConfig;
