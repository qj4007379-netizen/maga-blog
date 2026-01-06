import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // 🔹 Signup
  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (user) {
        // auto login after signup
        return this.login({ email, password });
      }

      return user;
    } catch (error) {
      console.log("AuthService :: createAccount :: error", error);
      throw error;
    }
  }

  // 🔹 Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("AuthService :: login :: error", error);
      throw error;
    }
  }

  // 🔹 Get Current User (SAFE)
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // user login nahi → normal case
      return null;
    }
  }

  // 🔹 Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("AuthService :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
