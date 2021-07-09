# Game of Simon!
![header-image](https://imgur.com/atK8eHJ.png)

### Getting Started
Install it on your own org by **[loggin in here](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t5e000000qdYpAAI)**.  

![launcher-image](https://imgur.com/iw5Jw4o.png)
##### Search for `Game of Simon` Application from the App Launcher menu.

#### Or

1. Open your terminal, navigate to directory you wish to clone the project.
2. Clone the repo by running below git command:  
`git clone https://github.com/wyang19a/simon-SF.git`
3. Navigate into the project directory by running `cd simon-SF/`.
4. Open Visual Studio Code by running `code .`
5. Authorize an org by running `sfdx force:auth:web:login`.
6. Install the package by running `sfdx force:package:install -p 04t5e000000qdYpAAI -w 10`.
7. Search for `Game of Simon` Application from the App Launcher menu like shown above.

### User stories
- User is able to start a new game.
- User is able to continue playing if correct.
- User is able to restart a game if incorrect.
- User is able to see past game results.
- User is able to see other users' game results and compare them on a leaderboard.

