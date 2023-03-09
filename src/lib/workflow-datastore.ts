export class WorkflowDataStore {
  private datastore: { [key: string]: any } = {};

  set(key: string, value: any): void {
    this.datastore[key] = value;
  }

  get<T>(key: string): T | any {
    return this.datastore[key] as T;
  }

  getAll(): { [key: string]: any } {
    return { ...this.datastore };
  }
}
