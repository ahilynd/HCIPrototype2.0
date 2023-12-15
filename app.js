//grabbing items from index.html
const startButton = document.getElementById('startTestButton');
const contentContainer = document.getElementById('content');
const questionPageOne = document.getElementById('questionPage1');
const pairwords1 = document.getElementById('pairwords1');
const pairwords2 = document.getElementById('pairwords2');
const nextq = document.getElementById('nextq');
const allContent = document.getElementById('allContent');
const questionnaire = document.getElementById('questionnaire');
const startq1 = document.getElementById('startq1');
//creating vaiables for question 1 - 3 (word/memory question)
pairwords1_testwords = ["lake", "dust", "house", "dog","mat", "book", "soup", "jeep", "bottle", "water"]
pairwords1_answers = ["plug", "flight", "table", "leaf","drink", "coffee", "straw", "pen", "clip", "tree"]
pairwords2_testwords = ["glass", "phone", "chair", "card","bird", "school ", "shoe", "sudan", "desk", "lemon"]
pairwords2_answers = ["napkin", "flight", "bag", "spoon","ring", "clip", "pen", "coat", "cracker", "tree"]

let score = 0;

// random number to choose from list one or list 2
const randomNumber = Math.floor(Math.random() * 2) + 1;

//action button to start test and display list of word pairs
startButton.addEventListener('click', function() {
    // Remove all content from the container
    contentContainer.innerHTML = '';
    questionnaire.style.display = 'block';
});

startq1.addEventListener('click', function(){
    questionnaire.innerHTML = '';
    questionPageOne.style.display = 'block';

    if (randomNumber == 1){
        pairwords1.style.display = "block";
        nextq.style.display = "block";
    }else{
        pairwords2.style.display = "block";
        nextq.style.display = "block";
    }
} )

// action button to move on from list of words to first question
nextq.addEventListener('click', function() {
    questionPageOne.innerHTML = '';
    let wordlist = []
    let anslist = []
    if (randomNumber == 1){
        wordlist = pairwords1_testwords
        anslist = pairwords1_answers
    }else{
        wordlist = pairwords2_testwords
        anslist = pairwords2_answers
    }


    const prompt = document.createElement('p');
    prompt.textContent = "Given the word below choose its correct pair.";
    prompt.classList.add("instructions");
    questionPageOne.appendChild(prompt);
    const br = document.createElement('br');
    questionPageOne.appendChild(br);
    generateWordPairQuestion(wordlist, anslist);
    generateWordPairQuestion(wordlist, anslist);
    generateWordPairQuestion(wordlist, anslist);

})


//fucntion to generate question (format of questions 1-3)

function generateWordPairQuestion(wordlist, answerList){
    const button_container = document.createElement('div');
    button_container.classList.add('button_container');
    const questionIndex = Math.floor(Math.random()*10);
    const randomWord = wordlist[questionIndex];
    console.log(randomWord, questionIndex);
    const line = document.createElement('hr');
    //display the word being asked 
    const questionText = document.createElement('p');
    questionText.innerHTML = `<strong>${randomWord}</strong>`;
    button_container.appendChild(line);
    questionText.classList.add('questionWord');
    button_container.appendChild(questionText);
    const correctAnswer = answerList[questionIndex];

    const incorrectOptions = answerList
        .filter(word => word !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0,3);

    const options = [correctAnswer, ...incorrectOptions].sort(() => Math.random() - 0.5);


    for (let i = 0; i < options.length; i++){
        const space = document.createElement('p');
        space.textContent = '       ';
        const button = document.createElement('button');
        button.innerHTML = `${options[i]}`;
        button.classList.add('optionButton');
        button.style.marginLeft = '4%';
        button.addEventListener('click', () => checkAnswer(options[i], correctAnswer));
        button_container.appendChild(button);
        button_container.appendChild(space);
    }
        questionPageOne.appendChild(button_container);
}
let questionsCompleted = 0;
//check if answer clicked is correct
function checkAnswer(answer, correctAnswer) {
    if(answer == correctAnswer){
        console.log("correct");
        score++;
    }else{
        console.log("incorrect");
    }
    questionsCompleted++;
    if (questionsCompleted == 3){
        allContent.innerHTML = '';
        startQuestion2();
    }
}
const question2pic1 = document.getElementById('question2image1');
const question2pic2 = document.getElementById('question2image2');
const question2pic3 = document.getElementById('question2image3');
const question2pic4 = document.getElementById('question2image4');
const question2pic5 = document.getElementById('question2image5');
const question2pic6 = document.getElementById('question2image6');
const question2pic7 = document.getElementById('question2image7');
const question2pic8 = document.getElementById('question2image8');
const imageblock = document.getElementById('question2start');
const images = [question2pic1,question2pic2, question2pic3, question2pic4, question2pic5, question2pic6, question2pic7, question2pic8];
const orientations = ['upright', 'upside-down', 'rotated-left', 'rotated-right'];
let correctOrientaitons = [];

