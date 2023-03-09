"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkFlowTemplate = void 0;
class WorkFlowTemplate {
  constructor(json) {
    const data = JSON.parse(json);
    this.type = data.type;
    this.description = data.description;
    this.version = data.version;
    this.steps = data.steps;
  }
}
exports.WorkFlowTemplate = WorkFlowTemplate;
//# sourceMappingURL=workflow-template.js.map
