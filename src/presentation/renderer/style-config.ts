export const STYLE_CONFIG = [
  {
    selector: 'node[nodeType = "CLASS"]',
    style: {
      "background-color": "#4f46e5",
      shape: "round-rectangle",
      label: "data(label)",
    },
  },
  {
    selector: 'node[nodeType = "INDIVIDUAL"]',
    style: {
      "background-color": "#10b981",
      shape: "ellipse",
      label: "data(label)",
    },
  },
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      width: 1,
    },
  },
];
