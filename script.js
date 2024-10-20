// List of questions and answers
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Tolstoy", "Hemingway", "Austen"],
    answer: "Shakespeare"
  }
];

// Get references to the DOM elements
const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreContainer = document.getElementById("score");

// Load quiz progress from sessionStorage if available
function loadProgress() {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  questions.forEach((q, index) => {
    const selectedOption = savedProgress[index];
    if (selectedOption !== undefined) {
      document.querySelector(`input[name="question${index}"][value="${selectedOption}"]`).checked = true;
    }
  });
}

// Save quiz progress to sessionStorage
function saveProgress() {
  const progress = {};
  questions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedOption) {
      progress[index] = selectedOption.value;
    }
  });
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Create quiz questions and options
function createQuiz() {
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    q.options.forEach((option) => {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${index}`;
      input.value = option;
      input.addEventListener("change", saveProgress); // Save progress on option change
      label.appendChild(input);

      label.appendChild(document.createTextNode(option));
      questionDiv.appendChild(label);
    });

    questionsContainer.appendChild(questionDiv);
  });

  loadProgress(); // Load progress after creating quiz
}

// Calculate and display the score
function calculateScore() {
  let score = 0;
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

  questions.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  // Display score
  scoreContainer.textContent = `Your score is ${score} out of 5.`;

  // Save score to localStorage
  localStorage.setItem("score", score);
}

// Event listener for the submit button
submitButton.addEventListener("click", calculateScore);

// Initialize quiz
createQuiz();
