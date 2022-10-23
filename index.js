import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bulma/css/bulma.min.css';
import { Helmet } from "react-helmet";
import users from './data/DALI_data.json';



//Global Variables  ------------------------------
let searchBy = "";
let searchText;
let tilesList;
//End of Global Variables  ------------------------------

//Global Methods ------------------------------

//Handles when a button to sort by is clicked
const handleSort = () =>{  
  if(searchBy!=="" && searchBy !=="none")
  {
  const searchbar = document.querySelector("input")
  let names = new Set();
  for(let user of users)
  {
  
    if(user[searchBy].toLowerCase().indexOf(searchbar.value.toLowerCase()) === -1){
      names.add(user.name);
    }
  }

  if(localStorage.getItem("followers") === null)  localStorage.setItem("followers", '[]');
  if(localStorage.getItem("likes") ===null)  localStorage.setItem("likes",'[]');

  for(let tile of tilesList)
  {
    tile.classList.remove("hidden");
    tile.classList.add("box");
    if(names.has(tile.querySelector(".subtitle").innerHTML))
    {
      tile.classList.add("hidden");
      tile.classList.remove("box");
    }
  }
  }
  else if(searchBy==="none"){
  for(let tile of tilesList)
    {
    tile.classList.remove("hidden");
    tile.classList.add("box");
    }
  }
  }

//Handles when the dropdown is toggled
const toggleDropdown = () =>{
  document.querySelector(".dropdown").classList.toggle("is-active");
  
}

//Handles when the user wants to sort by "None"
const handleNoneClick = () =>{
  searchBy = "";
  searchText.innerHTML="";
  searchText.insertAdjacentText("afterbegin","None");
  toggleDropdown();
  handleSort();
  }

//Handles when the user wants to sort by "Name"
const handleNameClick = () =>{
  searchBy = "name";
  searchText.innerHTML="";
  searchText.insertAdjacentText("afterbegin","Name");
  toggleDropdown();
  handleSort();
}

//Handles when the user wants to sort by "Hometown"
const handleTownClick = () =>{
  searchBy = "home";
  searchText.innerHTML="";
  searchText.insertAdjacentText("afterbegin","Hometown");
  toggleDropdown();
  handleSort();
}

//Handles when the user wants to sort by "Major"
const handleMajorClick = () =>{
  searchBy = "major";
  searchText.innerHTML="";
  searchText.insertAdjacentText("afterbegin","Major");
  toggleDropdown();
  handleSort();
}


//Moves the window to the followers page
const goToFollowing = () =>{
  const tiles= document.querySelectorAll(".is-2");
  let followers = JSON.parse(localStorage.getItem('followers'));
  document.querySelector(".dropdown").classList.add("hidden");
  for(let tile of tiles)
  {
    tile.classList.remove("hidden");
    tile.classList.add("box");
    if(!followers.includes(tile.querySelector(".subtitle").innerHTML))
    {
      tile.classList.add("hidden");
      tile.classList.remove("box");
    }
  }
}

//Moves the window to the likes page
const goToLikes= () =>{
  document.querySelector(".dropdown").classList.add("hidden");
  const tiles = document.querySelectorAll(".is-2");
  let likes = JSON.parse(localStorage.getItem('likes'));
  for(let tile of tiles)
  {
    tile.classList.remove("hidden");
    tile.classList.add("box");
    if(!likes.includes(tile.querySelector(".subtitle").innerHTML))
    {
      tile.classList.add("hidden");
      tile.classList.remove("box");
    }
  }
}

//Closes the modal
const closeModal=  ()=>{
  document.querySelector('.modal').classList.remove('is-active');
};


//End of Global Methods --------------------

//Components --------------------

//The dropdown menu that contains the "Likes" and "Followers"
class AccountDropdown extends React.Component{
  render(){
    return(
      <div id="navigationbartop"> 
        <nav class="navbar" role="navigation" aria-label="dropdown navigation">
          <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                <img id="#accountMenuBox" src={require('./pictures/61205.png')} alt="Account"/>
              </a>
              <div class="navbar-dropdown">
                <a class="navbar-item" onClick={goToLikes}>
                  My Likes
                </a>
                <a class="navbar-item" onClick={goToFollowing}>
                  My Following
                </a>
               </div>
            </div>
          </nav>
        </div>
    )
  }
}

