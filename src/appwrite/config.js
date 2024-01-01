import { Client, Storage, Databases,Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                  title,
                  content,
                  featuredImage,
                  status,
                  userId  
                }
            );

            console.log(post);
            return post;
        }catch(err){
            console.error("Error in creating post",err);
            return err;
        }
        
    }

    async updatePost(slug,{title, content, featuredImage,status}){
        try{
            const updatePost = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            console.log(updatePost);
            return updatePost;
        }
        catch(err){
            console.error("Error in updating the post",err);
            return err;
        }
            
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            console.log("Post Deleted");
            return true;
        }
        catch(err){
            console.error("Error in deleting the post", err);
            return err;
        }
        
    }
    async getPost(slug){
        try{
            const getpost = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
               );
             console.log(getpost);
            return getpost;
        }
        catch(err){
            console.error("Error in fetching the post", err);
            return err;
        }
       
    }

    async getPosts(query=[Query.equal("status","active")]){
        try{
            const getAllPost = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                query
             );
             console.log(getAllPost);
             return getAllPost;
        }
        catch(err){
            console.error("Error in getting the posts", err);
        }
         
    }

    //file upload service
    async uploadFile(file){
        try{
            const File = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            console.log(File);
            return File;
        }catch(err){
            console.error("Error in uploading file", err);
            return err;
        }
    }

    //deleting file
    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        }catch(err){
            console.error("Error in deleting file", err);
            return err;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service = new Service();
export default service;