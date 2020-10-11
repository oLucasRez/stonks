import React from "react";
import ITypeStrategy from "./ITypeStrategy";

class SelectStrategy implements ITypeStrategy {
  getBody(): JSX.Element {
    return <div>altos selects aq</div>;
  }
}

export default SelectStrategy;
