import random


def display_menu():
    print("Welcome to the Number Guessing Game! \n I'm thinking of a number between 1 and 100. \n You have 5 chances to guess the correct number.")

def easy():
    print("Great! You have selected the Easy difficulty level. \nLet's start the game!")
    rand_number = random.randint(1, 100)
    attempt = 0
    max_attempts = 10

    while attempt < max_attempts:
        guess = int(input("Enter your guess: "))
        attempt += 1
        
        if guess < 1 or guess > 100:
            print("Please enter a number between 1 and 100.")
            continue
        
        if guess < rand_number:
            print("Incorrect! The number is greater than", guess)
        elif guess > rand_number:
            print("Incorrect! The number is less than", guess)
        else:
            print(f"Congratulations! You guessed the correct number in {attempt} attempts.")
            break
    else:
        print(f"Sorry! You've used all {max_attempts} attempts. The correct number was {rand_number}.")
        
        
def medium():
    print("Great! You have selected the Medium difficulty level. \nLet's start the game!")
    rand_number = random.randint(1, 100)
    attempt = 0
    max_attempts = 5

    while attempt < max_attempts:
        guess = int(input("Enter your guess: "))
        attempt += 1
        
        if guess < 1 or guess > 100:
            print("Please enter a number between 1 and 100.")
            continue
        
        if guess < rand_number:
            print("Incorrect! The number is greater than", guess)
        elif guess > rand_number:
            print("Incorrect! The number is less than", guess)
        else:
            print(f"Congratulations! You guessed the correct number in {attempt} attempts.")
            break
    else:
        print(f"Sorry! You've used all {max_attempts} attempts. The correct number was {rand_number}.")

def hard():
    print("Great! You have selected the Hard difficulty level. \nLet's start the game!")
    rand_number = random.randint(1, 100)
    attempt = 0
    max_attempts = 3

    while attempt < max_attempts:
        guess = int(input("Enter your guess: "))
        attempt += 1
        
        if guess < 1 or guess > 100:
            print("Please enter a number between 1 and 100.")
            continue
        
        if guess < rand_number:
            print("Incorrect! The number is greater than", guess)
        elif guess > rand_number:
            print("Incorrect! The number is less than", guess)
        else:
            print(f"Congratulations! You guessed the correct number in {attempt} attempts.")
            break
    else:
        print(f"Sorry! You've used all {max_attempts} attempts. The correct number was {rand_number}.")


def get_difficulty_level():
    while True:
        try:
            print("Please select the difficulty level: \n 1. Easy (10 chances) \n 2. Medium (5 chances) \n 3. Hard (3 chances)")
            select = int(input("Select the Level of the Game (1/2/3): "))
            if select in {1, 2, 3}:
                return select
            else:
                print("Invalid choice. Please select 1, 2, or 3.")
        except ValueError:
            print("Invalid input. Please enter a number.")

def selection():
    level = get_difficulty_level()
    if level == 1:
        easy()
    elif level == 2:
        medium()
    elif level == 3:
        hard()

def main():
    display_menu()
    selection()

if __name__ == "__main__":
    main()