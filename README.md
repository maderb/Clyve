# Clyve

####MAIN FOLDER: Contains README and Node.js script (route.js).

route.js : Node.js routing file for incoming traffic. 
GET "/clyve": Gets a copy of 'index.html' and loads 'menu.html' into display box to initiate.
POST "/clyve": Processes username and password and responds with validity of user input. Currently outputs 'true'
for all username/password pairs (non null).
	Temporarily:
	Currently allows access to contents of public directory, which is not limited to specific moderated traffic.
	
package.json : Provides routing data for various importable packages.

---
####PUBLIC FOLDER

public/index.html: Provides a framework for the page on which the game is presented.

public/main.css: Provides styling for the framework index.html.

---
####PUBLIC/GAME FOLDER

public/game/game.html: Provides framework for actual gameplay (window layout, hud, etc.).

public/game/menu.html: Provides framework for login menu for user authentication.

---
####PUBLIC/GAME/SCRIPT FOLDER

public/game/script/game_main.js: Provides the primary game loop and routing to pertinent information for the client to operate.

public/game/script/menu.js: Provides scripting information for menu animations and communication with the server.

---
####PUBLIC/GAME/STYLE FOLDER

public/game/style/game_main.css: Provides any necessary css styling information for the game display.

public/game/style/menu.css: Provides any necessary css for formatting the game menu.
