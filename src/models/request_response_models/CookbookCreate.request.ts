import Step from "../Step.Model";

interface CookbookCreateRequest {
  topicId: string;
  stackId: string;
  authorName: string;
  author?: string;
  sampleProjectUrl: string;
  flowchartUrl?: string;
  steps: Step[];
}

export default CookbookCreateRequest;
