import TimestampedDB from "./TimestampedDB.Model";

interface Tag extends TimestampedDB {
  name: string;
  topics: any[];
}

export default Tag;
