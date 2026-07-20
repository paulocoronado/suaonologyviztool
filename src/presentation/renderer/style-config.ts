export const STYLE_CONFIG = [
  {
    selector: 'node[nodeType = "CLASS"]',
    style: {
      "background-color": "#4f46e5",
      shape: "round-rectangle",
      label: "data(label)",
      width: 30,
      height: 30,
    },
  },
  {
    selector: 'node[nodeType = "INDIVIDUAL"]',
    style: {
      "background-color": "#10b981",
      shape: "ellipse",
      label: "data(label)",
      width: 24,
      height: 24,
    },
  },
  {
    selector: "node:selected",
    style: { "border-width": 3, "border-color": "#f59e0b" },
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
