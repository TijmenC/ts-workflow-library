import { Workflow } from "../lib/workflow";
import { IWorkflowStep } from "../lib/workflow-step.interface";

export class CalculateAgeStepHandler implements IWorkflowStep {
  readonly type: string = "calculate-age";

  canHandle(type: string): boolean {
    return type === this.type;
  }
  process(workflow: Workflow): void {
    const timeDiff = new Date(workflow.getInput(["combinedDate"]).value);
    const ageInYears: number =
      Math.floor(timeDiff.getTime()) / (1000 * 3600 * 24 * 365); // calculate the age in years

    if (ageInYears >= 21) {
      console.log("You are of legal drinking age in the United States.");
    } else {
      console.log(
        "Sorry, you are not of legal drinking age in the United States."
      );
    }
  }
}
