import DummyData from "../dummy-data.json";
import Topic from "../models/Topic.Model";
import TopicDetail from "../models/TopicDetail.Model";

class ApiService {
  public static fetchTopics = (topic?: string) => {
    let topics: Topic[] = JSON.parse(JSON.stringify(DummyData));
    let searchedTopics: Topic[] = [];
    if (topic !== undefined) {
      topics.forEach((element) => {
        if (element.title.toLowerCase().includes(topic.toLowerCase())) {
          searchedTopics.push(element);
        }
      });
      return searchedTopics;
    }

    return topics;
  };

  public static fetchTopic = (id: string): TopicDetail => {
    let topics: TopicDetail[] = JSON.parse(JSON.stringify(DummyData));
    let topic = topics.find((topic) => topic._id === id);
    if (topic) {
      return topic;
    }
    throw Error("No topic found");
  };
}

export default ApiService;
