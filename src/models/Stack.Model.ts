import TimestampedDB from "./TimestampedDB.Model";

interface Stack extends TimestampedDB {
  name: string;
  slug: string;
  cookbooks: string[];
}

export default Stack;
