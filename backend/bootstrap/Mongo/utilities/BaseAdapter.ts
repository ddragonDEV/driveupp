export interface BaseAdapter<Create, Update, Entity> {
    getAll(): Promise<Entity[]>;
    getById(id: string): Promise<Entity>;
    create(entry: Create): Promise<Entity>;
    update(id: string, entry: Update): Promise<Entity>;
    delete(id: string): Promise<Entity>;
}