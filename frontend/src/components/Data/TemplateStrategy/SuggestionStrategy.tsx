import React from "react";
import ITemplateStrategy from "./ITemplateStrategy";
import Data from "../Data";

class SuggestionStrategy implements ITemplateStrategy {
  templateMethod(context: Data): JSX.Element {
    return <div>interface generica de uma sugestao</div>;
  }
}

export default SuggestionStrategy;
