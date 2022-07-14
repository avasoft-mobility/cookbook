import { Navigate, Route, Routes } from "react-router-dom";
import CreateCookbookPage from "../pages/create pages/CreateCookbook.page";
import CreateTag from "../pages/create pages/CreateTag.page";
import DetailsPage from "../pages/DetailsPage.page";
import HomePage from "../pages/Home.page";
import Stackpage from "../pages/create pages/CreateStack.page";
import TopicPage from "../pages/create pages/CreateTopic.Page";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/topics" />} />
      <Route path="/topics" element={<HomePage />} />
      <Route path="/topics/:topicSlug" element={<DetailsPage />} />
      <Route path="/create/stack" element={<Stackpage />} />
      <Route path="/create/cookbook" element={<CreateCookbookPage />} />
      <Route path="/create/tag" element={<CreateTag />} />
      <Route path="/create/topic" element={<TopicPage />} />
    </Routes>
  );
};

export default RouterConfig;
