const getShortHandOfEdge = ({ style, endpoint = "", values }) => {
  const _genCss = (...values) => ({
    [style + "Top" + endpoint]: values[0],
    [style + "Right" + endpoint]: values[1],
    [style + "Bottom" + endpoint]: values[2],
    [style + "Left" + endpoint]: values[3],
  });

  if (values.length === 1) {
    return _genCss(values[0], values[0], values[0], values[0]);
  }
  if (values.length === 2) {
    return _genCss(values[0], values[1], values[0], values[1]);
  }
  if (values.length === 3) {
    return _genCss(values[0], values[1], values[2], values[1]);
  }
  return _genCss(values[0], values[1], values[2], values[3]);
};

export function padding(...values) {
  return getShortHandOfEdge({ style: "padding", values });
};

export const margin = (...values) => {
  return getShortHandOfEdge({ style: "margin", values });
};

export const border = (...values) => {
  return getShortHandOfEdge({ style: "border", endpoint: "Width", values });
};
export const borderColor = (...values) => {
  return getShortHandOfEdge({ style: "border", endpoint: "Color", values });
};
