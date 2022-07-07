import Cookbook from "./Cookbook.Model";

interface Topic {
  id: string;
  title: string;
  tags: string[];
  cookbooks: Cookbook[];
}

export default Topic;
