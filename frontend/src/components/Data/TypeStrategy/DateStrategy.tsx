import React from "react";
import ITypeStrategy from "./ITypeStrategy";

class DateStrategy implements ITypeStrategy {
  getBody(): JSX.Element {
    return <div>altas datas aq</div>;
  }
}

export default DateStrategy;
