/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    //Clear the existing content, if necessary
    //gamesContainer.innerHTML = '';

    // loop over each item in the data
    // Loop over each game in the games array
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // Create a new DOM element for each game
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');
        

        // Add content to the gameElement
        // add the class game-card to the list
        gameCard.classList.add('game-card'); 

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        /*
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Goal: ${game.goal}</p>
        `;
        works but use literals templates  */
        
        // literals templates
        gameCard.innerHTML = `
            <img class="game-img "src="${game.img}" alt="${game.name}" class="game-image">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: ${game.pledged}</p>
            <p>Backers: ${game.backers}</p>
            <p>Goal: ${game.goal}</p>
        `;

        //don't understand this quote check later

        // Append the gameElement to the container
        gamesContainer.appendChild(gameCard);
    }



}


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

// Call the function with the GAMES_JSON variable to add all games to the page
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalcontributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
            <p> ${totalcontributions.toLocaleString('en-US')}</p>
        `;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const amountraised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);


// set inner HTML using template literal
raisedCard.innerHTML = `
            <p> ${amountraised.toLocaleString('en-US')}</p>
        `;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const numberofgames = GAMES_JSON.reduce( (acc, game) => {
    return acc + 1;
}, 0);

gamesCard.innerHTML = `
            <p> ${numberofgames}</p>
        `;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let games_not_goal = GAMES_JSON.filter ( (game) => {

        return game.pledged < game.goal;
      
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(games_not_goal);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let games_goal = GAMES_JSON.filter ( (game) => {

        return game.pledged >= game.goal;
      
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(games_goal);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// use filter() to get a list of games that have not yet met their goal
let games_not_goal = GAMES_JSON.filter ( (game) => {

    return game.pledged < game.goal;
  
});

const number_unfunded_games = games_not_goal.reduce( (acc, game) => {
    return acc + 1;
}, 0);




// create a string that explains the number of unfunded games using the ternary operator
let displayStr = `A total of $${amountraised.toLocaleString('en-US')} has been raised for ${numberofgames} games. Currently, ${number_unfunded_games} games remain unfunded. We need your help to fund these amazing games! `;

// create a new DOM element containing the template string and append it to the description container

var text = document.createTextNode(displayStr);
descriptionContainer.appendChild(text);

/*
descriptionContainer.textContent += 
descriptionContainer.innerHTML = `
            <p> A total of $${amountraised.toLocaleString('en-US')} has been raised for ${numberofgames} games. Currently, ${number_unfunded_games} games remain unfunded. We need your help to fund these amazing games! </p>
            
        `;  
        
        //another way
        //<p> ${displayStr} </p>

*/

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first_game, second_game, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
var text_top = document.createTextNode(first_game.name);
firstGameContainer.appendChild(text_top)

// do the same for the runner up item
var text_runner = document.createTextNode(second_game.name);
secondGameContainer.appendChild(text_runner)


 //Adding new feature
 // JavaScript to handle the button click
 document.getElementById("openGifButton").addEventListener("click", function() {

    
             
    // Create a new image element
    var gifImage = document.createElement("img");
    gifImage.src = "./assets/web102preworkgif.gif"; // Replace with your GIF URL
    gifImage.alt = "GIF Image";

    //var gifImage = document.getElementById("gifImage");       //if a img block exist already
    //or getdivelement.appendChild(create image element) kinder document.body.appendChild(image element);

        
    //Replace the button with the image
    //gifImage.style.display = "block";
    //gifImage.style.width="300px";
    //gifImage.style.height="250px";
    //var button = document.getElementById("openGifButton");
    //button.parentNode.replaceChild(gifImage, button);

    var gifUrl=gifImage.getAttribute('src'); //or create it directly with url

    //open a new window with the url
    //window.open(gifUrl,'Image');
    
    // Open a new window with specific dimensions
    var popupWindow = window.open("", "gifWindow", "width=800,height=600"); 

    // Write HTML content to the new window
    popupWindow.document.write('<html><head><title>GIF Image</title></head><body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100%;background-color:#000;">');
    popupWindow.document.write('<img src="' + gifUrl + '" alt="GIF Image" style="max-width:100%;max-height:100%;">');
    popupWindow.document.write('</body></html>');

    // Close the document to finish loading content
    popupWindow.document.close();



});