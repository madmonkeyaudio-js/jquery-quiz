

let iterator = 0;
let score = 0;
let correctAnswer = "Correct!"
let incorrectAnswer = "Incorrect!"
let questions = [
{
    prompt: "What is the capital of Rhode Island?",
    answers: ["Providence", "Cranston", "Newport", "Warwick"],
    correctAnswerIndex: 0,
    state: "rhode-island"
},
{
    prompt: "What is the capital of Texas?",
    answers: ["Houston", "Dallas", "Austin", "San Antonio"],
    correctAnswerIndex: 2,
    state: "texas"
},
{
    prompt: "What is the capital of Colorado?",
    answers: ["Colorado Springs", "Denver", "Boulder", "Aurora"],
    correctAnswerIndex: 1,
    state: "colorado"
},
{
    prompt: "What is the capital of Washington?",
    answers: ["Olympia", "Tacoma", "Yakima", "Spokane"],
    correctAnswerIndex: 0,
    state: "washington"
},
{
    prompt: "What is the capital of New York?",
    answers: ["New York City", "Albany", "Ithaca", "Buffalo"],
    correctAnswerIndex: 1,
    state: "new-york"
},
{
   prompt: "",
   answers: [],
   correctAnswerIndex: 1,
   state: ""
}
];

//this is to create an array of the prompts, it is filled when quiz starts
let promptArr = [];
$('#endSequence-container').hide();
//listens for start button click and starts the quiz
$("#start").click(function() {
    startQuiz();
    //console.log("Clicked baby");
})

// $('#reset').on("click", function(e){
//    e.preventDefault();
//    console.log('hi');
//})

$("#next").click(function() {
   //Hides the previous Answer
   $('h3').prev().empty();
    checkAnswer();
    //increases the iterator thereby moving to the next set of questions and answers
    iterator++;
    //empties the div so that the next question can take its place
    $("#question").empty();
    createQuestion();
    giveOptions();
    checkScore();
})

$("#next").hide();
//starts the quiz
function startQuiz() {
    for (var i = 0; i < questions.length; i++) {
        promptArr.push(questions[i].prompt); 
    }
   createQuestion();
    //creates the next button
    $("#next").show();
    
    //hides the start button
    $("#start").hide();
    //create the radio options
    giveOptions(); 
    
}
function createQuestion(){
   //creates the question
  var newDiv = $("<div></div>").text(promptArr[iterator]);
  $("#question").append(newDiv);
}

function giveOptions(){
   //create radio buttons
    for (var j = 0; j < questions[iterator].answers.length; j++) {
        console.log(questions[iterator].answers[j])
        var radioBtn = $(`<input type="radio" name="${questions[iterator].state}" value="${j}" />${questions[iterator].answers[j]}<br/>`);
        radioBtn.appendTo('#question');
    }
    if($(`input[name='${questions[iterator].state}']:checked`)){
      $("#next").show();
   }
}
function checkAnswer(){
    
    //checks if the answer given is correct
    var checkedanswer = $(`input[name='${questions[iterator].state}']:checked`).val();
    if (checkedanswer == questions[iterator].correctAnswerIndex) {
        score += 20;
        $('#answer').append(`<h3>${correctAnswer}</h3>`);
       
    } else {
        score += 0;
        $('#answer').append(`<h3>${incorrectAnswer}</h3>`);
    }
    // }
}
function checkScore(){
   if (iterator === 5){
      endQuiz();
   }
}
function endQuiz(){
   
      $('#next').hide();
      //$('body').append('<input type="submit" id="reset" value="Restart!" />')
      $('#endSequence-container').show();
      scoreResults();
      $('#answer').hide();

   }

function scoreResults(){
   if (score === 0){
      console.log('ouch');
      $('#endSequence-container').text('0/5, Ouch');
   }else if (score === 20){
      console.log('you got one!');
      $('#endSequence-container').text('1/5, You got one!');
   }else if (score === 40){
      console.log('better luck next time');
      $('#endSequence-container').text('2/5, Better luck next time!');
   }else if (score === 60){
      console.log('not bad')
      $('#endSequence-container').text('3/5, Not bad.');
   }else if (score === 80){
      console.log('good show')
      $('#endSequence-container').text('4/5, Good show!');
   }else {
      console.log('you are an expert!');
      $('#endSequence-container').text('5/5, YOU ARE AN EXPERT!');
   }
}

