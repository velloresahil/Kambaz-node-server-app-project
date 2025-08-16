export default [
  {
    courseId: "RS101",
    quizId: "q1-html",
    published: false,   // NEW
    details: {
      title: "Q1 - HTML",
      description: "",
      points: 4, // sum of question points (optional, can be auto-calculated)
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswers: false,
      timeLimit: 30, // in minutes
      multipleAttempts: false,
      maxAttempts: 1,
      showCorrectAnswers: true,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockAfterAnswering: false,
      dates: {
        availableFrom: "2025-07-01T00:00:00Z",
        availableUntil: "2025-08-21T13:00:00Z",
        dueDate: "2025-08-21T13:00:00Z"
      }
    },
    questions: [
      {
        questionId: "mc_001",
        questionTitle: "Photosynthesis Process",
        questionDescription:
          "Which of the following best describes the process by which plants convert sunlight into energy?",
        questionType: "multi-select",
        possibleAnswers: [
          "To produce oxygen for animals",
          "To convert sunlight into chemical energy",
          "To absorb carbon dioxide from air",
          "To create chlorophyll"
        ],
        correctAnswers: "To convert sunlight into chemical energy",
        points: 2
      },
      {
        questionId: "tf_001",
        questionTitle: "JavaScript Variable Declaration",
        questionDescription:
          "True or False: In JavaScript, variables declared with 'const' can be reassigned after declaration.",
        questionType: "true-false",
        possibleAnswers: ["True", "False"],
        correctAnswers: "False",
        points: 1
      },
      {
        questionId: "fib_001",
        questionTitle: "Capital of France",
        questionDescription: "The capital city of France is _______.",
        questionType: "fill-in-blank",
        possibleAnswers: ["Paris", "paris", "PARIS"],
        correctAnswers: "Paris",
        points: 1
      }
    ],
    attempts: [] // NEW
  },
  {
    courseId: "RS101",
    quizId: "q2-css",
    published: false,
    details: {
      title: "Q2 - CSS",
      description: "",
      points: 2,
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswers: false,
      timeLimit: 20,
      multipleAttempts: false,
      maxAttempts: 1,
      showCorrectAnswers: true,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockAfterAnswering: false,
      dates: {
        availableFrom: "2023-09-22T00:00:00Z",
        availableUntil: "2023-10-05T13:00:00Z",
        dueDate: "2023-10-05T13:00:00Z"
      }
    },
    questions: [
      {
        questionId: "fib_005",
        questionTitle: "Largest Planet",
        questionDescription: "The largest planet in our solar system is _______.",
        questionType: "fill-in-blank",
        possibleAnswers: ["Jupiter", "jupiter", "JUPITER"],
        correctAnswers: "Jupiter",
        points: 1
      },
      {
        questionId: "tf_004",
        questionTitle: "Speed of Light",
        questionDescription: "True or False: Light travels faster in water than in air.",
        questionType: "true-false",
        possibleAnswers: ["True", "False"],
        correctAnswers: "False",
        points: 1
      }
    ],
    attempts: []
  },
  {
    courseId: "RS102",
    quizId: "q5-mongo",
    published: false,
    details: {
      title: "Q5 - MONGO",
      description: "",
      points: 1,
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswers: false,
      timeLimit: 20,
      multipleAttempts: false,
      maxAttempts: 1,
      showCorrectAnswers: true,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockAfterAnswering: false,
      dates: {
        availableFrom: "2023-11-30T11:40:00Z",
        availableUntil: "2023-11-30T13:00:00Z",
        dueDate: "2023-11-30T13:00:00Z"
      }
    },
    questions: [
      {
        questionId: "tf_002",
        questionTitle: "Earth's Atmosphere",
        questionDescription:
          "True or False: Nitrogen makes up approximately 78% of Earth's atmosphere.",
        questionType: "true-false",
        possibleAnswers: ["True", "False"],
        correctAnswers: "True",
        points: 1
      }
    ],
    attempts: []
  }
];
