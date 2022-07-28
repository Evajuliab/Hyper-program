const API_KEY = process.env.PROJECT_API_KEY;
const PageDetail = (argument) => {
   const preparePage = () => {
     const cleanedArgument = argument.trim().replace(/\s+/g, "-");
 
     const displayGame = (gameData) => {
      //  const { name, released, description, genre, platforms, developers, tags } = gameData;
       const articleDOM = document.querySelector(".page-detail .article");
       articleDOM.querySelector("h1.title").innerHTML =  gameData.name;
       articleDOM.querySelector("p.release-date span").innerHTML = gameData.released;
       articleDOM.querySelector("p.description span").innerHTML = gameData.description;
       articleDOM.querySelector("p.genre span").innerHTML = gameData.genres.map(genre =>  genre.name);
       articleDOM.querySelector("p.platforms span").innerHTML = gameData.parent_platforms.map(genre =>  genre.platform.name);
       articleDOM.querySelector("p.developers span").innerHTML = gameData.developers.map(genre =>  genre.name);
       articleDOM.querySelector("p.tags span").innerHTML = gameData.tags.map(genre =>  genre.name);
       articleDOM.querySelector("p.publisher span").innerHTML = gameData.publishers.map(genre =>  genre.name);
       articleDOM.querySelector("h4.rating strong").innerHTML =  gameData.rating;
       articleDOM.querySelector("h4.rating span").innerHTML =  gameData.ratings_count;

       document.querySelector("div.image-detail").style.background =  `url(${gameData.background_image})`;
      document.querySelector("div.image-detail").style.backgroundSize = `cover`;
      document.querySelector("div.image-detail").style.height = `400px`;
      document.querySelector('a#website').setAttribute("href",gameData.website);
      document.querySelector('a.buy').setAttribute("href", gameData.website)

     };


     const fetchGame = (url, argument) => {
       fetch(`${url}/${argument}?key=${API_KEY}`)
         .then((response) => response.json())
         .then((responseData) => {
           displayGame(responseData);
           getSimilar(responseData);
           getTrailer(responseData);
           getScreenshot(responseData);
           console.log(responseData);
         });
     };
 
     fetchGame('https://api.rawg.io/api/games', cleanedArgument);
   };
 
   const render = () => {
    document.getElementById("présentation").style.display = "none";
    document.getElementById("selector").style.display = "none";
    document.getElementById("show-more").style.display = "none";
    document.getElementById("results-platform").style.display = "none";
     pageContent.innerHTML = `
       <section class="page-detail">
       <div class="image-detail"><a id="website" href="" target="_blank">Check Website  ></a></div>
         
       <div class="article">
        
        
           <h1 class="title"></h1>
           <h4 class="rating"><strong></strong>/5 - <span></span> votes</h4>
           <p class="description"><strong>Plot </strong></br><span></span></p>
           <div class="details">
           <p class="release-date"><strong>Release date</strong></br> <span></span></p>
           <p class="developers"><strong>Developer</strong></br> <span></span></p>
           <p class="platforms"><strong>Platforms</strong></br> <span></span></p>
           
          
           <p class="publisher"><strong>Publisher</strong></br><span></span></p>
           <p class="genre"><strong>Genre</strong></br><span></span> </p>
           <p class="tags"><strong>Tags</strong></br><span></span></p></div>
           
           <h1 class="title">BUY</h1>
           <a href="" class="buy">Acheter <i class="fa-solid fa-cart-shopping"></i></a>
           <h1>TRAILER</h1>
           <div class="trailer"></div>
           <h1>SCREENSHOTS</h1>
           <div class="screenshots details-sreenshot"></div></div>
           </div>
           <h1>SIMILAR GAMES</h1>
           <div class="similar-games"></div>
           </div>


         </div>
       </section>
     `;
 
     preparePage();
   };
 
   render();
 };

const getSimilar = (data) =>{
  let arrayImg = [
    "",
    '<i class="fab fa-windows" style="font-size:30px"></i>',
    '<i class="fab fa-playstation" style="font-size:30px"></i>',
    '<i class="fab fa-xbox" style="font-size:30px"></i>',
    '<i class="fab fa-app-store-ios" style="font-size:30px"></i>',
    '<i class="fab fa-apple" style="font-size:30px"></i>',
    '<i class="fab fa-linux" style="font-size:30px"></i>',
    '<i class="fab fa-nintendo-switch" style="font-size:30px"></i>',
    '<i class="fab fa-android" style="font-size:30px"></i>',
  ];
  let id = data.id;
  console.log(id);

  fetch(`https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}`)
  .then((response) => response.json())
        .then((responseData) => {
 console.log(responseData.results);

 let result = document.querySelector('.similar-games');
if(responseData.results.length > 0){
responseData.results.map(article => 
  result.insertAdjacentHTML('afterbegin',`
  <div class="card"> 
  <img src="${article.background_image}"  width="100%" height="75%"%">
        <div id="container">	
           <div class="product-details">
              <h3>${article.name}</h3>
              <div class="platform"> <div>${article.parent_platforms
                .map((e) => arrayImg[e.platform.id])
                .join(" ")}</div></div>
              </div>`

) )} else{result.insertAdjacentHTML('afterbegin',`
<div class="card"> 
<p>Aucun jeu similaire</p>
`)} })}

const getTrailer = (data) =>{
  let id = data.id;
  console.log(id);

  fetch(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`)
  .then((response) => response.json())
        .then((responseData) => {
 console.log(responseData.results);

 let result = document.querySelector('.trailer');
if(responseData.results.length > 0){
  
responseData.results.map(article => 
  result.insertAdjacentHTML('afterbegin',`
  <div class="card"> 
  <img src="${article.name}"  width="100%" height="100%">
        <div id="container">	
           <div class="product-details">
              <h3>${article.name}</h3>
              </div>`

) )} else{result.insertAdjacentHTML('afterbegin',`

<p>Aucun Trailer disponible</p>
`)} })}


const getScreenshot = (data) =>{
  let id = data.id;
  console.log(id);

  fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
  .then((response) => response.json())
        .then((responseData) => {
 console.log(responseData.results);

 let result = document.querySelector('.screenshots');
responseData.results.slice(0,4).map(article => 
  result.insertAdjacentHTML('afterbegin',`
  <img src="${article.image}"  width="100%" height="100%">
              </div>
              `

) )})} 

 export {PageDetail}