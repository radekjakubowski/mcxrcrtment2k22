export interface AbstractController<T> {
  getAll(): T[];
  update(model: T): void;
  delete(id: any): void;
  addNew(model: T): void;
}
