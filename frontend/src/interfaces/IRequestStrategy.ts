//===========================================================[ INTERFACE ]
interface IRequestStrategy<T> {
  request: () => Promise<T>;
}

export default IRequestStrategy;
