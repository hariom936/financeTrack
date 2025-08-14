import { Service } from "typedi";
import { Repository } from "typeorm";
import AppDataSource from "../config/dbconfig";
import { Role } from "../entity/Role";
import { ApiError } from "../utils/Apierror";
import httpStatus from "http-status";
import messages from "../constant/messages";

@Service()
export class RoleService {
  private roleRepo: Repository<Role>;

  constructor() {
    this.roleRepo = AppDataSource.getRepository(Role);
  }

  async createRole(name: string) {
    const exists = await this.roleRepo.findOne({ where: { name } });
    if (exists) throw new ApiError(httpStatus.CONFLICT, messages.ROLE.ALREADY_EXISTS || "Role already exists");
    const role = this.roleRepo.create({ name });
    return await this.roleRepo.save(role);
  }

  async listRoles() {
    return await this.roleRepo.find();
  }

  async getRoleById(roleId: number) {
    const role = await this.roleRepo.findOne({ where: { id: roleId } });
    if (!role) throw new ApiError(httpStatus.NOT_FOUND, messages.ROLE.NOT_FOUND || "Role not found");
    return role;
  }

  async updateRole(roleId: number, name: string) {
    const role = await this.getRoleById(roleId);
    role.name = name;
    return await this.roleRepo.save(role);
  }

  async deleteRole(roleId: number) {
    const role = await this.getRoleById(roleId);
    return await this.roleRepo.remove(role);
  }
}
