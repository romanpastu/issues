type IIssue = {
    id: number,
    name: string,
    // eslint-disable-next-line camelcase
    cover_image: string,
    description: string
}

export const splitArray = (flatArray: Array<IIssue>, itemsPerPage: number) => {
  const result = flatArray.reduce((resultArray: Array<Array<IIssue>>, item: IIssue, index: number) => {
    const chunkIndex : number = Math.floor(index / itemsPerPage);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return result;
};
