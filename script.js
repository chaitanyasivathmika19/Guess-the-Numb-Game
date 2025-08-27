let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const attemptsLeft = document.getElementById("attemptsLeft");
const resetBtn = document.getElementById("resetBtn");
const feedbackForm = document.getElementById("feedbackForm");

submitBtn.addEventListener("click", () => {
  const guess = Number(guessInput.value);
  const diff = Math.abs(secretNumber - guess);

  if (!guess || guess < 1 || guess > 100) {
    message.innerHTML = "⚠️ Enter a number between 1 and 100!";
    return;
  }

  attempts--;

  if (guess === secretNumber) {
    message.innerHTML = `🎯 Correct! The number was <strong>${secretNumber}</strong> <br> 🎉 You Win!`;
    endGame("win");
  } else if (diff === 1) {
    message.innerHTML = guess < secretNumber
      ? "🔥 So close, just a bit low!"
      : "🔥 So close, just a bit high!";
  } else if (diff <= 3) {
    message.innerHTML = guess < secretNumber
      ? "💡 Close! Try a bit higher."
      : "💡 Close! Try a bit lower.";
  } else if (guess < secretNumber) {
    message.innerHTML = "📉 Too low!";
  } else {
    message.innerHTML = "📈 Too high!";
  }

  message.classList.add("shake");
  setTimeout(() => message.classList.remove("shake"), 300);

  attemptsLeft.innerHTML = `🔁 Attempts left: <strong>${attempts}</strong>`;

  if (attempts === 0 && guess !== secretNumber) {
    message.innerHTML = `💀 Game Over! The number was <strong>${secretNumber}</strong> <br> 😢 Better luck next time!`;
    endGame("lose");
  }

  guessInput.value = "";
});

resetBtn.addEventListener("click", () => {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 10;
  message.innerHTML = "";
  attemptsLeft.innerHTML = "";
  guessInput.value = "";
  submitBtn.disabled = false;
  guessInput.disabled = false;
  resetBtn.style.display = "none";
  feedbackForm.style.display = "none";
  document.body.classList.remove("win-bg", "lose-bg");
});

function endGame(status) {
  submitBtn.disabled = true;
  guessInput.disabled = true;
  resetBtn.style.display = "inline-block";

  if (status === "win") {
    document.body.classList.add("win-bg");
  } else if (status === "lose") {
    document.body.classList.add("lose-bg");
  }

  //feedback form after game ends
  feedbackForm.style.display = "block";
}


// thank you message
document.querySelectorAll('.feedback-option').forEach(option => {
  option.addEventListener('click', () => {
    option.parentElement.innerHTML = `<p>✅ Thank you for your feedback!</p>`;
  });
});
