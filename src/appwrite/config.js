import conf from "../conf/conf.js";
import { databases, storage } from "./index.js";
import { ID, Query } from "appwrite";

class Service {
  constructor() {
    this.databaseId = conf.appwriteDatabaseId;
    this.collectionId = conf.appwriteCollectionId;
    this.bucketId = conf.appwriteBucketId;
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await databases.createDocument(
        this.databaseId,
        this.collectionId,
        ID.unique(),
        // slug ? slug : ID.unique(),

        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: createPost :: error", error);
      return false;
    }
  }

  async updatePost(id, { title, content, featuredImage, status }) {
    try {
      return await databases.updateDocument(
        this.databaseId,
        this.collectionId,
        id,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: updatePost :: error", error);
      return false;
    }
  }

  async deletePost(id) {
    try {
      await databases.deleteDocument(
        this.databaseId,
        this.collectionId,
        id
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(id) {
    try {
      return await databases.getDocument(
        this.databaseId,
        this.collectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite Service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = []) {
    try {
      return await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        queries.length > 0 ? queries : []
      );
    } catch (error) {
      console.log("Appwrite Service :: getPosts :: error", error);
      return false;
    }
  }

  // File Services
  async uploadFile(file) {
    try {
      return await storage.createFile(
        this.bucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await storage.deleteFile(this.bucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: error", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      if (!fileId) return "";
      return storage.getFilePreview(this.bucketId, fileId).toString();
    } catch (error) {
      console.log("Appwrite Service :: getFilePreview :: error", error);
      return "";
    }
  }
}

const service = new Service();
export default service;
