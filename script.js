// put all global variables here


// import the questions and answers from a separate JSON file
fetch("questions.json")
.then(response => response.json())
.then(data => {
    // use the data to generate the quiz
    const quizForm = document.getElementById("quizForm");
    let questions = data.questions

    // shuffle the questions array using the sort method
    questions.sort(function () {
        return 0.5 - Math.random();
    });

    // these variables will keep track of which question should be displayed
    let currentQuestion = 0;
    let questionIndex = 0;

    function displayQuestion() {
        // Remove active class from previous question
        var activeQuestion = document.querySelector(".question.active");
        if (activeQuestion) {
            activeQuestion.classList.remove("active");
        }

        // start the quiz over / refresh the page
        document.getElementById("start-over").addEventListener("click", function () {
            location.reload();
        });

    
        // Get the current question
        var question = questions[currentQuestion];
    
        // Create the HTML for the question
        var questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.classList.add("active");
        questionDiv.innerHTML = `
            <p class="questionNumber">${questionIndex + 1} / ${questions.length}</p>
            <div class="question-holder">
                <p class="title">${question.text}</p>
            </div>
            <div class="container">
                <div>
                    <input type="radio" id="answer-${currentQuestion+1}-1" name="answer-${currentQuestion+1}" value="agree">
                    <label for="answer-${currentQuestion+1}-1" class="agreeButton">Agree</label>
                </div>
                <div>
                    <input type="radio" id="answer-${currentQuestion+1}-2" name="answer-${currentQuestion+1}" value="disagree">
                    <label for="answer-${currentQuestion+1}-2" class="disagreeButton">Disagree</label>
                </div>
            </div>
        `;
        quizForm.appendChild(questionDiv);
    
        // Listen for changes to the radio buttons
        var answerRadios = document.querySelectorAll(`input[name="answer-${currentQuestion+1}"]`);
        answerRadios.forEach(function (radio) {
            radio.addEventListener("change", function () {
                // Increment the current question
                currentQuestion++;
                // increment the counter
                questionIndex++;

                // check if it is the last question
                if (questionIndex === questions.length) {
                    checkAnswers()
                } else {
                    // Display the next question
                    displayQuestion();
                }
            });
        });
    }
    
    displayQuestion();

        function checkAnswers() {

            
            var quizForm = document.getElementById("quizForm");
            var questions = data.questions; // get the questions from the JSON data
            
            // dynamically filter through the question results to make variables from each possible outcome
            var resultsArray = questions.map(question => question.result);
            var results = {};
            for (var i = 0; i < resultsArray.length; i++) {
                if (!results[resultsArray[i]]) {
                    results[resultsArray[i]] = 0;
                }
            }
            
            for (var i = 0; i < questions.length; i++) {
                var question = questions[i];
                var selectedAnswer = quizForm.elements[`answer-${i+1}`];
                // console.log(selectedAnswer[0]);
                if (selectedAnswer[0].checked) {
                    if (selectedAnswer[0].checked) {
                        results[question.result]++;
                    }
                }
            }

            var result = "";
            var highestScore = 0;
            var tiedResults = [];

            for (var key in results) {
                if (results[key] > highestScore) {
                    highestScore = results[key];
                    tiedResults = [key];
                } else if (results[key] === highestScore) {
                    tiedResults.push(key);
                }
            }

            if (tiedResults.length === 1) {
                result = tiedResults[0];
            } else {
                var resultString = "You are a mix of ";
                for (var i = 0; i < tiedResults.length; i++) {
                    resultString += tiedResults[i];
                    if (i !== tiedResults.length - 1) {
                        resultString += ", ";
                    }
                }
                alert(resultString);
            }

            if (result) {
                window.location.href = `${result}.html`;
            }
            

        
            
        }
        
    })