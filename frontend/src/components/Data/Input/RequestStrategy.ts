export default interface RequestStrategy<T> {
  request: (args?: any) => Promise<T>;
}
