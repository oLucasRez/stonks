import React from "react";
import ITypeStrategy from "./ITypeStrategy";

class TimeStrategy implements ITypeStrategy {
  getBody(): JSX.Element {
    return <div>altos tempos aq</div>;
  }
}

export default TimeStrategy;
