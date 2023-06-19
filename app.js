document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid');
    const width = 8;
    const squares = [];
    let score = 0;
    const scoreDisplay = document.getElementById('score')

    const candyColours = [
        'url(images/apple.png)',
        'url(images/banana.png)',
        'url(images/kiwi.png)',
        'url(images/black.png)',
        'url(images/mango.png)',
        'url(images/strawberry.png)'
    ]

    // create a board 
    
    function createBoard() {
        for(let i = 0 ; i< width*width;i++){
            const square = document.createElement('div');
            square.setAttribute('draggable','true');
            square.setAttribute('id',i);
            let randomColor = Math.floor(Math.random()* candyColours.length)
            square.style.backgroundImage = candyColours[randomColor]
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard()

    //drag the candies 

let colorBeingDragged
let colorBeingReplced
let squareBeingDropped
let squareBeingReplaced

    squares.forEach(square => square.addEventListener("dragstart",dragStart))
    squares.forEach(square => square.addEventListener("dragend",dragEnd))
    squares.forEach(square => square.addEventListener("dragover",dragOver))
    squares.forEach(square => square.addEventListener("dragenter",dragEnter))
    squares.forEach(square => square.addEventListener("dragleave",dragLeave))
    squares.forEach(square => square.addEventListener("drop",dragDrop))

    function dragStart(){
        colorBeingDragged = this.style.backgroundImage
        console.log(this.id,'dragstart')
        console.log(colorBeingDragged )
        squareBeingDropped = parseInt(this.id)

    }
    function dragEnd(){
        console.log(this.id,'dragend')

        let validMoves = [
            squareBeingDropped-1,
            squareBeingDropped+width,
            squareBeingDropped-width,
            squareBeingDropped+1
        ]
        let validMove = validMoves.includes(squareBeingReplaced)

        if(squareBeingReplaced && validMove){
            squareBeingReplaced = null
        }else if(squareBeingReplaced && !validMove){
            squares[squareBeingReplaced].style.backgroundImage = colorBeingReplced
            squares[squareBeingDropped].style.backgroundImage = colorBeingDragged
        }else squares[squareBeingDropped].style.backgroundImage = colorBeingDragged
    }
    function dragOver(e){
        e.preventDefault()
        console.log(this.id,'dragover')
    }
    function dragEnter(e){
        e.preventDefault()
        console.log(this.id,'dragenter')
    }
    function dragLeave(){
        console.log(this.id,'dragleave')
    }
    function dragDrop(){
        console.log(this.id,'dragdrop')
        colorBeingReplced = this.style.backgroundImage
        squareBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareBeingDropped].style.backgroundImage = colorBeingReplced
    }


function checkForRowThree() {
    for (let i = 0 ;i<61;i++){
        let rowForThree = [i,i+1,i+2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlanck = squares[i].style.backgroundImage === ''  
        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
        
        if (notValid.includes(i)) continue
        
        if (rowForThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlanck)){
            score += 3 
            scoreDisplay.innerHTML = score
            rowForThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkForRowThree()

function checkForColumnThree() {
    for (let i = 0 ;i<47;i++){
        let columnForThree = [i,i+width,i+width*2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlanck = squares[i].style.backgroundImage === ''  
        
        if (columnForThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlanck)){
            score += 3 
            scoreDisplay.innerHTML = score
            columnForThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkForColumnThree()

function checkForRowFour() {
    for (let i = 0 ;i<60;i++){
        let rowForFour = [i,i+1,i+2,i+3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlanck = squares[i].style.backgroundImage === ''  
        const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
        
        if (notValid.includes(i)) continue
        
        if (rowForFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlanck)){
            score += 4 
            scoreDisplay.innerHTML = score
            rowForFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkForRowFour()

function checkForColumnFour() {
    for (let i = 0 ;i<47;i++){
        let columnForFour = [i,i+width,i+width*2,i+width*3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlanck = squares[i].style.backgroundImage === ''  
        
        if (columnForFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlanck)){
            score += 3 
            scoreDisplay.innerHTML = score
            columnForFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}

checkForColumnFour()


function moveDown(){
    for (i = 0; i<55;i++){
        if(squares[i+width].style.backgroundImage === ''){
            squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && squares[i].style.backgroundImage === ""){
                let randomColor = Math.floor(Math.random()*candyColours.length)
                squares[i].style.backgroundImage = candyColours[randomColor]
            }
        }
    }
}




window.setInterval(function(){
    moveDown()
    checkForRowThree()
    checkForColumnThree()
    checkForRowFour()
    checkForColumnFour()
    
},100)


})

