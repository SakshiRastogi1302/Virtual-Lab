function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("bt" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "/" + quiz.questions.length +"</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("1. Which of the following are components of wireless sensor network?", ["a. Sensor", "b. Sensor Nodes","c. Gateway", "d. All of the above"],"d. All of the above"),

    new Question("2. Which of the following are components of a sensor node? ", ["a. Mesh Network", "b. Microcontroller","c. GPU", "d. All of the above"], "b. Microcontroller"),
     

    new Question("3. Which sensor network topology has no single point of failure?", ["a. Point-To-Point", "b. Mesh","c. Star", "d. All of the above"], "b. Mesh"),
    

    new Question("4. A sensor network is subject to a unique set of resource constraints such as", ["a.	Finite on-board battery power", "b.	Limited  network communication bandwidth","c. Both a and b", "d. None of the above"], "c. Both a and b"),

    new Question("5. ________ routes user queries or commands to appropriate nodes in a sensor network. ", ["a. Bridge", "b. Gateway","c. Router", "d. None of the above"], "b. Gateway"),

    new Question("6. A sensor network is designed to collect information from a _________ enviroment. ", ["a. Logical", "b. Physical","c. Both a and b", "d. None of the above"], "b. Physical"),

    new Question("7. The challenges we face in designing sensor network systems and applications include:- ", ["a. Limited support for Networking","b. Limited support for software development", "c. Limited Hardware ","d. All of the above"], "d. All of the above"),

    new Question("8. Each sensor has a finite sensing range, determined by the ______ floor of the sensor.? ", ["a. Ground", "b. Noise","c. All of the above", "d. None of the above"], "b. Noise"),

    new Question("9. The greatest advantage of networked sensing are in improved __________", ["a. Robustness", "b. Scalability","c. None of the above", "d. Both a and b"], "d. Both a and b"),

    new Question("10. A ________ sensing system is inherently more robust against individual sensor node or link failures, because of redundancy in the network. ", ["a. Centralized", "b. Decentralized","c. Both a and b", "d. None of the above"], "b. Decentralized"),

        

];


var quiz = new Quiz(questions);


populate();





