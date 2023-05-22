let availableElements = [
  "every",
  "the",
  "in",
  "that-has-class-item",
  "that-has-id-one",
  "direct-child-of",
  "element-p",
  "element-div",
  "element-img"
];

const getRandomElement = function () {
  return availableElements[
    Math.floor(Math.random() * availableElements.length)
  ];
};

const db = [
  {
    selector: "p",
    answer: ["every", "element-p"]
  },
  {
    selector: "div",
    answer: ["every", "element-div"]
  },
  {
    selector: "div.item",
    answer: ["every", "element-div", "that-has-class-item"]
  },
  {
    selector: "div > p",
    answer: ["every", "element-p", "direct-child-of", "every", "element-div"]
  },
  {
    selector: "div p",
    answer: ["every", "element-p", "in", "every", "element-div"]
  },
  {
    selector: "div img",
    answer: ["every", "element-img", "in", "every", "element-div"]
  },
  {
    selector: "p.item",
    answer: ["every", "element-p", "that-has-class-item"]
  },
  {
    selector: "div div.big",
    answer: [
      "every",
      "element-div",
      "that-has-class-big",
      "in",
      "every",
      "element-div"
    ]
  },
  {
    selector: "div#one p",
    answer: [
      "every",
      "element-p",
      "in",
      "the",
      "element-div",
      "that-has-id-one"
    ]
  },
  {
    selector: "div p.item",
    answer: [
      "every",
      "element-p",
      "that-has-class-item",
      "in",
      "every",
      "element-div"
    ]
  },
  {
    selector: "section > div p",
    answer: [
      "every",
      "element-p",
      "in",
      "every",
      "element-div",
      "direct-child-of",
      "every",
      "element-section"
    ]
  }
];

export { db, getRandomElement };
