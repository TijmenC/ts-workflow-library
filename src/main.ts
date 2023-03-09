import { Workflow } from "./lib/workflow";
import { WorkflowModule } from "./lib/workflow.module";
import { CalculateAgeStepHandler } from "./step-handlers/calculate-age.step";
import { SubstractStepHandler } from "./step-handlers/substract.step";
import { WorkFlowTemplate } from "./workflow-interfaces/workflow-template";
import * as fs from "fs";

const workflow = new WorkflowModule();
// .. do some other stuff
workflow.registerStep(new SubstractStepHandler());
workflow.registerStep(new CalculateAgeStepHandler());

const jsonFile = fs.readFileSync(
  "./src/workflow-json/caluclate-drinking-age-configuration.json",
  "utf-8"
);
const calculateDrinkingAgeObjectWorkflow = new WorkFlowTemplate(jsonFile);
console.log(calculateDrinkingAgeObjectWorkflow);
// ----

const calculateDrinkingAgeWorkflow = new Workflow(
  calculateDrinkingAgeObjectWorkflow
);

calculateDrinkingAgeWorkflow.setInputs(calculateDrinkingAgeObjectWorkflow);

workflow.execute(calculateDrinkingAgeWorkflow);
