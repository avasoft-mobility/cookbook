import { RouteConfig } from "../configs/RouteConfig";
import Topic from "../models/Topic.Model";
import TopicDetail from "../models/TopicDetail.Model";
import { HttpClient } from "./Client";

class ApiService {
  public static fetchTopics = async (searchText: string): Promise<Topic[]> => {
    let topics = await HttpClient.get<Topic[]>(
      `${RouteConfig.topics}?search=${searchText}`
    );
    return topics.data;
  };

  public static fetchTopic = async (slug?: string): Promise<TopicDetail> => {
    let topic = await HttpClient.get<TopicDetail>(
      `${RouteConfig.topics}/${slug}`
    );
    return topic.data;
  };
}

export default ApiService;
