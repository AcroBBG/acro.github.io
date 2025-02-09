document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("memory-board")) startMemoryGame();
    if (document.getElementById("heart-container")) startClickGame();
    if (document.getElementById("word-search-board")) startWordSearchGame();
    if (document.getElementById("scramble-container")) startScrambleGame();

    function startMemoryGame() {
        const board = document.getElementById("memory-board");
        const emojis = ["❤️", "💖", "💙", "💛", "❤️", "💖", "💙", "💛"];
        let shuffled = emojis.sort(() => Math.random() - 0.5);
        let selected = [];
        let matches = 0;
        board.innerHTML = "";
        shuffled.forEach(emoji => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.dataset.value = emoji;
            card.innerHTML = "?";
            card.onclick = () => flipCard(card);
            board.appendChild(card);
        });

        function flipCard(card) {
            if (selected.length < 2 && !card.classList.contains("matched")) {
                card.innerHTML = card.dataset.value;
                selected.push(card);
            }
            if (selected.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }

        function checkMatch() {
            if (selected[0].dataset.value === selected[1].dataset.value) {
                selected.forEach(card => card.classList.add("matched"));
                matches++;
                if (matches === emojis.length / 2) {
                    document.getElementById("next-memory").classList.remove("hidden");
                }
            } else {
                selected.forEach(card => (card.innerHTML = "?"));
            }
            selected = [];
        }
    }

    function startClickGame() {
        const heartContainer = document.getElementById("heart-container");
        let score = 0;
        heartContainer.innerHTML = "";
        for (let i = 0; i < 10; i++) {
            let heart = document.createElement("div");
            heart.classList.add("heart");
            heart.style.left = Math.random() * 90 + "%";
            heart.style.top = Math.random() * 80 + "%";
            heart.onclick = () => {
                heart.remove();
                score++;
                document.getElementById("click-score").textContent = score;
                if (score === 10) {
                    document.getElementById("next-click").classList.remove("hidden");
                }
            };
            heartContainer.appendChild(heart);
        }
    }

    function startWordSearchGame() {
        document.getElementById("word-search-board").textContent = "[Word Search Grid Placeholder]";
        setTimeout(() => document.getElementById("next-wordsearch").classList.remove("hidden"), 5000);
    }

    function startScrambleGame() {
        const words = ["love", "forever", "together", "valentine"];
        const word = words[Math.floor(Math.random() * words.length)];
        const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
        document.getElementById("scramble-container").textContent = scrambled;

        document.getElementById("scramble-submit").onclick = () => {
            let input = document.getElementById("scramble-input").value.toLowerCase();
            if (input === word) {
                document.getElementById("scramble-feedback").textContent = "Correct!";
                document.getElementById("next-scramble").classList.remove("hidden");
            } else {
                document.getElementById("scramble-feedback").textContent = "Try again!";
            }
        };
    }
});
