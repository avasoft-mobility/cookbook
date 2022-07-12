interface TopicCreateRequest {
  name: string;
  flowchartUrl: string;
  tags?: string[];
  referenceUrls?: string[];
}

export default TopicCreateRequest;
