console.log('Hello world');
// create a number of attempts
let counter = 1;
let letters = [];
let rightLetters = generateWord();

console.log(rightLetters)

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

// That's the way I found to delete the letters with backspace
function removeItem() {
    letters.pop()
}

document.addEventListener('keyup', function(event){
    
    if (event.key == 'Backspace') {
    removeItem() 
    } if (event.key.match(/^[A-Za-z]$/)){
        letters.push(event.key.toUpperCase())
   
    }
    updateLetters();
    // console.log(removeItem());
});

function updateLetters(){
    for(let index = 0; index < 5; index++){
        const box = document.getElementById(index)
        box.innerHTML = ''
        box.classList.remove('right')
        box.classList.remove('wrong')
        box.classList.remove('halfRight') 
    }
    
    for (let index = 0; index < letters.length; index++) {
        const box = document.getElementById(index)
        
        // to contanbdo todas as ocorrencias em rightletters
        let lettersCounter = rightLetters.filter(a => a == letters[index]).length
        const element = letters[index];
        box.innerHTML = element
        // create another array with letters elements + contando todas as ococrrencias ate agora em letters
        let userCounter = [...letters].slice(0, index).filter(a => a == letters[index]).length

        if(letters[index] === rightLetters[index]) {
            // verif se teve alguma outra vez que eu digitei mas ela tava na posicao errada
            if(userCounter >= lettersCounter) {
                // indexOf da o indice do primeiro elemento que seja igual ao parametro que foi passado (element)
                const item = document.getElementById(letters.indexOf(element))
                item.classList.remove('halfRight')
                item.classList.add('wrong')
            }
            // troquei por uma variavel boxes p receber todos os elementos da classe box
            box.classList.add('right')
            // verificando se a quantidade de ocorrencias ate agora e menor que a quantidade total de ocorrencias em rightletters ver se ja foi encontrando anteriormente mas se nao for suficiente. ex. duas vezes a letra o e o usuario sigitou uma so, ta faltando uma vez
        } else if(rightLetters.includes(letters[index]) && (userCounter < lettersCounter)) {
            box.classList.add('halfRight')
            // console.log(userCounter, 'userCounter')
            // console.log(lettersCounter, 'lettersCounter')
        }
        else {
            box.classList.add('wrong')
        }
        
    }
    if (letters.length > 4){
        if (rightLetters.join('') == letters.join('')){
            // found this way to delay my function and show the message after the last letter
            setTimeout(() => {
                document.getElementById('message').innerHTML = 'YAY! You win! The word is ' + rightLetters.join('') + '!'
            }, 100);
            
            return;
        }
        if(counter > 5){
            document.getElementById('message').innerHTML = 'LOSER! The right word is ' + rightLetters.join('') + '!'
            document.removeEventListener('keyup')
            // usa o return para ignorar as linhas abaixo dele
            return;
        }
        resetBoxes()
        counter++
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
    letters = []
}