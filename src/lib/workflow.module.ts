import { WorkflowConfiguration } from "./types";
import { Workflow } from "./workflow";
import { IWorkflowStep } from "./workflow-step.interface";

export class WorkflowModule {
  private steps: Array<IWorkflowStep> = [];

  constructor(steps?: Array<IWorkflowStep>) {
    if (steps) this.steps.push(...steps);
  }

  execute(workflow: Workflow): void {
    const configuration = workflow.getConfiguration();
    for (const step of configuration.steps) {
      const workflowStep = this.steps.find((workflowStep: IWorkflowStep) =>
        workflowStep.canHandle(step.type)
      );
      console.log(workflowStep);
      if (workflowStep) {
        const output = workflowStep.process(workflow);
      }
    }
  }

  registerStep(step: IWorkflowStep): void {
    this.steps.push(step);
  }
}
