//================================================================[ UTIL ]
function removeElement<T>(array: Array<T>, element: T): Array<T> {
  const index = array.indexOf(element);
  return array.slice(0, index).concat(array.slice(index + 1));
}

export default removeElement;
