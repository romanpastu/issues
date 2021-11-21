export const splitArray = (flatArray: any, itemsPerPage: any) => {
  const result = flatArray.reduce((resultArray: any, item: any, index: any) => {
    const chunkIndex = Math.floor(index / itemsPerPage);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return result;
};
