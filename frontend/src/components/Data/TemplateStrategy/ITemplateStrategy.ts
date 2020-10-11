import Data from "../Data";

interface ITemplateStrategy {
  templateMethod(context: Data): JSX.Element;
}

export default ITemplateStrategy;
