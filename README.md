# Mario Game

This is a simple Mario-style platformer game built with HTML5 and JavaScript. The game features a player character that can move left, right, and jump across platforms. The goal is to navigate through the levels and avoid falling off the screen.

## Features

- **Player Movement**: Move the player character left and right using arrow keys, and jump using the up arrow key.
- **Platform Interaction**: The player can stand on and jump between platforms.
- **Sprite Animation**: Different animations for running and standing, with sprite switching.
- **Scroll Effect**: The game world scrolls horizontally as the player moves.
- **Win/Lose Conditions**: The game detects when the player has won or lost and displays appropriate messages.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/mario-game.git


2. **Navigate to the Project Directory**

    ```bash
    cd mario-game
    ```

3. **Open the index.html File**

    You can open the `index.html` file in your web browser to start playing the game. No additional setup is required.

## Game Controls

- **Arrow Left**: Move left
- **Arrow Right**: Move right
- **Arrow Up**: Jump
- **Enter**: Start or restart the game

## File Structure

The project contains the following files:

- `index.html`: The main HTML file for the game.
- `index.css`: CSS file for styling (if any, not included in this example).
- `index.js`: JavaScript file containing the game logic.
- `Images/`: Folder containing game assets such as images for the player, platforms, and background.

## Code Explanation

The `index.js` file contains the core game logic and is organized as follows:

1. **Canvas Setup**
   - Initializes the canvas and sets the context for drawing.

2. **Player Class**
   - Defines the player character's properties, animations, and behaviors.

3. **Platform Class**
   - Defines the platforms in the game.

4. **GenericObject Class**
   - Defines background objects like hills and scenery.

5. **Initialization**
   - Sets up the game environment, including platforms and background objects.

6. **Animation Loop**
   - Continuously updates and redraws the game state.

7. **Event Listeners**
   - Handles player input and game state changes.

## Images

The `Images/` folder contains the following assets:

- `platform.png`: Image for regular platforms.
- `platformSmallTall.png`: Image for tall platforms.
- `background.png`: Image for the game background.
- `hills.png`: Image for the background hills.
- `spriteRunLeft.png`: Sprite sheet for running left animation.
- `spriteRunRight.png`: Sprite sheet for running right animation.
- `spriteStandLeft.png`: Sprite sheet for standing left animation.
- `spriteStandRight.png`: Sprite sheet for standing right animation.

---