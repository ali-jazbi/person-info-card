// import groupBy from "src/utils/groupBy";

const groupByObj = (arr, property) => {
  if (!!arr) {
    const result = arr.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
    return result;
  } else {
    return {};
  }

  // console.log("parentObj", parentObj);
};
export default groupByObj;
