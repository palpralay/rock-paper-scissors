let userScore = 0;
      let computerScore = 0;
      const userScore_p = document.getElementById("your-score");
      const computerScore_p = document.getElementById("computer-score");
      const choices = document.querySelectorAll(".choice");
      const msg = document.getElementById("msg");
      const playerResultImg = document.querySelector('#player-result img');
      const computerResultImg = document.querySelector('#computer-result img');
      const resetBtn = document.getElementById('reset-btn');

      const getResultMessage = (playerChoice, computerChoice, userWin) => {
        const combinations = {
          rock: { beats: 'scissors', verb: 'crushes' },
          paper: { beats: 'rock', verb: 'covers' },
          scissors: { beats: 'paper', verb: 'cut' }
        };

        if (userWin) {
          return `${playerChoice} ${combinations[playerChoice].verb} ${computerChoice}! You win!`;
        }
        return `${computerChoice} ${combinations[computerChoice].verb} ${playerChoice}! You lose!`;
      };

      const drawGame = (playerChoice) => {
        msg.textContent = `Both chose ${playerChoice}. It's a draw!`;
        msg.style.color = '#2c3e50';
      };

      const showWinner = (playerChoice, computerChoice, userWin) => {
        const resultMessage = getResultMessage(playerChoice, computerChoice, userWin);
        
        if (userWin) {
          userScore++;
          userScore_p.textContent = userScore;
          msg.style.color = 'green';
        } else {
          computerScore++;
          computerScore_p.textContent = computerScore;
          msg.style.color = 'red';
        }
        
        msg.textContent = resultMessage;
        checkGameWinner();
      };

      const gencomputerChoice = () => {
        const options = ["rock", "paper", "scissors"];
        const randomIdx = Math.floor(Math.random() * 3);
        return options[randomIdx];
      };

      const determineWinner = (player, computer) => {
        const winConditions = {
          rock: 'scissors',
          paper: 'rock',
          scissors: 'paper'
        };
        return winConditions[player] === computer;
      };

      const playGame = (playerChoice) => {
        playerResultImg.src = `img/${playerChoice}.png`;
        playerResultImg.classList.add('shake');

        const computerChoice = gencomputerChoice();
        computerResultImg.src = `img/${computerChoice}.png`;
        computerResultImg.classList.add('shake');

        [playerResultImg, computerResultImg].forEach(img => {
          img.addEventListener('animationend', () => {
            img.classList.remove('shake');
          }, { once: true });
        });

        if (playerChoice === computerChoice) {
          drawGame(playerChoice);
        } else {
          const userWin = determineWinner(playerChoice, computerChoice);
          showWinner(playerChoice, computerChoice, userWin);
        }
      };

      resetBtn.addEventListener('click', () => {
        userScore = 0;
        computerScore = 0;
        userScore_p.textContent = '0';
        computerScore_p.textContent = '0';
        msg.textContent = 'Play your move!';
        msg.style.color = '#2c3e50';
        playerResultImg.src = 'img/question.png';
        computerResultImg.src = 'img/question.png';
      });

      const checkGameWinner = () => {
        if (userScore === 5 || computerScore === 5) {
          const winner = userScore === 5 ? 'You' : 'Computer';
          msg.textContent = `${winner} won the game! ${winner === 'You' ? '🎉' : '😢'}`;
          userScore = 0;
          computerScore = 0;
          setTimeout(() => {
            userScore_p.textContent = '0';
            computerScore_p.textContent = '0';
            playerResultImg.src = 'img/question.png';
            computerResultImg.src = 'img/question.png';
          }, 2000);
        }
      };

      choices.forEach((choice) => {
        choice.addEventListener("click", () => {
          const playerChoice = choice.getAttribute("id");
          playGame(playerChoice);
        });
      });