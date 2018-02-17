import _ from "lodash";

const describeByProps = (obj, arrPropsName) => {
  return arrPropsName
    .map(key => obj[key] && _.capitalize(_.replace(key, /_/g, " ")) + " : " + obj[key])
    .filter(v => v)
    .join(", ");
};

export default {
  describeByProps
};