//Renders the content of the header
class Logos extends React.Component{
  render(){
    return(
      <div>
        <a href="http://dali.dartmouth.edu/" target="about_blank">
          <img class="daliLogo" id="topLeftLogo" src={require('./pictures/dali-logo.jpg')} alt="Logo"/>
        </a>        
          <div class="navbar-menu">
            <div class="centerLogo">
              <a>
                <img id="topLeftLogo" src={require('./pictures/logo.png')} alt="Logo" onClick={()=>{window.location.reload();}}/>
              </a>
            </div>
            <div class="navbar-end">
              <AccountDropdown></AccountDropdown>
            </div>
          </div>
      </div>
    );
  }
}


//Renders the header
  class MyHead extends React.Component {
    render() {
      return (
        <section class="hero" id="mainpageheader">
            <div id="topHero" class="hero-body">
              <Logos></Logos>
            </div>
        </section>
      );
    }
  }

  //Render the search bar and dropdown
  class SortSearch extends React.Component {
    render(){
      return(
        <div>
          <div class="dropdown" >
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={toggleDropdown}>
                <span>Search By</span>
                <span class="icon is-small">
                 <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
         <div class="dropdown-menu" id="dropdown-menu3" role="menu">
           <div class="dropdown-content">
              <a onClick={handleNameClick} class="dropdown-item">
                Name
              </a>
              <a onClick={handleTownClick} class="dropdown-item">
                Hometown
              </a>
              <a onClick={handleMajorClick} class="dropdown-item">
              Major
              </a>
              <a onClick={handleNoneClick} class="dropdown-item">
              None
              </a>
            </div>
          </div>
          <input class="input" type="text" placeholder="Search and click" onChange={handleSort}></input>
          </div>
        </div>
      )
    }
  }


  class Modal extends React.Component {
    
    //When the follow button is clicked for a user
    onFollowClick =()=>{
      let userName= document.querySelector("#root > div > div > div.modal-card > header > p").innerHTML;
      let follower = JSON.parse(localStorage.getItem('followers'));
      if(!follower.includes(userName)) follower.push(userName);
      else if(follower.includes(userName)) follower.splice(follower.indexOf(userName),1);
      localStorage.setItem('followers', JSON.stringify(follower));
      let followButton = document.querySelector("#followButton");
      followButton.classList.toggle("is-success");
    }

    //When the like button is clicked for a user
    onLikeClick =()=>{
      let userName= document.querySelector("#root > div > div > div.modal-card > header > p").innerHTML;
      let like = JSON.parse(localStorage.getItem('likes'));
      if(!like.includes(userName)) like.push(userName);
      else if(like.includes(userName)) like.splice(like.indexOf(userName),1);
      localStorage.setItem('likes', JSON.stringify(like));
      let likeButton = document.querySelector("#likeButton");
      likeButton.classList.toggle("is-success");
    }

    render(){
      return(
        <div class="modal">
          <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Name</p>
                  <button class="delete" aria-label="close" onClick={closeModal}></button>
               </header>
            <section class="modal-card-body">
              <figure class="image">
                <img alt="Profile"></img>
              </figure>
              <p id="quoteText"></p>
              <p id="homeText"></p>
              <p id="yearText"></p>
              <p id="majorText"></p>
              <p id="minorText"></p>
              <p id="modText"></p>
              <p id="roleText"></p>
              <p id="birthText"></p>
              <p id="artistText"></p>
              <p id="colorText"></p>
              <p id="shoeText"></p>
  
            </section>
          <footer class="modal-card-foot">
            <button class="button" id="likeButton" onClick={this.onLikeClick}>
              <img id="like" src={require('./pictures/thumbs.png')} alt="Like Button"></img>
            </button>
            <button class="button" id="followButton" onClick={this.onFollowClick}>Follow</button>
          </footer>
          </div>
        </div>
      )
    }
  }


  //Renders the grid of users
  class Grid extends React.Component {
    render(){
      return(
        <section class="hero dartmouth is-fullheight">
          <div class="hero-body" id="mainBody">
            <SortSearch></SortSearch>
            <div class="tile is-ancestor" id="tileancestor">  
            </div>
          </div>
        </section>
      )
    }
  }
  
  //Renders the page as a whole
  class MyRoot extends React.Component{
    render(){
      return(
        <div>
          <Helmet>
          <title>gogreen</title>
          </Helmet>
          
          <Modal></Modal>
          <MyHead></MyHead>
          
          <Grid></Grid>
          
        
        </div>
      )
    }
  }
  
