/**
 * @author: Hariom Verma
 * @file: src/services/UserService.ts
 * @description: User Service is used as a service for exposing user related methods for primarily
 * UserController. User Service interacts with Database for user related CRUD operations.
 */


import { Service } from "typedi";
import { ApiError } from "../utils/Apierror";
import httpStatus from "http-status";
import { Like, Repository } from "typeorm";
import AppDataSource from "../config/dbconfig";
import { Users } from "../entity/Users";
import { Role } from "../entity/Role";
import bcrypt from "bcrypt";
import messages from "../constant/messages";


// Removed UserData interface as CreateUser is used for validation and data transfer
interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  password: string;
  role?: string;
}

@Service()
export class UserService {
  private user: Repository<Users>;
  private role: Repository<Role>;

  constructor() {
    this.user = AppDataSource.getRepository(Users);
    this.role = AppDataSource.getRepository(Role);
  }

  // Method to create a new user
  public async createUser(userData: UserData) {
    try {
      const roleName = userData.role || "user";
      const role = await this.role.findOne({ where: { name: roleName } });

      if (!role) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Role '${roleName}' not found.`);
      }

      // Check if email already exists
      const existingUserByEmail = await this.user.findOne({ where: { email: userData.email } });
      if (existingUserByEmail) {
        (httpStatus.CONFLICT, `An account with email '${userData.email}' already exists.`);
      }


      // --- END OF PRIMARY CHECKS ---

      // Hash the password BEFORE saving it to the database
      const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the salt rounds

      const userEntity = this.user.create({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone,
        password: hashedPassword, // Use the hashed password
        role: role,
      });

      const createdUser = await this.user.save(userEntity);

      // It's good practice to not return the password hash
      const { password, ...userWithoutPassword } = createdUser;
      return { createdUser: userWithoutPassword };

    } catch (error: any) {
      // Log the full error for debugging purposes in development/testing
      messages.USER.ADD_USER_FAILED = error.message || "User insert failed, try again.";
    }
  }

  // Method to fetch user data based on query parameters 
  public async fetchData(query: any): Promise<{ count: number; users: Users[] }> {
    let queryCondition: any;
    let search = query.search || null;
    if (search && search !== "" && search !== undefined && search !== null)
      // Assuming 'storeName' is a column in your Users entity for searching
      queryCondition = { where: { first_Name: Like(`%${search}%`) } }; // Changed to firstName for Users entity
    else queryCondition = {};
    const count = await this.user.count(queryCondition);
    const users = await this.user.find(queryCondition);

    return { count, users };
  }

  //Fetch user details by userId
  public async fetchDetails(queryParam: { userId: number }): Promise<any | null> {
    const { userId } = queryParam;

    // Attempt to find a user by their ID
    const data = await this.user.findOne({ where: { id: userId } });

    // If no data is found, return null instead of throwing an error.
    // The controller will then handle the "User not found" response.
    if (!data) {
      console.log(`User with ID ${userId} not found.`); // Log for debugging purposes
      return null;
    }

    console.log(data, "data"); // Log the fetched data if found
    return data; // Return the user data
  }

  // Method to update user data
  public async updateUsers(body: any, queryParam: { userId: number }) {
    const { userId } = queryParam;

    try {
      // 1. Fetch the current user record
      const userToUpdate = await this.user.findOne({ where: { id: userId } });
      if (!userToUpdate) throw new Error("User not found");

      // 2. Hash password if present (and not already hash)
      if (body.password) {
        const saltRounds = 10;
        // Always hash if the password does not look hashed
        if (!body.password.startsWith('$2b$')) {
          body.password = await bcrypt.hash(body.password, saltRounds);
        }
      }

      // 3. Update
      await this.user.update({ id: userId }, body);

      // 4. Get updated record
      const updatedUser = await this.user.findOne({ where: { id: userId } });

      // 5. Never return password field in API response
      if (updatedUser) delete updatedUser.password;
      return updatedUser;
    } catch (error: any) {
      // Error handling
      throw error;
    }
  }

  // Method to delete a user by userId

  public async deleteUser(userId: number): Promise<void> {
  const userToDelete = await this.user.findOne({ where: { id: userId } });

  if (!userToDelete) {
    throw new Error(`User with id ${userId} not found`);
  }

  try {
    await this.user.remove(userToDelete);
  } catch (error) {
    throw new Error(`Unable to delete user with id ${userId}. Error: ${error.message}`);
  }
}



}
