import { BaseAdapter } from "./BaseAdapter";
import { Model } from "mongoose";

export class BaseRepository<Create, Update, Entity> implements BaseAdapter<Create, Update, Entity> {
    private model: Model<Entity>;

    constructor(model: Model<Entity>) {
        this.model = model;
    }

    async getAll(): Promise<Entity[]> {
        return await this.model.find({});
    }

    async getById(id: string): Promise<Entity> {
        return await this.model.findById(id);
    }

    async create(entry: Create): Promise<Entity> {
        const newElement = new this.model({ ...entry });

        return await newElement.save() as unknown as any;
    }

    async update(id: string, entry: Update): Promise<Entity> {
        return await this.model.findByIdAndUpdate(id, entry, { new: true });
    }

    async delete(id: string): Promise<Entity> {
        return await this.model.findByIdAndRemove(id);
    }
}