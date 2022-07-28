import {PageList} from './PageList'
const showMore = document.getElementById('show-more');


const Home = (argument = '') => {
   const searchBtn = document.getElementById('btnSearch')
   const searchBar = document.getElementById('search-bar')
   document.getElementById("présentation").style.display = "block";

  let numberOfPages = 0;

  let landingPageArgument = `&dates=2022-07-26,2023-07-26&ordering=-rating&page_size=${(numberOfPages += 9)}`;
  PageList(landingPageArgument);
   
   searchBtn.addEventListener('click', () => {
    document.getElementById("présentation").style.display = "none";
      PageList(searchBar.value)
   })
   
  
    showMore.addEventListener('click', () => {

    let landingPageArgument2 = `&dates=2022-07-26,2023-07-26&ordering=-rating&page_size=${(numberOfPages += 9)}`;
    console.log(landingPageArgument2)
PageList(landingPageArgument2);
   numberOfPages === 27 ? showMore.remove() : showMore //remove bouton 'voir plus' si nb jeux =27

 }
  )

   
 };

 export {Home}

