class Dictionary<T> {
  private items: { [index: string]: T } = {};

  public count: number = 0;

  public containsKey(key: string): boolean {
    return this.items.hasOwnProperty(key);
  }

  public add(key: string, value: T) {
    if (!this.items.hasOwnProperty(key)) this.count++;

    this.items[key] = value;
  }

  public remove(key: string): T {
    var val = this.items[key];
    delete this.items[key];
    this.count--;
    return val;
  }

  public item(key: string): T {
    return this.items[key];
  }

  public keys(): string[] {
    var keySet: string[] = [];

    for (var prop in this.items)
      if (this.items.hasOwnProperty(prop)) keySet.push(prop);

    return keySet;
  }

  public values(): T[] {
    var values: T[] = [];

    for (var prop in this.items)
      if (this.items.hasOwnProperty(prop)) values.push(this.items[prop]);

    return values;
  }
}

export default Dictionary;