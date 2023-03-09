"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workflow = void 0;
const workflow_datastore_1 = require("./workflow-datastore");
class Workflow {
  constructor(configuration) {
    this.configuration = configuration;
    this.dataStore = new workflow_datastore_1.WorkflowDataStore();
  }
  getConfiguration() {
    return this.configuration;
  }
  setInputs(inputObject) {
    for (const [key, value] of Object.entries(inputObject)) {
      if (typeof value !== "object" || Array.isArray(value)) {
        this.dataStore.set(key, value);
      } else {
        const nestedObject = value;
        for (const [nestedKey, nestedValue] of Object.entries(nestedObject)) {
          this.dataStore.set(`${key}.${nestedKey}`, nestedValue);
        }
      }
    }
  }
  setOutputs(outputObject) {
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
  addInputs(inputObject) {
    let steps = this.dataStore.get("steps") || [];
    let sharedVariablesStep = steps.find(
      (step) => Array.isArray(step) && step[0] === "SharedVariables"
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
  getInput(x) {
    const steps = this.dataStore.get("steps") || [];
    for (const step of steps) {
      const input = (step.inputs || []).find((input) => input.name === x[0]);
      if (input) {
        return { type: input.type, value: input.value };
      }
      const sharedVariable = (step.sharedVariables || []).find(
        (sharedVariable) => sharedVariable.name === x[0]
      );
      if (sharedVariable) {
        return { value: sharedVariable };
      }
      const output = (step.outputs || []).find(
        (output) => output.name === x[0]
      );
      if (output) {
        return { type: output.type, value: output.value };
      }
    }
    let value = this.dataStore.getAll();
    for (let key of x) {
      if (value === undefined) {
        break;
      } else {
        value = value[key];
      }
    }
    return value;
  }
  getAll() {
    return Object.assign({}, this.dataStore);
  }
}
exports.Workflow = Workflow;
//# sourceMappingURL=workflow.js.map
