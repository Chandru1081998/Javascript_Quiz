const quizData = [
  {
    question:'1. Javascript is an _______ language?',
    options:['None of these','Object-Oriented','Object-Based','Procedural'],
    answer:'Object-Oriented',
  },
  {
    question:'2. Which of the following keywords is used to define a variable in Javascript',
    options:['All of these','var','let','const'],
    answer:'All of these',
},
{
question:'3. Which of the following methods is used to access HTML elements using Javascript?',
options:['getElementById','getElementByClassName','getElementByTagName','All of these'],
answer:'Both A and B',
},
{
question:'4. Which of the following methods can be used to display data in some form using Javascript?',
options:['document.write','console.log','window.alert','All of these'],
answer:'All of these',
},
{
question:'5. How can a datatype be declared to be a constant type?',
options:['var','let','const','Constant'],
answer:'const',
},
{
question:'6. To insert a JavaScript into an HTML page, which tag is used?',
options:['<javascript>','<script>','<js>','<jscript>'],
answer:'<script>',
},
{
question:'7. Which of the following print content on the browser window?',
options:['document.write("print content");','console.log("print content");','write("print content");','document("print content");'],
answer:'document.write("print content");',
},
{
question:'8. Which method will you use to round the number 24.76 to the nearest integer?',
options:['round(24.76);','rnd(24.76);','math.round(24.76);','math.rnd(24.76);'],
answer:'math.round(24.76);',
},
{
question:'9. Which of the following statements will show a message as well as ask for user input in a popup?',
options:['alert()','prompt()','confirm()','message()'],
answer:'prompt()',
},
{
question:'10. Which of the following is an event listener in JavaScript?',
options:['onclick','click','clicked','toclick'],
answer:'click',
},
{
question:'11. What is the syntax of a “for” statement in JavaScript?',
options:['for(intialization;condition;increment or decrement)','for(intialization,condition,increment or decrement)','for(intialization;increment or decrement;condition)','for(condition;initialization;increment or decrement)'],
answer:'for(intialization;condition;increment or decrement)',
},
{
question:'12. Which of the given options is an incorrect variable name?',
options:['javascript','_javascript','$javascript','-javascript'],
answer:'-javascript',
},
{
question:'13. JavaScript is a ___ -side programming language.',
options:['client','server','Both','None'],
answer:'Both',
},
{
question:'14. Which of the following will write the message “Hello World!” in an alert box?',
options:['alert(Hello World!);','alert("Hello World!");','alertmsg("Hello World!");','alertbox("Hello World!");'],
answer:'alert("Hello World!");',
},
{
question:'15. How do you find the minimum of x and y using JavaScript?',
options:['min(x,y);','math.min(x,y)','min(x:y);','math.min(x:y)'],
answer:'math.min(x,y)',
},
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const nextButton = document.getElementById('next');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const timerElement = document.getElementById('timer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let timeLeftPerQuestion = 20; // Time per question in seconds
let timerInterval; // Variable to store the timer interval

function startQuestionTimer() {
  timeLeftPerQuestion = 20; // Reset time for each question
  timerElement.textContent = `Time left: ${timeLeftPerQuestion} seconds`; // Display initial time

  timerInterval = setInterval(function() {
    timeLeftPerQuestion--;
    timerElement.textContent = `Time left: ${timeLeftPerQuestion} seconds`; // Update displayed time

    if (timeLeftPerQuestion <= 0) {
      clearInterval(timerInterval); // Stop the timer if time runs out
      checkAnswer(); // Automatically check the answer when time runs out
    }
  }, 1000); // Run the timer every second
}

function stopTimer() {
  clearInterval(timerInterval);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  stopTimer(); // Stop previous timer (if any)
  startQuestionTimer(); // Start timer for the current question

  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  nextButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  nextButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  nextButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

nextButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();