import Stack from "./Stack.Model";
import Step from "./Step.Model";
import TimestampedDB from "./TimestampedDB.Model";
import Topic from "./Topic.Model";

interface Cookbook extends TimestampedDB {
  stack: Stack;
  steps: Step[];
  topic: Topic;
}

export default Cookbook;
