"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateAgeStepHandler = void 0;
class CalculateAgeStepHandler {
  constructor() {
    this.type = "calculate-age";
  }
  canHandle(type) {
    return type === this.type;
  }
  process(workflow) {
    const timeDiff = new Date(workflow.getInput(["combinedDate"]).value);
    const ageInYears =
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
exports.CalculateAgeStepHandler = CalculateAgeStepHandler;
//# sourceMappingURL=calculate-age.step.js.map
