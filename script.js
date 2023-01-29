// put all global variables here


// import the questions and answers from a separate JSON file
fetch("questions.json")
.then(response => response.json())
.then(data => {
    // use the data to generate the quiz
    const quizForm = document.getElementById("quizForm");
    let score = 0;
    data.questions.forEach((question, index) => {
        // create a container for the question
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");
        questionContainer.id = `question-${index + 1}`;
        
        // create the question text
        const questionText = document.createElement("h2");
        questionText.innerText = question.question;
        questionContainer.appendChild(questionText);
        
        // create the answer choices
        const answerChoices = document.createElement("div");
        answerChoices.classList.add("answer-choices");
        questionContainer.appendChild(answerChoices);
        
        const agree = document.createElement("input");
        agree.type = "radio";
        agree.name = `answer-${index + 1}`;
            agree.value = "agree";
            agree.id = `agree-${index + 1}`;

            const agreeLabel = document.createElement("label");
            agreeLabel.htmlFor = agree.id;
            agreeLabel.innerText = "Agree";
            answerChoices.appendChild(agree);
            answerChoices.appendChild(agreeLabel);
            
            const disagree = document.createElement("input");
            disagree.type = "radio";
            disagree.name = `answer-${index + 1}`;
            disagree.value = "disagree";
            disagree.id = `disagree-${index + 1}`;
            
            const disagreeLabel = document.createElement("label");
            disagreeLabel.htmlFor = disagree.id;
            disagreeLabel.innerText = "Disagree";
            answerChoices.appendChild(disagree);
            answerChoices.appendChild(disagreeLabel);
            
            quizForm.appendChild(questionContainer);
        });
        
        // add event listener to the submit button
        document.getElementById("submit-button").addEventListener("click", event => {
            event.preventDefault();
            checkAnswers();
        });
        
        document.getElementById('autofill-button').addEventListener('click', autoFillTest);
        
        function autoFillTest() {
            // console.log("testing");
            var choices = document.querySelectorAll('.answer-choices');
            choices.forEach(function (choice) {
                var inputs = choice.querySelectorAll('input[type="radio"]');
                var randomIndex = Math.floor(Math.random() * inputs.length);
                inputs[randomIndex].checked = true;
            });
        }

        // var introvert = 0;
        // var extrovert = 0;
        // var batman = 0;
        
        // function checkAnswers() {
        //     var quizForm = document.getElementById("quizForm");
        //     console.log(quizForm.elements);
        //     for (var i = 0; i < quizForm.elements.length; i++) {
        //         var question = quizForm.elements[i];
        //         console.log(question);
        //         if (question.type === "radio" && question.checked) {
        //             if (question.value === "introvert") {
        //                 introvert++;
        //             } else if (question.value === "extrovert") {
        //                 extrovert++;
        //             } else if (question.value === "batman") {
        //                 batman++;
        //             }
        //         }
        //     }
        //     alert("introvert: " + introvert + " extrovert: " + extrovert + " batman: " + batman);
        // }
        function checkAnswers() {
            var quizForm = document.getElementById("quizForm");
            var questions = data.questions; // get the questions from the JSON data
            var introvert = 0;
            var extrovert = 0;
            var batman = 0;
            
            for (var i = 0; i < questions.length; i++) {
                var question = questions[i];
                var selectedAnswer = quizForm.elements[`answer-${i+1}`];
                console.log(selectedAnswer[0]);
                if (selectedAnswer[0].checked) {
                    if (question.result === "introvert") {
                        introvert++;
                    } else if (question.result === "extrovert") {
                        extrovert++;
                    } else if (question.result === "batman") {
                        batman++;
                    }
                }
            }
            alert("introvert: " + introvert + " extrovert: " + extrovert + " batman: " + batman);
        }
        
        
        

    })