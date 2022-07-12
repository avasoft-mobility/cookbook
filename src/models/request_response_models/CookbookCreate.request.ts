import Step from "../Step.Model";

interface CookbookCreateRequest {
  topicId: string;
  stackId: string;
  sampleProjectUrl: string;
  flowchartUrl: string;
  steps: Step[];
}

export default CookbookCreateRequest;
