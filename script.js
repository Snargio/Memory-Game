const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"



startGame();

 function startGame() {
      initializeCards(game.createCardsFromTechs());
 }

function initializeCards(cards) {
   let gameBoard = document.getElementById("gameBoard");
   gameBoard.innerHTML = '';
   game.cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement);
    })

}


function createCardContent(card, cardElement){

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {
    
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === FRONT){
        let iconElemente = document.createElement('img');
        iconElemente.classList.add(ICON);
        iconElemente.src = "./src/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElemente);
    } else{
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}



function flipCard() {

 if( game.setCard(this.id)){
     this.classList.add("flip");
     if(game.secondCard){

    
    if( game.checkMatch()){
        game.clearcards();
        if(game.checkGamerOver()){
           let  gamerOverLayer = document.getElementById("gameOver");
           gamerOverLayer.style.display = 'flex';
        }
    }else{
         setTimeout(()=>{

         let firstCardView = document.getElementById(game.firstCard.id);
         let secondCard = document.getElementById(game.secondCard.id)
      
         firstCardView.classList.remove('flip')
         secondCard.classList.remove('flip')
         game.unflipCards();
        }, 1000);
      };
    }
   }
 }


 function restart() {
     game.clearcards();
    startGame();
    let  gamerOverLayer = document.getElementById("gameOver");
           gamerOverLayer.style.display = 'none';
 }