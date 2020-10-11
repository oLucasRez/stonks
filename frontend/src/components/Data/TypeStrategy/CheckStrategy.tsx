import React from "react";
import ITypeStrategy from "./ITypeStrategy";

class CheckStrategy implements ITypeStrategy {
  getBody(): JSX.Element {
    return <div>altos checks</div>;
  }
}

export default CheckStrategy;
