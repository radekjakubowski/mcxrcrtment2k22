export interface AbstractRepository<T> {
  add(enitity: T): void;
  update(entity: T): void;
  delete(id: any): void;
  getAll(): T[];
}
