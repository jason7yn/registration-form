const FormQuestions = {
  q1: {
    content: "This course is identified in my Work Plan and Learning Agreement",

    options: [
      { key: 1, value: "Yes" },
      { key: 2, value: "No" },
    ],
  },
  q2: {
    content: "I am attending this session because",

    options: [
      {
        key: 1,
        value:
          "It will help me develop the skills and knowledge required for my current role",
      },
      {
        key: 2,
        value:
          "It will help me develop the skills and knowledge for a possible future role/body of work",
      },
      {
        key: 3,
        value:
          "It was identified as a need during my performance management discussions",
      },
      {
        key: 4,
        value: "My manager recommended that I attend",
      },
      {
        key: 5,
        value: "I am interested in the content",
      },
    ],
  },
  q3: {
    content:
      "What would you like to achieve as a result of your attendance? For example, “I would like to learn to write better emails to improve my communication skills”.",
  },
  q4: {
    content:
      "Do you require adjustments or additions to the session delivery to support your participation? For example, hearing loop or wheelchair access.",

    options: [
      { key: 1, value: "Yes" },
      { key: 2, value: "No" },
    ],
  },
  q5: {
    content: "Please provide details of your requirements.",
  },
  q6: {
    content:
      "Please upload any supporting documentation to support your registration request",
  },
};

export default FormQuestions;
