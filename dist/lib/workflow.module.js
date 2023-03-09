"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowModule = void 0;
class WorkflowModule {
  constructor(steps) {
    this.steps = [];
    if (steps) this.steps.push(...steps);
  }
  execute(workflow) {
    const configuration = workflow.getConfiguration();
    for (const step of configuration.steps) {
      const workflowStep = this.steps.find((workflowStep) =>
        workflowStep.canHandle(step.type)
      );
      console.log(workflowStep);
      if (workflowStep) {
        const output = workflowStep.process(workflow);
      }
    }
  }
  registerStep(step) {
    this.steps.push(step);
  }
}
exports.WorkflowModule = WorkflowModule;
//# sourceMappingURL=workflow.module.js.map
