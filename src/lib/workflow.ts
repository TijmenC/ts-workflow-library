import { WorkflowConfiguration } from "./types";
import { WorkflowDataStore } from "./workflow-datastore";

export class Workflow {
  private readonly dataStore = new WorkflowDataStore();

  constructor(private readonly configuration: WorkflowConfiguration) {}

  getConfiguration(): WorkflowConfiguration {
    return this.configuration;
  }

  setInputs(inputObject: { [key: string]: any }) {
    for (const [key, value] of Object.entries(inputObject)) {
      if (typeof value !== "object" || Array.isArray(value)) {
        this.dataStore.set(key, value);
      } else {
        const nestedObject: { [nestedKey: string]: any } = value;
        for (const [nestedKey, nestedValue] of Object.entries(nestedObject)) {
          this.dataStore.set(`${key}.${nestedKey}`, nestedValue);
        }
      }
    }
  }

  setOutputs(outputObject: { [key: string]: any }) {
    const steps = this.dataStore.get("steps") || [];
    for (const step of steps) {
      const outputs = step.outputs || [];
      for (const output of outputs) {
        if (output.name in outputObject) {
          output.value = outputObject[output.name];
        }
      }
    }
  }

  addInputs(inputObject: { [key: string]: any }) {
    let steps = this.dataStore.get("steps") || [];
    let sharedVariablesStep = steps.find(
      (step: string[]) => Array.isArray(step) && step[0] === "SharedVariables"
    );
    if (!sharedVariablesStep) {
      sharedVariablesStep = ["SharedVariables", []];
      steps.push(sharedVariablesStep);
    }
    const sharedVariablesIndex = steps.indexOf(sharedVariablesStep);
    const sharedVariables = sharedVariablesStep[1] || [];
    sharedVariables.push(inputObject);
    steps[sharedVariablesIndex] = sharedVariablesStep;
    this.dataStore.set("steps", steps);
  }

  getInput(key: string[]) {
    const steps = this.dataStore.get("steps") || [];

    for (const step of steps) {
      const input = (step.inputs || []).find(
        (input: { name: string }) => input.name === key[0]
      );
      if (input) {
        return { type: input.type, value: input.value };
      }

      const sharedVariable = (step.sharedVariables || []).find(
        (sharedVariable: { name: string }) => sharedVariable.name === key[0]
      );
      if (sharedVariable) {
        return { value: sharedVariable };
      }

      const output = (step.outputs || []).find(
        (output: { name: string }) => output.name === key[0]
      );
      if (output) {
        return { type: output.type, value: output.value };
      }
    }

    let value: any = this.dataStore.getAll();
    for (let index of key) {
      if (value === undefined) {
        break;
      } else {
        value = value[index];
      }
    }
    return value;
  }

  getAll(): { [key: string]: any } {
    return { ...this.dataStore };
  }
}
