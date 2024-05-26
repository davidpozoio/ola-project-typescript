export interface Owner {
  id: string | number;
}

export default abstract class Repository<T> {
  async findAll(): Promise<T[]> {
    throw new Error("method not implemented");
  }

  async findById(
    id: string | number | undefined,
    owner?: Owner
  ): Promise<T | undefined> {
    throw new Error("method not implemented");
  }

  async save(object: T): Promise<T> {
    throw new Error("method not implemented");
  }

  async update(object: T): Promise<T> {
    throw new Error("method not implemented");
  }

  async deleteById(id: number | string | undefined): Promise<T> {
    throw new Error("method not implemented");
  }
}
