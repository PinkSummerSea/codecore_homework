
const answer = "princess"

const lettersContainer = document.querySelector('.letters-container')
const singleLetters = lettersContainer.querySelectorAll('.single-letter')
const hangmanImg =  document.querySelector('.hangman-img')

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

singleLetters.forEach(letter => {
    letter.addEventListener('click', event => {
        event.target.style.backgroundColor = 'hotpink';
        event.target.style.borderColor = 'hotpink';
        event.target.style.color = 'white';
        const indices = findAllIndices(event.target.id.slice(-1), answer);
        
        if(indices.length > 0){
            leftLength -= indices.length;
            indices.forEach(index => {
                document.querySelector(`.answer-container :nth-child(${index + 1})`).innerText = event.target.id.slice(-1)
            })
            if(leftLength == 0) {
                setTimeout(function(){alert("Congratulations! You win!")}, 100) 
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
                    setTimeout(function(){alert("Better luck next time...")}, 100) 
                    break;
                default:
                    break;
            }
            guess++
        } 

        
    })
})