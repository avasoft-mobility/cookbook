import Tag from "./Tag.Model";
import TimestampedDB from "./TimestampedDB.Model";

interface Topic extends TimestampedDB {
  title: string;
  slug: string;
  flowchartUrl: string;
  referenceUrls: string[];
  tags: Tag[];
  cookbooks: string[];
}

export default Topic;
