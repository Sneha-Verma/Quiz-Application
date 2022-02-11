const question=document.querySelector('#question');
const choices=Array.from(document.querySelectorAll('.choice-text'));
const progressText=document.querySelector('#progress-text');
const scoreText=document.querySelector('#score');
const progressBarFull=document.querySelector('#progressBarFull')
const loader=document.querySelector('#loader')
const game=document.querySelector('#game')

let  currentquestion={};
let acceptingAnswers=false;
let score=0;
let questionCounter=0;
let availableQuestions=[];

let questions = [];

fetch(
    'https://opentdb.com/api.php?amount=50&category=18&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANT
const correct_bonus=10;
const max_questions=5;

startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions] //spread
    //console.log(availableQuestions);
    getNewQuestions();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
}

getNewQuestions=()=>{

    if(availableQuestions.length==0 || questionCounter>=max_questions)
     {
        localStorage.setItem('mostRecentScore',score);
      return window.location.assign("/end.html");
     }

    questionCounter++;
    progressText.innerText=`Question ${questionCounter} / ${max_questions}`;
    let per=(questionCounter/max_questions) * 100;
   // console.log(`${per} px`)
    progressBarFull.style.width=`${per}%`;
    const questionIndex=Math.floor(Math.random()*availableQuestions.length);
    currentquestion=availableQuestions[questionIndex];
    question.innerHTML=currentquestion.question;

    choices.forEach(choice=>{
        const number=choice.dataset["number"];
        choice.innerText=currentquestion[`choice${number}`];
    })

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers=true;
}

choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
        
        if(!acceptingAnswers)
          return;
        acceptingAnswers=true;
        const selectedChoice=e.target;
        const selectedAnswer=selectedChoice.dataset["number"];
        const classToApply=selectedAnswer==currentquestion.answer?'correct':'incorrect';
        if(classToApply=='correct')
          incrementScore(correct_bonus);
          
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        },1000);
        
    })
})


let incrementScore=num =>{
    score+=num;
    scoreText.innerHTML=score;
}
