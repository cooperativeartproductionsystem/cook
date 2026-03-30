// menuConfig.js
export const chefs = [
  {
    id: "drawing",
    title: "Drawing",
    question1: {
      title: "How much forest?",
      type: "percentage",
      min: 0,
      max: 100,
      default: 30,
    },
    question2: {
      title: "Pick a landscape type",
      type: "single-choice",
      options: ["Forest", "Meadow", "Mountains", "Desert"],
    },
    question3: {
      title: "How dramatic should it be?",
      type: "range",
      min: 1,
      max: 10,
      default: 6,
    },
  },
  {
    id: "website",
    title: "Website",
    question1: {
      title: "How colorful?",
      type: "percentage",
      min: 0,
      max: 100,
      default: 50,
    },
    question2: {
      title: "Choose a style",
      type: "single-choice",
      options: ["Portfolio", "Shop", "Experimental", "Archive"],
    },
    question3: {
      title: "How interactive?",
      type: "range",
      min: 1,
      max: 10,
      default: 5,
    },
  },
  {
    id: "3d-object",
    title: "3D-Object",
    question1: {
      title: "How abstract?",
      type: "percentage",
      min: 0,
      max: 100,
      default: 40,
    },
    question2: {
      title: "Choose a form",
      type: "single-choice",
      options: ["Geometric", "Organic", "Hybrid", "Minimal"],
    },
    question3: {
      title: "Complexity level",
      type: "range",
      min: 1,
      max: 10,
      default: 7,
    },
  },
  {
    id: "animation",
    title: "Animation",
    question1: {
      title: "How fast?",
      type: "percentage",
      min: 0,
      max: 100,
      default: 60,
    },
    question2: {
      title: "Choose a mood",
      type: "single-choice",
      options: ["Energetic", "Calm", "Chaotic", "Melancholic"],
    },
    question3: {
      title: "Duration (seconds)",
      type: "range",
      min: 5,
      max: 60,
      default: 15,
    },
  },
  {
    id: "running-object",
    title: "Running Object",
    question1: {
      title: "How mechanical?",
      type: "percentage",
      min: 0,
      max: 100,
      default: 70,
    },
    question2: {
      title: "Choose a purpose",
      type: "single-choice",
      options: ["Art", "Function", "Performance", "Installation"],
    },
    question3: {
      title: "Scale factor",
      type: "range",
      min: 1,
      max: 20,
      default: 10,
    },
  },
];
