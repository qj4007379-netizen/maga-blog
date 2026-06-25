import { account } from "./index.js";
import { ID } from "appwrite";

class AuthService {
  // Create account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // Auto login after account creation
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.log("AuthService :: createAccount :: error", error);
      throw error;
    }
  }

  // Login
  async login({ email, password }) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("AuthService :: login :: error", error);
      throw error;
    }
  }

  // Get Current User
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.log("AuthService :: getCurrentUser :: error", error);
    }
    return null;
  }

  // Logout
  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log("AuthService :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
