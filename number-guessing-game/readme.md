# Number Guessing Game

Sample solution for the [number-guessing-game](https://roadmap.sh/projects/number-guessing-game) challenge from [roadmap.sh](https://roadmap.sh/).

Simple Number Guessing Game based on CLI written in Python.

## Features

- Guess the numbers based on user inputs.
- Random numbers are generated in between `1 - 100` via python's Random module.
- Can be able to select the difficulty of Guessing based on attempts.

## Prerequistes

- Python should be installed on your system.

## Installation

**Clone the Repository**

   ```bash
   git clone --depth=1 https://github.com/Aj-Seven/backend-projects

   # Navigate to the project Directory
   cd backend-projects/number-guessing-game
   ```

## Usage

```bash
   python number-guess.py
```

### Sample

```text
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 5 chances to guess the correct number.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)

Enter your choice: 2

Great! You have selected the Medium difficulty level.
Let's start the game!

Enter your guess: 50
Incorrect! The number is less than 50.

Enter your guess: 25
Incorrect! The number is greater than 25.

Enter your guess: 35
Incorrect! The number is less than 35.

Enter your guess: 30
Congratulations! You guessed the correct number in 4 attempts.
```

