import { getRepository } from "typeorm";
import { Users } from "../entity/Users";
import { Role } from "../entity/Role";
import { CreateUser } from "../validations/UserValidation";

export class UserService {
  private userRepository = getRepository(Users);
  private roleRepository = getRepository(Role);

  async createUser(userData: CreateUser) {
    const roleName = userData.role || "user";
    const role = await this.roleRepository.findOne({ where: { name: roleName } });

    if (!role) {
      throw new Error("Role not found");
    }

    const user = new Users();
    user.firstName = userData.first_name;
    user.lastName = userData.last_name;
    user.email = userData.email;
    user.phone = userData.phone;
    user.password = userData.password ? hashPassword(userData.password) : "";
    user.role = role;

    return await this.userRepository.save(user);
  }
}
function hashPassword(password: string): string {
  throw new Error("Function not implemented.");
}

