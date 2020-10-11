import ITemplateStrategy from "./TemplateStrategy/ITemplateStrategy";
import ITypeStrategy from "./TypeStrategy/ITypeStrategy";

class Data {
  public name: string;
  public description: string;
  private templateStrategy: ITemplateStrategy;
  public typeStrategy: ITypeStrategy;

  constructor(
    name: string,
    description: string,
    templateStrategy: ITemplateStrategy,
    typeStrategy: ITypeStrategy
  ) {
    this.name = name;
    this.description = description;
    this.templateStrategy = templateStrategy;
    this.typeStrategy = typeStrategy;
  }

  public templateMethod() {
    return this.templateStrategy.templateMethod(this);
  }
}

export default Data;
