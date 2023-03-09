export class WorkFlowTemplate implements Workflow {
  type: string;
  description: string;
  version: string;
  steps: Step[];

  constructor(json: string) {
    const data = JSON.parse(json);
    this.type = data.type;
    this.description = data.description;
    this.version = data.version;
    this.steps = data.steps;
  }
}
