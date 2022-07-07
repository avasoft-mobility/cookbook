import DummyData from "../dummy-data.json";
import Topic from "../models/Topic.Model";

class ApiService {
  public static fetchTopics = (topic?: string) => {
    let topics: Topic[] = JSON.parse(JSON.stringify(DummyData));
    let searchedTopics: Topic[] = [];
    if (topic !== undefined) {
      topics.forEach((element) => {
        if (element.title.includes(topic)) {
          searchedTopics.push(element);
        }
      });
      return searchedTopics;
    }

    return topics;
  };

  public static fetchTopic = (id: string) => {
    let topics: Topic[] = JSON.parse(JSON.stringify(DummyData));
    return topics[0];
  };
}

export default ApiService;
