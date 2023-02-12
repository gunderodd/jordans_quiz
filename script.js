// IMPORT THE QUESTIONS AND ANSWERS FROM A SEPARATE JSON FILE:
// 1. fetch from json file, return a promise named 'response' 
// 2. process the response back into json with another promise called 'data 
// 3. work with the data
fetch("questions.json")
    .then(response => response.json())
    .then(data => {

        // USE THE DATA TO GENERATE THE QUESTIONS ARRAY
        let questions = data.questions

        // SHUFFLE THE QUESTIONS ARRAY TO RANDOMIZE THE ORDER
        questions.sort(() => 0.5 - Math.random())

        // TRACK WHICH QUESTION IS BEING DISPLAYED
        let currentQuestion = 1
        
        // PRIMARY FUNCTION #1:
        // DISPLAY EACH QUESTION AND PROGRESS THROUGH QUIZ AS EACH IS ANSWERED
        function displayQuestion() {
            
            // REMOVE ACTIVE CLASS FROM THE LAST QUESTION SO THAT IT DISAPPEARS AND CAN BE REPLACED
            let activeQuestion = document.querySelector(".question.active")
            // uses the ternary operator (a conditional, instead of saying 'if'. 
            // 'null' does nothing if there isn't an active question)
            activeQuestion ? activeQuestion.classList.remove("active") : null

            // RESTART THE QUIZ (REFRESH THE PAGE)
            document.getElementById("start-over").addEventListener("click", () => location.reload())

            let question = questions[currentQuestion - 1]  // SELECT EACH QUESTION ONE AT A TIME FROM THE ARRAY
            const quizForm = document.getElementById("quizForm") // GRAB THE HTML ELEMENT TO APPEND DYNAMIC QUESTIONS

            // CREATE THE DYNAMIC HTML FOR THE QUIZ
            let questionDiv = document.createElement("div")
            questionDiv.classList.add("question")
            questionDiv.classList.add("active")
            questionDiv.innerHTML = `
            <p class="questionNumber">${currentQuestion} / ${questions.length}</p>
            <div class="question-holder">
                <p class="title">${question.text}</p>
                <p>${question.result}</p>
            </div>
            <div class="container">
                <div>
                    <input type="radio" id="answer-${currentQuestion}-1" name="answer-${currentQuestion}" value="agree">
                    <label for="answer-${currentQuestion}-1" class="agreeButton">Agree</label>
                </div>
                <div>
                    <input type="radio" id="answer-${currentQuestion}-2" name="answer-${currentQuestion}" value="disagree">
                    <label for="answer-${currentQuestion}-2" class="disagreeButton">Disagree</label>
                </div>
            </div>
            `
            
            // PUSH THE QUESTION TO THE PAGE AFTER IT IS BUILT
            quizForm.appendChild(questionDiv)

            // TRACK QUIZ SCORES PER CATEGORY
            // 1. get every input 
            // 2. get the input's radio buttons 
            // 3. if they change, check whether to show another question or tally the results and display those
            let answerRadios = document.querySelectorAll(`input[name="answer-${currentQuestion}"]`)
            answerRadios.forEach(radio => {radio.addEventListener("change", () => {
                    // INCREMENT THE CURRENT QUESTION COUNTER
                    currentQuestion++
                    // CHECK IF THIS IS THE LAST QUESTION OF THE QUIZ
                    if (currentQuestion === questions.length + 1) {
                        // REMOVE CLASSES FROM LAST QUESTION SINCE IT ISN'T BEING REPLACED BY DISPLAYQUESTION
                        if (activeQuestion) {
                            activeQuestion.classList.remove("active")
                        }
                        checkAnswers()
                    } else {
                        // DISPLAY THE NEXT QUESTION - this calls it every time other than the first time
                        displayQuestion()
                    }
                })
            })
        }

        // CALL THE FUNCTION FOR THE FIRST TIME
        displayQuestion()


        // PRIMARY FUNCTION #2:
        function checkAnswers() {

            // again, fetch json as a promise, process the promise back into json, return a promise (data)
            fetch("types.json")
                .then(response => response.json())
                .then(data => {

                    
                    // DYNAMICALLY FILTER THROUGH THE QUESTION RESULTS TO MAKE VARIABLES FROM EACH POSSIBLE OUTCOME
                    let questionTypesList = questions.map(question => question.result) // the type of each question
                    
                    let results = {} // array meant to track scores
                    let types = data.enneagrams // list of the descriptive paragraphs that fit each result

                    // BUILD LIST OF SCORES FOR EACH POSSIBLE RESULT
                    for (var i = 0; i < questionTypesList.length; i++) {
                        // look through the results object to see if the entry exists already
                        if (!results[questionTypesList[i]]) {
                            // and if it doesn't, add it, with an initial score of 0
                            results[questionTypesList[i]] = 0
                        }
                    }

                    // LOOP THROUGH QUESTIONS, UPDATE "RESULTS" ARRAY BASED ON SELECTED ANSWER
                    for (let i = 0; i < questions.length; i++) {
                        // for each specific question
                        let question = questions[i]
                        // create a variable 'agree' if the agree button was selected
                        let agree = document.querySelector(`input[name="answer-${i + 1}"]:checked`)
                        // check both that a button has been selected (to avoid throwing errors)
                        // and that 'agree' was the selection
                        if (agree && agree.value === "agree") {
                            results[question.result]++ // increment the score for that result
                        }
                    }

                    // console.log(results)


                    // creating variables...
                    let highestScore = 0
                    let tiedResults = []
                    let resultDescription = ""
                    
                    // This code block finds the result(s) with the highest score by iterating over the results
                    // object and updating the highestScore and tiedResults variables as needed.
                    for (let key in results) {
                        if (results[key] > highestScore) {
                            highestScore = results[key]
                            tiedResults = [key]
                        } else if (results[key] === highestScore) {
                            tiedResults.push(key)
                        }
                    }

                    // SELECT THE CORRESPONDING DESCRIPTION TO DISPLAY IT
                    for (let key in types) {
                        if (types[key].title === tiedResults[0]) {
                            resultDescription = types[key].description
                        }
                    }


                    // CREATE AND DISPLAY FINAL RESULTS
                    document.getElementById("results").classList.add("active")
                    document.getElementById("result").innerHTML = tiedResults[0]
                    document.getElementById("resultExplanation").innerHTML = resultDescription
                })
        }
    })
                    
                    



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
                        
                        
                    // }
            
        // 'optimized' version of function, might have some useful stuff?

             // async function checkAnswers() {
        //     const typesResponse = await fetch("types.json");
        //     const types = (await typesResponse.json()).enneagrams;
        //     const resultsArray = questions.map(question => question.result);
        //     const results = {};

        //     for (const result of resultsArray) {
        //         results[result] = (results[result] || 0) + 1;
        //     }

        //     for (const question of questions) {
        //         const selectedAnswer = document.querySelector(`input[name="answer-${question.index + 1}"]:checked`);
        //         if (selectedAnswer) {
        //             results[question.result]++;
        //         }
        //     }

        //     const resultScores = Object.values(results);
        //     const highestScore = Math.max(...resultScores);
        //     const tiedResults = Object.keys(results).filter(key => results[key] === highestScore);

        //     const winner = types.find(type => type.title === tiedResults[0]).description;

        //     document.getElementById("results").classList.add("active");
        //     document.getElementById("results-text").innerHTML = "You align most closely with...";
        //     document.getElementById("result").innerHTML = tiedResults[0];
        //     document.getElementById("resultExplanation").innerHTML = winner;