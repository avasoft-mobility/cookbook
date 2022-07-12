import { RouteConfig } from "../configs/RouteConfig";
import FileUploadResponse from "../models/request_response_models/FileUpload.response";
import { StackCreateRequest } from "../models/request_response_models/stack_create.request.model";
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

  public static uploadFile = async (
    file: File
  ): Promise<FileUploadResponse> => {
    let formData = new FormData();
    formData.append("file", file);
    let fileUpload = await HttpClient.post<FileUploadResponse, any>(
      `${RouteConfig.files}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return fileUpload.data;
  };

  public static addStack = async (
    name?: string
  ): Promise<StackCreateRequest> => {
    let stack = await HttpClient.post<StackCreateRequest>(
      `${RouteConfig.stacks}`,
      {
        name: `${name}`,
      }
    );
    return stack.data;
  };
}

export default ApiService;
