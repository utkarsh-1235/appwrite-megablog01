import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthServices{
    client = new Client();
    account;
   
    constructor(){
         this.client
             .setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId)
          this.account = new Account(this.client);
    }

    async createAccount({name, email, password}){
        try{
            const user = await this.account.create(
                ID.unique(),
                name,
                email,
                password
           );
           if(user){
              return this.login({email,password});
           }
           console.log(user);
           return user;
        }
        catch(err){
            console.error('Error in creating the user account', err);
            return err;
        }
      
    }

    async login({email, password}){
        try{
            const user = await this.account.createEmailSession(
                email,
                password
            );
    
            if(!user){
                console.log('user not found');
            }
            console.log(user);
            return user;
        }
        catch(err){
              console.error("Error in login the user",err);
              return err;
        }
    }

    async getCurrentUser(){
        try{
            const GetUser = await this.account.get();
            console.log(GetUser);
            return GetUser;
        }catch(err){
            console.error("Error in getting the user",err);
            return err;
        }
       
    }
    async logout(){
        try{
            return await this.account.deleteSessions()
        }catch(err){
            console.error("Error in logging out the user", err);
            return err;
        }
       
    }
}

 const authServices = new AuthServices();

 export default authServices