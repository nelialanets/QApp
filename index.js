//https://opentdb.com/api.php?amount=10
//https://opentdb.com/api.php?amount=10&category=18&type=boolean


 const question = document.getElementById('question');
 const options = document.querySelector('.quiz-options');
 const checkBtn= document.getElementById('check-answer');
 const _playAgainBtn = document.getElementById('play-again');
 const _result = document.getElementById('result');



 let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;

 //event listeners
 function eventListeners(){
     checkBtn.addEventListener('click', checkAnswer)
 }

 document.addEventListener('DOMContentLoaded', ()=>{
     loadQuestions();
     eventListeners();
 })

async function loadQuestions(){
     const APIUrl='https://opentdb.com/api.php?amount=10&category=18&type=boolean'
     const result = await fetch(`${APIUrl}`);
     const data = await result.json();

     // console.log(data.results[0])
     showQuestions(data.results[0]);
}
//display questions and options
function showQuestions(data){
     correctAnswer = data.correct_answer;
     let incorrectAnswer = data.incorrect_answers;
     let optionsList = incorrectAnswer;
     optionsList.splice(Math.floor(Math.random()
     *(incorrectAnswer.length + 1)), 0 , correctAnswer);
     // console.log(optionsList)
     // console.log(correctAnswer)

     question.innerHTML=`${data.question} <br> <span class = 
     "category">${data.category}</span>`;
     options.innerHTML = `
     ${optionsList.map((option)=>`
     <li> <span>${option}</span></li>
     `).join('')}`

     selecctOption();
     
}
//select options
//refactor to ul eventDelegation 
function selecctOption(){
     options.querySelectorAll('li').forEach((option)=>{
          option.addEventListener('click', ()=>{
              if(options.querySelector('.selected')){
               const activeOption = options.querySelector('.selected');
               activeOption.classList.remove('selected')
              }
             option.classList.add('selected')
          })
     })
     console.log(correctAnswer)
}

//cheking answers
function checkAnswer(){
checkBtn.disabled = true;
if(options.querySelector('.selected')){
     let selectedAnswer = options.querySelector('.selected span ').textContent;
     // console.log(selectedAnswer)
     if(selectedAnswer == correctAnswer){
         
          _result.innerHTML=`<p> correct answer </p>`
     }
     else{
          _result.innerHTML=`<p> Wrong Answer! Corect answer: ${correctAnswer}</p>`
     }
}
}
