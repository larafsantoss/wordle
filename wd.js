console.log('Hello world');
// create a number of attempts
let userAttempt = 1;
let userChoice = [];
let computerChoice = generateWord();

console.log(computerChoice)

function generateWord(){
    const words = [
        ['G','O','O','S','E'],
        ['H','O','R','S','E'],
        ['C','L','O','W','N'],
        ['E','I','G','H','T'],
        ['A','N','G','E','R']
    ]
    return words[Math.floor(Math.random() * 5)]
}

// That's the way I found to delete the userChoice with backspace
function removeItem() {
    userChoice.pop()
}

document.addEventListener('keyup', function(event){
    
    if (event.key == 'Backspace') {
    removeItem() 
    } if (event.key.match(/^[A-Za-z]$/)){
        userChoice.push(event.key.toUpperCase())
    }
    updateLetters();
});

// SHOWING THE LETTER'S TYPED IN THE SQUARES

function updateLetters(){
    for(let index = 0; index < 5; index++){
        const box = document.getElementById(index)
        box.innerHTML = ''
        box.classList.remove('right')
        box.classList.remove('wrong')
        box.classList.remove('halfRight') 
    }
    
    for (let index = 0; index < userChoice.length; index++) {
        const box = document.getElementById(index)

// THE LETTER RESULT (GREEN, YELLOW, GREY) COMES UP BY THE SAME TIME OF EACH TYPING - NOT AFTER THE USER TYPES THE WHOLE WORD
        
        // Counting how many letters of computerChoice has in userChoice / Matching contanbdo todas as ocorrencias em computerChoice
        let lettersCounter = computerChoice.filter(a => a == userChoice[index]).length
        const userLetter = userChoice[index];
        box.innerHTML = userLetter
        
        // creating another array with userChoice (fixed array)
        let userCounter = [...userChoice].slice(0, index).filter(a => a == userChoice[index]).length

        
        if(userChoice[index] === computerChoice[index]) {

        // * Checking if the user already typed the letter / Creating an IF for words that have double letters
           
            if(userCounter >= lettersCounter) {
                // indexOf checks the first item
                const fixingStyle = document.getElementById(userChoice.indexOf(userLetter))
                fixingStyle.classList.remove('halfRight')
                fixingStyle.classList.add('wrong')
            }

            
            box.classList.add('right')
            // verificando se a quantidade de ocorrencias ate agora e menor que a quantidade total de ocorrencias em computerChoice ver se ja foi encontrando anteriormente mas se nao for suficiente. ex. duas vezes a letra o e o usuario sigitou uma so, ta faltando uma vez
        } else if(computerChoice.includes(userChoice[index]) && (userCounter < lettersCounter)) {
            box.classList.add('halfRight')
            // console.log(userCounter, 'userCounter')
            // console.log(lettersCounter, 'lettersCounter')
        }
        else {
            box.classList.add('wrong')
        }
        
    }
    if (userChoice.length > 4){
        if (computerChoice.join('') == userChoice.join('')){
            // found this way to delay my function and show the message after the last letter
            setTimeout(() => {
                document.getElementById('message').innerHTML = 'YAY! You win! The word is ' + computerChoice.join('') + '!'
            }, 100);
            
            return;
        }
        if(userAttempt > 5){
            document.getElementById('message').innerHTML = 'LOSER! The right word is ' + computerChoice.join('') + '!'
            document.removeEventListener('keyup')
            return;
        }
        resetBoxes()
        userAttempt++
    }
}
function resetBoxes() {
    let boxes = document.getElementsByClassName('box');
    for (let element of boxes) {
        element.removeAttribute('id')
    }
    let container = document.getElementById('container')
    let parentGrid = document.createElement('div')
    parentGrid.className = 'parentGrid'
    parentGrid.innerHTML = `<div id="0" class="box"></div>
    <div id="1" class="box"></div>
    <div id="2" class="box"></div>
    <div id="3" class="box"></div>
    <div id="4" class="box"></div>`
    container.appendChild(parentGrid)
    userChoice = []
}