function startQuestion2(){
    for(let i = 0; i<images.length; i++){
        const imageOrientation = orientations[Math.floor(Math.random() * orientations.length)];
        images[i].style.transform  = `rotate(${getRotationDegrees(imageOrientation)}deg)`;
        correctOrientaitons.push(imageOrientation);
    }
    imageblock.style.display = 'block';
    imageblock.style.display = 'flex';
    imageblock.style.justifyContent = 'center';
    imageblock.style.flexDirection = 'column';
    imageblock.style.textAlign = 'center';

}
function getRotationDegrees(orientation) {
    switch (orientation) {
        case 'upright':
            return 0;
        case 'upside-down':
            return 180;
        case 'rotated-left':
            return 270;
        case 'rotated-right':
            return 90;
        default:
            return 0;
    }
}

const nextq2 = document.getElementById('nextq2');

nextq2.addEventListener('click', function() {
    imageblock.innerHTML = '';
    createMemoryQuestion();

})

let questionsAnswered = 0;
const br = document.createElement('br');
const optionsContainer = document.getElementById('options-container');
const imageSrcs = ["./assets/question2pic1.png", "./assets/question2pic2.png", "./assets/question2pic3.png","./assets/question2pic4.png", "./assets/question2pic5.png", "./assets/question2pic6.png", "./assets/question2pic7.png", "./assets/question2pic8.png"];
function createMemoryQuestion(){
    const question2txt = document.createElement('p');
    question2txt.textContent = 'Please select the correct orientation of this image?';
    question2txt.classList.add("instructions");
    optionsContainer.appendChild(question2txt);
    optionsContainer.appendChild(br);


    const imageIndex = Math.floor(Math.random()*8);
    const image = images[imageIndex];
    const correctOrientaiton = correctOrientaitons[imageIndex];
    const display_options = document.createElement('div');
    optionsContainer.appendChild(display_options);
    display_options.id = "display-options";
    orientations.forEach((orientation) =>{
        const optionImage = document.createElement('img');
        optionImage.src = imageSrcs[imageIndex];
        optionImage.alt = orientation;
        optionImage.className = "rotation-image";
        optionImage.style.transform = `rotate(${getRotationDegrees(orientation)}deg)`;
        optionImage.style.maxHeight = "100px";
        optionImage.addEventListener('click', () => checkAnswer2(orientation, correctOrientaiton));
        display_options.appendChild(optionImage);
        
    })

    function checkAnswer2(selectedOrientation, correctOrientation) {
        if (selectedOrientation === correctOrientation) {
            console.log('Correct! The image is in the correct orientation.');
            score++;
        } else {
            console.log('Incorrect. Please try again.');
        }
        questionsAnswered++;
        console.log(questionsAnswered);
        if (questionsAnswered == 3){
            optionsContainer.innerHTML = '';
            startQuestion3();
        }else{
            console.log("enetered if statement");
            optionsContainer.innerHTML = '';
            createMemoryQuestion();
        }
    }


    const items = ["bell", "spoon", "ring", "can", "cat"]
    const items_url = ["./assets/question3pic1.png","./assets/question3pic2.png","./assets/question3pic3.png","./assets/question3pic4.png","./assets/question3pic5.png"]
    const question3div = document.getElementById('question3');
    const nextq3 = document.createElement('button');
    function startQuestion3(){
        question3div.style.display = 'block';
        const prompt = document.createElement('p');
        prompt.textContent = "Given the picture below choose the match.";
        prompt.classList.add("instructions");
        question3div.appendChild(prompt);
        generateQuestion3();
       
        
    }

    function generateQuestion3(){
        const newquestionbox = document.createElement('div');
        question3div.appendChild(newquestionbox);
        newquestionbox.classList.add("newQuestionBox");
        const randomIndex = Math.floor(Math.random()*5);
        const correctItem = items[randomIndex];
        const correctURL = items_url[randomIndex];

        const itemImage = document.createElement('img');
        itemImage.src = correctURL;
        itemImage.style.maxHeight = '150px';
        newquestionbox.style.textAlign = 'center';
        newquestionbox.appendChild(itemImage);
        newquestionbox.appendChild(br)
        newquestionbox.appendChild(br)

        const wrongAnswers = items
        .filter(word => word !== correctItem) // Exclude the correct answer
        .sort(() => Math.random() - 0.5) // Shuffle the array
        .slice(0, 3);

        const optionsContainer2 = document.createElement('div');
        optionsContainer2.id = 'optionscontainer2';
        newquestionbox.appendChild(optionsContainer2);
        const options = [correctItem, ...wrongAnswers].sort(() => Math.random() - 0.5);
        options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('optionButton');
            button.addEventListener('click', () => checkAnswer3(option, correctItem, newquestionbox));
            optionsContainer2.appendChild(button);
        });
        newquestionbox.appendChild(br)
        
    }
    let totalquestions3 = 0;

    function checkAnswer3(selectedAnswer, correctAnswer, newQuestionBox) {
        if (selectedAnswer == correctAnswer){
            score++;
        }
        totalquestions3++;
        if (totalquestions3 < 3){
            newQuestionBox.innerHTML = '';
            generateQuestion3();
        }else{
            startQuestion4();
        }
    }
    const scoretxt = document.getElementById("scoreTxt");
    const question4div = document.getElementById("question4");
    function startQuestion4(){
        question3div.innerHTML = '';
        scoretxt.style.display = 'block';
        const scorebox = document.createElement('p');
        scorebox.classList.add("score");
        const finalscore = (score/10)*100;
        scorebox.innerHTML = finalscore;
        question4div.appendChild(scorebox);


    }

}