import Stack from "./Stack.Model";
import Step from "./Step.Model";

interface Cookbook {
  id: string;
  stack: Stack;
  steps: Step[];
}

export default Cookbook;
