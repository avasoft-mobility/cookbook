import TimestampedDB from "./TimestampedDB.Model";

interface Author extends TimestampedDB {
  name: string;
  cookbooks?: string[];
}

export default Author;