//End of Components --------------------

//To be executed upon loading the page
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<MyRoot />);

  document.addEventListener('DOMContentLoaded', () => {
     searchText=document.querySelector("#mainBody > div:nth-child(1) > div > div.dropdown-trigger > button > span:nth-child(1)");
    const columns = document.querySelector(".tile");
    for(let user of users)
    {
      let box =document.createElement("div");
      box.classList.add("tile");
      box.classList.add("box");
      box.classList.add("is-2");
      box.classList.add("is-128x128");
      box.addEventListener("click", ()=>{

        let mod =document.querySelector(".modal");
        mod.classList.add("is-active");
        
        let title = document.querySelector(".modal-card-title");
        title.innerHTML="";
        title.insertAdjacentText("afterbegin", user.name);
        
        const followButton = document.querySelector("#followButton");
        followButton.classList.remove("is-success");
        if(JSON.parse(localStorage.getItem("followers")).includes(user.name)) followButton.classList.add("is-success");

        let image = document.querySelector(".modal figure img")
        image.setAttribute("src",user.picture);


        let quote = document.querySelector("#quoteText");
        quote.innerHTML="";
        quote.insertAdjacentText('afterbegin', "Favorite Quote: "+user.quote);

        let home = document.querySelector("#homeText");
        home.innerHTML="";
        home.insertAdjacentText('afterbegin', "Hometown: "+user.home);

        let year = document.querySelector("#yearText");
        year.innerHTML="";
        year.insertAdjacentText('afterbegin', "Year: "+user.year);

        let major = document.querySelector("#majorText");
        major.innerHTML="";
        major.insertAdjacentText('afterbegin', "Major: "+user.major);

        let minor = document.querySelector("#minorText");
        minor.innerHTML="";
        minor.insertAdjacentText('afterbegin', "Minor: "+user.minor);

        let modify = document.querySelector("#modText");
        modify.innerHTML="";
        modify.insertAdjacentText('afterbegin', "Modification: "+user.modification);

        let role = document.querySelector("#roleText");
        role.innerHTML="";
        role.insertAdjacentText('afterbegin', "Role: "+user.role);

        let birth = document.querySelector("#birthText");
        birth.innerHTML="";
        birth.insertAdjacentText('afterbegin', "Birhtday: "+user.birthday);

        let artist = document.querySelector("#artistText");
        artist.innerHTML="";
        artist.insertAdjacentText('afterbegin', "Favorite Artist: "+user.favoriteArtist);

        let color = document.querySelector("#colorText");
        color.innerHTML="";
        color.insertAdjacentText('afterbegin', "Favorite Color: "+user.favoriteColor);

        let shoe = document.querySelector("#shoeText");
        shoe.innerHTML="";
        shoe.insertAdjacentText('afterbegin', "Favorite Shoe: "+user.favoriteShoe);
      });
      
      
      let source = document.createElement("img");
      source.setAttribute("src", user.picture);
      source.classList.add("mainpagephoto");

      let image = document.createElement("figure");
      image.classList.add("image");

      image.appendChild(source);
      image.setAttribute("source", user.picture)

      let text = document.createElement("p");
      text.classList.add("subtitle");
      text.classList.add("is-5");
      text.insertAdjacentText('afterbegin',user.name);

      box.appendChild(image);
      box.appendChild(text);
      box.classList.add("custom-boxes");

      columns.appendChild(box);
      
  }
  tilesList= document.querySelectorAll(".is-2");
  });

