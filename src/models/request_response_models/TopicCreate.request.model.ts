interface TopicCreateRequest {
  title: string;
  flowchartUrl: string;
  tags?: string[];
  referenceUrls?: string[];
}

export default TopicCreateRequest;
