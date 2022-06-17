console.log('Hello world');
// counter e a quantidade de tentativas
let counter = 1;
let letters = [];
let rightLetters = generateWord();

function generateWord(){
    const words = [
        ['G','O','O','S','E'],
        ['A','A','A','A','A'],
        ['B','B','B','B','B'],
        ['C','C','C','C','C'],
        ['D','D','D','D','D']
    ]
    return words[Math.floor(Math.random() * 5)]
}
function addLetter(letter, index) {
    letters[index] = letter;
}

function removeItem() {
    letters.pop()
}

document.addEventListener('keyup', function(event){
    
    if (event.key == 'Backspace') {
    removeItem() }
    if (event.key.match(/^[A-Za-z]$/)){
        letters.push(event.key.toUpperCase())
        updateLetters();
    }
    
    // console.log('keyup');
})

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
        
        const element = letters[index];
        box.innerHTML = element
       
        if(letters[index] === rightLetters[index]) {
            // troquei por uma variavel boxes p receber todos os elementos da classe box
            box.classList.add('right')
            
        } else if(rightLetters.includes(letters[index])){
            box.classList.add('halfRight')
        }
        else {
            box.classList.add('wrong')
        }
        
    }
    if (letters.length > 4){
        if (rightLetters.join('') == letters.join('')){
            // function que recebe uma fucnao pra ser executada e ele define um tempo para que ela seja executada.
            setTimeout(() => {
                alert('Great! that is the right WORD!')
            }, 100);
            
            return;
        }
        if(counter > 5){
            alert('LOSER!The right word is HORSE')
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