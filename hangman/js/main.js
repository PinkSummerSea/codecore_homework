const wordsCollection = ['princess', 'apple', 'witch', 'prince', 'queen', 'king', 'forest', 'sword', 'dwarf', 'snow', 'white', 'castle', 'crown', 'marriage', 'battle']

const randomWord = wordsCollection[Math.floor(Math.random() * wordsCollection.length)]

const answer = randomWord

console.log(answer)

const lettersContainer = document.querySelector('.letters-container')
const singleLetters = lettersContainer.querySelectorAll('.single-letter')
const hangmanImg =  document.querySelector('.hangman-img')
const answerContainer = document.querySelector('.answer-container')
const answerChar = document.createElement('div');
answerChar.setAttribute('class', 'answer-letter')

for (let i = 1; i <= answer.length; i++) {
    answerContainer.innerHTML += answerChar.outerHTML
}

function findAllIndices(element, arr) {
    const indices = [];
    let idx = arr.indexOf(element);
    while (idx != -1) {
        indices.push(idx);
        idx = arr.indexOf(element, idx + 1)
    }
    return indices;
}

let guess = 1;
let leftLength = answer.length;
let clickedLetters = [];


function eventHandler(event, clickedLetter){
    if(clickedLetters.indexOf(clickedLetter) == -1){
        clickedLetters.push(clickedLetter);
        if(event.target.tagName=='DIV') {
            event.target.style.backgroundColor = 'hotpink';
            event.target.style.borderColor = 'hotpink';
            event.target.style.color = 'white';
        }
        if(event.target.tagName=='BODY'){
            singleLetters.forEach(singleLetter => {
                if(singleLetter.id == `letter-${clickedLetter}`){
                    singleLetter.style.backgroundColor = 'hotpink';
                    singleLetter.style.borderColor = 'hotpink';
                    singleLetter.style.color = 'white';
                }
            })
        }
        
        const indices = findAllIndices(clickedLetter, answer);
        
        if(indices.length > 0){
            leftLength -= indices.length;
            indices.forEach(index => {
                document.querySelector(`.answer-container :nth-child(${index + 1})`).innerText = clickedLetter
            })
            if(leftLength == 0) {
                const audio = new Audio('sound/crowd-cheering.wav');
                setTimeout(function(){audio.play(), alert("Congratulations! You win!"), location.reload()}, 200)
                // tried the approach below but doesn't work after adding sound
                
                // requestAnimationFrame(() => {  
                //     requestAnimationFrame(() => {
                //         alert("Congratulations! You win!");
                //         location.reload()
                //     });
                // });
            }
        } else {
            switch(guess) {
                case 1:
                    hangmanImg.setAttribute('src', 'images/gallows+head.jpg')
                    break;
                case 2:
                    hangmanImg.setAttribute('src', 'images/gallows+head+torso.jpg')
                    break;
                case 3:
                    hangmanImg.setAttribute('src', 'images/gallows+head+torso+leg.jpg')
                    break;
                case 4:
                    hangmanImg.setAttribute('src', 'images/gallows+head+torso+2leg.jpg')
                    break;
                case 5:
                    hangmanImg.setAttribute('src', 'images/gallows+head+torso+2leg+arm.jpg')
                    break;
                case 6:
                    hangmanImg.setAttribute('src', 'images/gallows+head+torso+2leg+2arm.jpg')
                    const audio = new Audio('sound/kid-sobbing.wav')
                    setTimeout(function(){audio.play(), alert("Better luck next time..."), location.reload()}, 200)  
                    break;
                default:
                    break;
            }
            guess++
        } 
    } else {
        document.querySelector('.notice').innerText = "You can only click or type each letter once!"
        setTimeout(function(){document.querySelector('.notice').innerText = ""}, 4000)
    }
}

singleLetters.forEach(letter => {
    letter.addEventListener('click', event => {
        const clickedLetter = event.target.id.slice(-1);
        eventHandler(event, clickedLetter)
    })
})

document.addEventListener('keyup', event => {
    const clickedLetter = event.key;
    eventHandler(event, clickedLetter)
})