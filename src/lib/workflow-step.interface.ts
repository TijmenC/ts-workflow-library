import { Workflow } from "./workflow";

export interface IWorkflowStep {
  readonly type: string;

  canHandle(type: string): boolean;

  process(workflow: Workflow): void;
}
