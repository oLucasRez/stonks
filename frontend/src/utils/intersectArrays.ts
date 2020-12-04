//================================================================[ UTIL ]
function intersectArrays<T>(array1: T[], array2: T[], array3?: T[]): T[] {
  return array3
    ? array1
        .filter((value) => array2.includes(value))
        .filter((value) => array3.includes(value))
    : array1.filter((value) => array2.includes(value));
}

export default intersectArrays;
