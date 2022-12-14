const API_KEY = process.env.PROJECT_API_KEY;
const searchBtn = document.getElementsByClassName("search-btn");
const searchBar = document.getElementById("search-bar");
const showMore = document.getElementById("show-more");

const PageList = (argument = "") => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayResults = (articles) => {
      
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

      const resultsContent = articles.map(
        (article) =>
          `

<div class="card"> 

<img src="${article.background_image}" width="100%" height="50%">
<div class="info">
              
<ul>
   <li><strong>Released </strong> ${
     article.released
   } </li>
   <li><strong>Genres : </strong>${article.genres.map(
     (genre) => genre.name
   )}</li>
   <li><strong>Rating </strong>${
     article.rating
   }/5 - ${article.ratings_count} votes</li>
</ul>
</div>
      <div id="container">	
	
 
         <div class="product-details">
         <a href="#pagedetail/${article.id}"><h3>${article.name}</h3></a>
            
             

         <div class="platform"> <div>${article.parent_platforms
           .map((e) => arrayImg[e.platform.id])
           .join(" ")}</div></div>
         <div class="control">
         
      </div>    
   </div>

            
         </div>
      
      </div>
      </div>
      
         `
      );

      const resultsContainer = document.getElementById("results-platform");
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
   
      const finalURL = argument
        ? `${url}&search=${argument}`
        : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
          console.log(responseData.results);
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument, 
    );
  };

  const render = () => {
    pageContent.insertAdjacentHTML(
      "beforeend",
      `
       <section class="page-list">
         <div class="articles"></div>
       </section>
     `
     
    );
    
    preparePage();
  };

  render();
};


export { PageList };
