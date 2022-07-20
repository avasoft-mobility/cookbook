import { Navigate, Route, Routes } from "react-router-dom";
import CreateCookbookPage from "../pages/create_pages/CreateCookbook.page";
import CreateTag from "../pages/create_pages/CreateTag.page";
import DetailsPage from "../pages/DetailsPage.page";
import HomePage from "../pages/Home.page";
import Stackpage from "../pages/create_pages/CreateStack.page";
import CreateTopic from "../pages/create_pages/CreateTopic.Page";
import CreateAuthorPage from "../pages/create_pages/CreateAuthor.page";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/topics" />} />
      <Route path="/topics" element={<HomePage />} />
      <Route path="/topics/:topicSlug" element={<DetailsPage />} />
      <Route path="/create/stack" element={<Stackpage />} />
      <Route path="/create/cookbook" element={<CreateCookbookPage />} />
      <Route path="/create/tag" element={<CreateTag />} />
      <Route path="/create/topic" element={<CreateTopic />} />
      <Route path="/create/author" element={<CreateAuthorPage />} />
      <Route path="/edit/cookbook/:id" element={<CreateCookbookPage />} />
      <Route path="/edit/stack/:id" element={<Stackpage />} />
      <Route path="/edit/tag/:id" element={<CreateTag />} />
      <Route path="/edit/author/:id" element={<CreateAuthorPage />} />
      <Route path="/edit/topic/:slug" element={<CreateTopic />} />
    </Routes>
  );
};

export default RouterConfig;
