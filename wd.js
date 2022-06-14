console.log('Hello world');

let letters = [];
let rightLetters = ['H','O','R','S','E'];

function addLetter(letter, index) {
    letters[index] = letter;
}

function removeItem() {
    letters.pop()
}

document.addEventListener('keyup', function(event){
    if (event.key == 'Backspace') {
        removeItem()
    } else {
        letters.push(event.key.toUpperCase())
    }
    updateLetters();
    // console.log('keyup');
});

function updateLetters(){
    for (let element of document.getElementsByClassName('box')) {
        // reset, delete the previous content
        element.innerHTML = ''
        element.classList.remove('right')
        element.classList.remove('wrong')
        element.classList.remove('halfRight') 
    }
    
    for (let index = 0; index < letters.length; index++) {
        const element = letters[index];
        document.getElementById(index).innerHTML = element
       
        if(letters[index] == rightLetters[index]) {
            document.getElementById(index).classList.add('right')
        } else if(rightLetters.includes(letters[index])){
            document.getElementById(index).classList.add('halfRight')
        }
        else {
            document.getElementById(index).classList.add('wrong')
        }
        
    }
}