export default interface RequestStrategy<T> {
  request: () => Promise<T>;
}
