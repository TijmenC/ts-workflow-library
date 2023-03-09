"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiplyStepHandler = void 0;
class MultiplyStepHandler {
  constructor() {
    this.type = "multiply";
  }
  canHandle(type) {
    return type === this.type;
  }
  process() {
    console.log("Also can;t multiply");
  }
}
exports.MultiplyStepHandler = MultiplyStepHandler;
//# sourceMappingURL=multiply.step.js.map
