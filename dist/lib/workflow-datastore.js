"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDataStore = void 0;
class WorkflowDataStore {
  constructor() {
    this.datastore = {};
  }
  set(key, value) {
    this.datastore[key] = value;
  }
  get(key) {
    return this.datastore[key];
  }
  getAll() {
    return Object.assign({}, this.datastore);
  }
}
exports.WorkflowDataStore = WorkflowDataStore;
//# sourceMappingURL=workflow-datastore.js.map
