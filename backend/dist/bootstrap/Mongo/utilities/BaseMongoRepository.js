"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async getAll() {
        return await this.model.find({});
    }
    async getById(id) {
        return await this.model.findById(id);
    }
    async create(entry) {
        const newElement = new this.model({ ...entry });
        return await newElement.save();
    }
    async update(id, entry) {
        return await this.model.findByIdAndUpdate(id, entry, { new: true });
    }
    async delete(id) {
        return await this.model.findByIdAndRemove(id);
    }
}
exports.BaseRepository = BaseRepository;
