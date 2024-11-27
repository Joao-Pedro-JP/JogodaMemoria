const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.emoji;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedPairs++;
        if (matchedPairs === emojis.length) {
            alert('Parabéns! Você venceu!');
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }
    flippedCards = [];
}

function initGame() {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    cards = shuffleCards(cards);
    cards.forEach(emoji => {
        const card = createCard(emoji);
        gameBoard.appendChild(card);
    });
}

restartBtn.addEventListener('click', initGame);

initGame();