import { Workflow } from "../lib/workflow";
import { IWorkflowStep } from "../lib/workflow-step.interface";

export class SubstractStepHandler implements IWorkflowStep {
  readonly type: string = "substract";

  canHandle(type: string): boolean {
    return type === this.type;
  }
  process(workflow: Workflow): void {
    const birthdayDate = new Date(workflow.getInput(["birthdayDate"]).value);
    const currentDate = new Date();

    const subtractedDate = currentDate.getTime() - birthdayDate.getTime();

    const calculatedDate = new Date();
    calculatedDate.setTime(subtractedDate);

    workflow.setOutputs({
      combinedDate: calculatedDate,
    });
  }
}
