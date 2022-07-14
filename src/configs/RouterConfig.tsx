import { Navigate, Route, Routes } from "react-router-dom";
import CreateCookbookPage from "../Pages/Create pages/CreateCookbook.page";
import CreateTag from "../Pages/Create pages/CreateTag.page";
import DetailsPage from "../Pages/DetailsPage.page";
import HomePage from "../Pages/Home.page";
import Stackpage from "../Pages/Create pages/CreateStack.page";
import TopicPage from "../Pages/Create pages/CreateTopic.Page";

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
