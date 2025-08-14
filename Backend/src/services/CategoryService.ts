import { Service } from "typedi";
import { Repository } from "typeorm";
import AppDataSource from "../config/dbconfig";
import { Categories } from "../entity/Categories";
import { ApiError } from "../utils/Apierror";
import httpStatus from "http-status";
import messages from "../constant/messages";

@Service()
export class CategoryService {
  private categoryRepo: Repository<Categories>;

  constructor() {
    this.categoryRepo = AppDataSource.getRepository(Categories);
  }

  async createCategory(data: Partial<Categories>) {
    const exists = await this.categoryRepo.findOne({ where: { name: data.name } });
    if (exists) throw new ApiError(httpStatus.CONFLICT, "Category already exists");
    const cat = this.categoryRepo.create(data);
    return await this.categoryRepo.save(cat);
  }

  async listCategories() {
    return await this.categoryRepo.find();
  }

  async updateCategory(id: number, data: Partial<Categories>) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    Object.assign(category, data);
    return await this.categoryRepo.save(category);
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    return await this.categoryRepo.remove(category);
  }
}
