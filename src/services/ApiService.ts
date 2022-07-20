import { RouteConfig } from "../configs/RouteConfig";
import FileUploadResponse from "../models/request_response_models/FileUpload.response";
import { StackCreateRequest } from "../models/request_response_models/stack_create.request.model";
import Stack from "../models/Stack.Model";
import TagCreateRequest from "../models/request_response_models/tag_create.request.model";
import TopicCreateRequest from "../models/request_response_models/TopicCreate.request.model";
import Tag from "../models/Tag.Model";
import Topic from "../models/Topic.Model";
import TopicDetail from "../models/TopicDetail.Model";
import { HttpClient } from "./Client";
import CookbookCreateRequest from "../models/request_response_models/CookbookCreate.request";
import Cookbook from "../models/Cookbook.Model";
import Author from "../models/Author.Model";
import AuthorCreateRequest from "../models/request_response_models/AuthorCreate.request";

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

  public static fetchAuthors = async (): Promise<Author[]> => {
    let topic = await HttpClient.get<Author[]>(`${RouteConfig.authors}`);
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

  public static getStack = async (id?: string): Promise<Stack> => {
    const stack = await HttpClient.get<Stack>(`${RouteConfig.stacks}/${id}`);
    return stack.data;
  };

  public static updateStack = async (
    stack: Stack
  ): Promise<StackCreateRequest> => {
    let updatedStack = await HttpClient.put<StackCreateRequest>(
      `${RouteConfig.stacks}/${stack._id}`,
      {
        name: `${stack.name}`,
      }
    );
    return updatedStack.data;
  };

  public static getTopics = async (): Promise<Topic[]> => {
    const topics = await HttpClient.get<Topic[]>(RouteConfig.topics);
    return topics.data;
  };

  public static getStacks = async (): Promise<Stack[]> => {
    const stacks = await HttpClient.get<Stack[]>(RouteConfig.stacks);
    return stacks.data;
  };

  public static addTag = async (name?: string): Promise<TagCreateRequest> => {
    let tag = await HttpClient.post<TagCreateRequest>(`${RouteConfig.tags}`, {
      name: `${name}`,
    });
    return tag.data;
  };

  public static updateTag = async (tag: Tag): Promise<TagCreateRequest> => {
    let updatedTag = await HttpClient.put<TagCreateRequest>(
      `${RouteConfig.tags}/${tag._id}`,
      {
        name: tag.name,
      }
    );
    return updatedTag.data;
  };

  public static createCookbook = async (
    newCookbook: CookbookCreateRequest
  ): Promise<Cookbook> => {
    const cookbook = await HttpClient.post<CookbookCreateRequest, Cookbook>(
      `${RouteConfig.cookbooks}`,
      newCookbook
    );
    return cookbook;
  };

  public static updateCookbook = async (
    id: string,
    newCookbook: CookbookCreateRequest
  ): Promise<Cookbook> => {
    console.log(newCookbook);
    const cookbook = await HttpClient.put<CookbookCreateRequest, Cookbook>(
      `${RouteConfig.cookbooks}/${id}`,
      newCookbook
    );
    return cookbook;
  }

  public static fetchCookBook = async (id: string): Promise<Cookbook> => {
    let cookBook = await HttpClient.get<Cookbook>(
      `${RouteConfig.cookbooks}/${id}`
    );
    return cookBook.data;
  };

  public static fetchTags = async (): Promise<Tag[]> => {
    let tags = await HttpClient.get<Tag[]>(`${RouteConfig.tags}`);
    return tags.data;
  };

  public static fetchTag = async (id: string): Promise<Tag> => {
    let tag = await HttpClient.get<Tag>(`${RouteConfig.tags}/${id}`);
    return tag.data;
  };
  public static addTopic = async (
    topic: TopicCreateRequest
  ): Promise<Topic> => {
    let createdtopic = await HttpClient.post<TopicCreateRequest, Topic>(
      `${RouteConfig.topics}`,
      topic
    );
    return createdtopic;
  };

  public static addAuthor = async (
    author: AuthorCreateRequest
  ): Promise<Author> => {
    let createdAuthor = await HttpClient.post<AuthorCreateRequest, Author>(
      `${RouteConfig.authors}`,
      author
    );
    return createdAuthor;
  };

  public static fetchCookbook = async (id?: string): Promise<Cookbook> => {
    let cookbook = await HttpClient.get<Cookbook>(
      `${RouteConfig.cookbooks}/${id}`
    );
    return cookbook.data;
  }
  
  public static fetchAuthor = async (id: string): Promise<Author> => {
    let author = await HttpClient.get<Author>(`${RouteConfig.authors}/${id}`);
    return author.data;
  };

  public static updateAuthor = async (author: Author): Promise<Author> => {
    let updatedAuthor = await HttpClient.put<AuthorCreateRequest, Author>(
      `${RouteConfig.authors}/${author._id}`,
      author
    );
    return updatedAuthor;
  };
  
  public static updateTopic = async (
    id: string,
    topic: TopicCreateRequest
  ): Promise<Topic> => {
    let updatedtopic = await HttpClient.put<TopicCreateRequest, Topic>(
      `${RouteConfig.topics}/${id}`,
      topic
    );
    return updatedtopic;
  };
}

export default ApiService;
