import React from "react";
import ITypeStrategy from "./ITypeStrategy";

class TagStrategy implements ITypeStrategy {
  getBody(): JSX.Element {
    return <div>altas tags aq</div>;
  }
}

export default TagStrategy;
