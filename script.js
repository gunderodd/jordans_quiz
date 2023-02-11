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
        // questions.sort(() => 0.5 - Math.random())

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
            // <p>${question.result}</p> - can include that in html for testing to see each type

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
        // }

        function checkAnswers() {
            fetch("types.json")
              .then(response => response.json())
              .then(data => {
                let types = data.enneagrams;
          
                let resultsArray = questions.map(question => question.result);
                let results = {};
                for (var i = 0; i < resultsArray.length; i++) {
                  if (!results[resultsArray[i]]) {
                    results[resultsArray[i]] = 0;
                  }
                }
          
                for (var i = 0; i < questions.length; i++) {
                  let question = questions[i];
                  let selectedAnswer = document.querySelector(
                    `input[name="answer-${i + 1}"]:checked`
                  );
                  if (selectedAnswer) {
                    results[question.result]++;
                  }
                }
          
                let highestScore = 0;
                let secondHighestScore = 0;
                let highestResults = [];
                let secondHighestResults = [];
          
                for (var key in results) {
                  if (results[key] > highestScore) {
                    secondHighestScore = highestScore;
                    secondHighestResults = highestResults;
                    highestScore = results[key];
                    highestResults = [key];
                  } else if (results[key] === highestScore) {
                    highestResults.push(key);
                  } else if (results[key] > secondHighestScore) {
                    secondHighestScore = results[key];
                    secondHighestResults = [key];
                  } else if (results[key] === secondHighestScore) {
                    secondHighestResults.push(key);
                  }
                }
          
                let winner1, winner2;
                for (let num in types) {
                  if (types[num].title === highestResults[0]) {
                    winner1 = types[num].description;
                  }
                  if (types[num].title === secondHighestResults[0]) {
                    winner2 = types[num].description;
                  }
                }
          
                let resultStatement = "You align most closely with...";
                let resultExplanation1 = winner1;
                let resultExplanation2 = winner2;
                let score1 = highestScore;
                let score2 = secondHighestScore;
          
                document.getElementById("results").classList.add("active");
                document.getElementById("results-text").innerHTML = resultStatement;
                document.getElementById("result1").innerHTML = highestResults[0];
                document.getElementById("resultExplanation1").innerHTML = resultExplanation1;
                document.getElementById("score1").innerHTML = score1 + " questions";
                document.getElementById("result2").innerHTML = secondHighestResults[0];
                document.getElementById("resultExplanation2").innerHTML = resultExplanation2;
                document.getElementById("score2").innerHTML = score2 + " questions";
              });
          }
          


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

                    
                })
            // }
            
            // testing autofill
            // document.getElementById("test").addEventListener("click", function () {
            //     for (let i = 0; i < questions.length; i++) {
            //         // console.log(document.querySelectorAll(`input[name="answer-${i + 1}"]`));
            //         let answerRadios = document.querySelectorAll(`input[name="answer-${i + 1}"]`)
            //         answerRadios[0].checked = true
            //     }
            //     currentQuestion = questions.length
            //     checkAnswers()
            // })

            // get the button and run a function on click
            // on the current question, select either 'agree' or 'disagree' at random
            // repeat until there are no more questions
    // })