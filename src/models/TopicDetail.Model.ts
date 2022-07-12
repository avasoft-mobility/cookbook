import Cookbook from "./Cookbook.Model";
import Tag from "./Tag.Model";
import TimestampedDB from "./TimestampedDB.Model";

interface TopicDetail extends TimestampedDB {
  title: string;
  slug: string;
  flowchartUrl: string;
  referenceUrls: string[];
  tags: Tag[];
  cookbooks: Cookbook[];
}

export default TopicDetail;
