//===========================================================[ INTERFACE ]
interface IRequestStrategy<T> {
  request: (args?: any) => Promise<T>;
}

export default IRequestStrategy;
