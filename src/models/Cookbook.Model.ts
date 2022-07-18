import Author from "./Author.Model";
import Stack from "./Stack.Model";
import Step from "./Step.Model";
import TimestampedDB from "./TimestampedDB.Model";
import Topic from "./Topic.Model";

interface Cookbook extends TimestampedDB {
  stack: Stack;
  steps: Step[];
  topic: Topic;
  author: Author;
  flowchartUrl: string;
  sampleProjectUrl: string;
}

export default Cookbook;
