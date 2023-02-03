// put all global variables here


// import the questions and answers from a separate JSON file

fetch("questions.json")
.then(response => response.json())
.then(data => {
    // use the data to generate the quiz

    const quizForm = document.getElementById("quizForm")
    let questions = data.questions

    // shuffle the questions array using the sort method

    questions.sort(function () {
        return 0.5 - Math.random()
    })

    // these variables will keep track of which question should be displayed
    let currentQuestion = 0
    let questionIndex = 0

    function displayQuestion() {
        // Remove active class from previous question

        var activeQuestion = document.querySelector(".question.active")
        if (activeQuestion) {
            activeQuestion.classList.remove("active")
        }

        // start the quiz over / refresh the page

        document.getElementById("start-over").addEventListener("click", function () {
            location.reload()
        })

    
        // Get the current question

        var question = questions[currentQuestion]
    
        // Create the HTML for the question

        var questionDiv = document.createElement("div")
        questionDiv.classList.add("question")
        questionDiv.classList.add("active")
        questionDiv.innerHTML = `
            <p class="questionNumber">${currentQuestion + 1} / ${questions.length}</p>
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
        `
        quizForm.appendChild(questionDiv)
    
        // Listen for changes to the radio buttons

        var answerRadios = document.querySelectorAll(`input[name="answer-${currentQuestion+1}"]`)
        answerRadios.forEach(function (radio) {
            radio.addEventListener("change", function () {
                // Increment the current question

                currentQuestion++

                // check if it is the last question

                if (currentQuestion === questions.length) {
                    // remove classes from last question since it isn't being replaced by displayQuestion

                    var activeQuestion = document.querySelector(".question.active")
                    if (activeQuestion) {
                        activeQuestion.classList.remove("active")
                    }

                    checkAnswers()
                } else {
                    console.log(questions.length + " questions.length")
                    console.log(currentQuestion + " currentQuestion")
                    // Display the next question

                    displayQuestion()
                }
            })
        })
    }
    
    displayQuestion()

        function checkAnswers() {

            
            var quizForm = document.getElementById("quizForm")
            var questions = data.questions // get the questions from the JSON data
            
            // dynamically filter through the question results to make variables from each possible outcome

            var resultsArray = questions.map(question => question.result)
            var results = {}
            for (var i = 0; i < resultsArray.length; i++) {
                if (!results[resultsArray[i]]) {
                    results[resultsArray[i]] = 0
                }
            }
            
            // Loop through questions, update "results" based on selected answer from "quizForm"

            for (var i = 0; i < questions.length; i++) {
                var question = questions[i]
                // var selectedAnswer = quizForm.elements[`answer-${i+1}`]
                var selectedAnswer = document.querySelector(`input[name="answer-${i+1}"]:checked`)
                if (selectedAnswer) {
                    // if (selectedAnswer[0].checked) {

                        results[question.result]++
                    // }
                }
            }

            var result = ""
            var highestScore = 0
            var tiedResults = []

            // This code block finds the result(s) with the highest score by iterating over the results object and updating
            //  the highestScore and tiedResults variables as needed.

            for (var key in results) {
                if (results[key] > highestScore) {
                    highestScore = results[key]
                    tiedResults = [key]
                } else if (results[key] === highestScore) {
                    tiedResults.push(key)
                }
            }

            // for now, keeping it simple with one highest result

            let resultStatement = "You align most closely with "
            let resultExplanation = "here is info about that...here is more...here is more..."
            
            document.getElementById("results-text").innerHTML = resultStatement
            document.getElementById("result").innerHTML = tiedResults[0]
            document.getElementById("resultExplanation").innerHTML = resultExplanation
            
            document.getElementById("results").classList.remove("hidden")

            // determines the final result of the quiz by checking if there is only one result with the highest score. 
            // If so, it sets it as the final result. If multiple results are tied, it creates a string of the tied 
            // results and displays it in an alert. If a final result is found, it redirects to the corresponding result page

            // if (tiedResults.length === 1) {
            //     result = tiedResults[0]
            //     var resultsText = "You are a " + result + "!"
            //     document.getElementById("results-text").innerHTML = resultsText
            //     document.getElementById("results").classList.remove("hidden")
            // } else {
            //     var resultsText = ""
            //     for (var i = 0 i < tiedResults.length i++) {
            //         resultsText += tiedResults[i]
            //         if (i !== tiedResults.length - 1) {
            //             resultsText += ", "
            //         }
            //     }
            //     // alert(resultString)
            //     var resultsText = "You are a mix of " + resultsText + "!"
            //     document.getElementById("results-text").innerHTML = resultsText
            //     document.getElementById("results").classList.remove("hidden")
            // }

            // redirect version of results
            // if (result) {
            //     window.location.href = `${result}.html`
            // }
        
            
        }
        
    })