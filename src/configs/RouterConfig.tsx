import { Navigate, Route, Routes } from "react-router-dom";
import CreateCookbookPage from "../Pages/CreateCookbook.page";
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
      <Route path="/create/cookbook" element={<CreateCookbookPage />} />
    </Routes>
  );
};

export default RouterConfig;
