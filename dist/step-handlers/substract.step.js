"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubstractStepHandler = void 0;
class SubstractStepHandler {
  constructor() {
    this.type = "substract";
  }
  canHandle(type) {
    return type === this.type;
  }
  process(workflow) {
    const birthdayDate = new Date(workflow.getInput(["birthdayDate"]).value);
    const currentDate = new Date();
    const subtractedDate = currentDate.getTime() - birthdayDate.getTime();
    const calculatedDate = new Date();
    calculatedDate.setTime(subtractedDate);
    workflow.setOutputs({
      combinedDate: calculatedDate,
    });
    const timeDiff = new Date(workflow.getInput(["combinedDate"]).value);
    console.log(timeDiff);
    return calculatedDate;
  }
}
exports.SubstractStepHandler = SubstractStepHandler;
//# sourceMappingURL=substract.step.js.map
