'use strict';
// ^HTML Var
let loadingScreen = document.querySelector(".loading-screen");
let navBtn = document.querySelector("#toggle-nav");
let navLinksSide = document.querySelector(".nav-links-side");
let nav = document.querySelector("nav");
let meals = document.querySelector("#meals");
let categories = document.querySelector("#categories");
let recipe = document.querySelector("#recipe");
let area = document.querySelector("#area");
let ingredient = document.querySelector("#ingredient");
let searchNameInput = document.querySelector("#serch-name-input");
let searchLetterInput = document.querySelector("#serch-letter-input");
// ^HTML VAR NAVBAR
let searchLink = document.querySelector("#search-link");
let categoriesLink = document.querySelector("#categories-link");
let areaLink = document.querySelector("#area-link");
let ingredientsLink = document.querySelector("#ingredients-link");
let contactLink = document.querySelector("#contact-link");
//  ^ HTML VAR CONTACT
let nameInput = document.querySelector("#name-input");
let emailInput = document.querySelector("#email-input");
let phoneInput = document.querySelector("#phone-input");
let ageInput = document.querySelector("#age-input");
let passwordInput = document.querySelector("#password-input");
let repassInput = document.querySelector("#repass-input");
let submitBtn = document.querySelector("#submit-btn");
// ^ regex
let regex = {
    nameInput : {
        value : /^[A-Za-z\s]+$/ ,
        isValid : false
    } ,
    emailInput : {
        value : /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}$/ ,
        isValid : false
    } ,
    phoneInput : {
        value : /^[0-9]{10,15}$/ ,
        isValid : false
    } ,
    ageInput : {
        value : /^(?:[1-9]|[1-9][0-9]|100)$/ ,
        isValid : false
    } ,
    passwordInput : {
        value : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ,
        isValid : false
    },
    repassInput : {
        isValid : false
    }
};

getMeals();

// ^async
async function getMeals () {
   let res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s");
   res = await res.json();
   let limitedMeals = res.meals ? res.meals.slice(0, 20) : null;
   console.log(limitedMeals);
   if(limitedMeals.length > 0) {
    loadingScreen.classList.add("d-none");
     clear();
   document.querySelector(".meals").classList.remove("d-none");
   displayMeals(limitedMeals)
   } 
}

async function getRecipe (id) {
   let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   let meal = await res.json();
   console.log(meal.meals);
   if(meal.meals.length > 0) {
    loadingScreen.classList.add("d-none");
    document.querySelector(".recipes").classList.remove("d-none");
   displayRecipe(meal.meals);
   }
}

async function getCatMeals (catName) {
   let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
   let meal = await res.json();
   let limitedMeals = meal.meals ? meal.meals.slice(0, 20) : null;
   console.log(limitedMeals);
   if (limitedMeals.length > 0) {
    loadingScreen.classList.add("d-none");
    clear();
    document.querySelector(".meals").classList.remove("d-none");
   displayMeals(limitedMeals);
}
  
   
}

async function getAreaMeals (country) {
   let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
   res = await res.json();
   console.log(res.meals);
   if (res.meals.length > 0) {
    loadingScreen.classList.add("d-none");
    clear();
    document.querySelector(".meals").classList.remove("d-none");
   displayMeals(res.meals);
}
  
   
}

async function getIngredientMeals (ingredientName) {
   let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
   res = await res.json();
   console.log(res.meals);
   if (res.meals.length > 0) {
    loadingScreen.classList.add("d-none");
   clear();
    document.querySelector(".meals").classList.remove("d-none");
   displayMeals(res.meals);
}
   
   
}

async function getCategories () {
   let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
   res = await res.json();
   console.log(res.categories);
   if (res.categories.length > 0) {
    loadingScreen.classList.add("d-none");
   displayCategories(res.categories);
}
   
   
}
async function getArea () {
   let res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
   let area = await res.json();
   console.log(area.meals);
   if (area.meals.length > 0) {
    loadingScreen.classList.add("d-none");
    clear();
    document.querySelector(".area").classList.remove("d-none");
   displayArea(area.meals);
}
    
   
}

async function getIngredients () {
   let res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
   res = await res.json();
   let limitedIngredients = res.meals ? res.meals.slice(0, 20) : null;

   console.log(limitedIngredients);
   if (limitedIngredients.length > 0) {
    loadingScreen.classList.add("d-none");
            clear();
    document.querySelector(".ingredients").classList.remove("d-none");
   displayIngredients(limitedIngredients);
        }
    
   
}

async function getSearchLetterMeals(letter) {
    if (!letter || letter.length !== 1) {
        document.querySelector(".meals").classList.add("d-none");
        return;
    }

    loadingScreen.classList.remove("d-none");

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    res = await res.json();

    loadingScreen.classList.add("d-none");

    if (res.meals && res.meals.length > 0) {
        document.querySelector(".meals").classList.remove("d-none");
        displayMeals(res.meals);
    } else {
        document.querySelector(".meals").classList.add("d-none");
    }
}



async function getSearchNameMeals (name) {
   let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
   res = await res.json();
   console.log(res.meals);
   document.querySelector(".meals").classList.remove("d-none");
   if (res.meals &&
       res.meals.length > 0
   ) {
      loadingScreen.classList.add("d-none");
      displayMeals(res.meals);
    } 
    else {
        document.querySelector(".meals").classList.add("d-none");
      loadingScreen.classList.add("d-none");
        
    }
      loadingScreen.classList.add("d-none");
}
// ^sync

function toggleNav () {
    nav.classList.toggle("nav-toggle");
    if(nav.classList.contains("nav-toggle")){
       navBtn.innerHTML = `<i class="fa-solid fa-x"></i>`;
    }
    else {
        navBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`

    }
}

function displayMeals (arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {

        cartona += `
                <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2" data-id="${arr[i].idMeal}">
                    <img src="${arr[i].strMealThumb}" alt="" class="w-100 d-block">
                    <div class="meal-layer w-100 position-absolute d-flex align-items-center p-2 text-black">
                    <h3>${arr[i].strMeal}</h3>
                </div>
                </div>
            </div>
        `
        
    }
    meals.innerHTML = cartona;
}

function displayRecipe (meal) {
    
    let list = "";
    for (let i = 0; i < 20; i++) {
      let measure = meal[0][`strMeasure${i}`];
      let ingredient = meal[0][`strIngredient${i}`];
      if (ingredient !== "") {
        list +=`
           <li class="alert alert-info m-2 p-1"> ${measure} ${ingredient}</li>
        `;
      }
        
    }
    console.log(list);
    
    
     let cartona = `
                <div class="col-md-4">
                    <img src="${meal[0].strMealThumb}" alt="" class="w-100 d-block rounded-3">
                    <h2>${meal[0].strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal[0].strInstructions}</p>
                    <h3>
                        <span>Area :</span>
                        <span>${meal[0].strArea}</span>
                    </h3>
                    <h3>
                        <span>Category :</span>
                        <span>${meal[0].strCategory}</span>
                    </h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${list}
                    </ul>
                    <h3>Tags :</h3>
                    <a target="_blank" href="${meal[0].strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${meal[0].strYoutube}" class="btn btn-danger">Youtube</a>
                </div>
     `;
    recipe.innerHTML = cartona;
}

function displayCategories (arr) {
    console.log(arr);
    
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        
        cartona += `
                <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2" data-cat="${arr[i].strCategory}" data-id="${arr[i].idCategory}">
                    <img src="${arr[i].strCategoryThumb}" alt="" class="w-100 d-block">
                    <div class="meal-layer w-100 position-absolute text-center p-2 text-black">
                    <h3>${arr[i].strCategory}</h3>
                    <p>${arr[i].strCategoryDescription}</p>
                </div>
                </div>
            </div>
        `
        
    }
    categories.innerHTML = cartona;
}

function displayArea (arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {

        cartona += `
                <div class="col-md-3">
                <div class="country d-flex flex-column align-items-center text-white"  data-country="${arr[i].strArea}">
                    <i class="fa-solid fa-house-laptop"></i>
                    <h3>${arr[i].strArea}</h3>
                </div>
            </div>
        `
        
    }
    area.innerHTML = cartona;
}

function displayIngredients (arr) {
    let cartona = ``;
    for (let i = 0; i < arr.length; i++) {

        cartona += `
                <div class="col-md-3">
                <div class="country d-flex flex-column align-items-center text-white text-center" data-ingredient="${arr[i].strIngredient}">
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h3>${arr[i].strIngredient}</h3>
                    <p>${arr[i].strDescription}</p>
                </div>
            </div>
        `
        
    }
    ingredient.innerHTML = cartona;
}

function clear () {
    document.querySelector(".meals").classList.add("d-none");
    document.querySelector(".categories").classList.add("d-none");
    document.querySelector(".recipes").classList.add("d-none");
    document.querySelector(".area").classList.add("d-none");
    document.querySelector(".ingredients").classList.add("d-none");
    document.querySelector(".search").classList.add("d-none");
    document.querySelector(".contact").classList.add("d-none");
}

function toggleSubmitBtn () {
    if(regex.nameInput.isValid === true &&
        regex.emailInput.isValid === true &&
        regex.ageInput.isValid === true &&
        regex.phoneInput.isValid === true &&
        regex.passwordInput.isValid === true &&
        regex.repassInput.isValid === true
    ) {
        submitBtn.disabled = false;
    }
    else {
        submitBtn.disabled = true;
    }
    }

function clearForm () {
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    ageInput.value = "";
    passwordInput.value = "";
    repassInput.value = "";
}
// ^ add event listner

navBtn.addEventListener("click",function(){
    toggleNav();
    
});

categoriesLink.addEventListener("click", function() {
    clear();
    document.querySelector(".categories").classList.remove("d-none");
    toggleNav();
    getCategories();
    loadingScreen.classList.remove("d-none");
});

meals.addEventListener("click", function(e){
    
    let meal = e.target.closest(".meal");
    
    if (meal) {
        let mealID = meal.dataset.id; 
        console.log("Meal ID:", mealID);
        clear();
        getRecipe(mealID);
        loadingScreen.classList.remove("d-none");
    }
});

categories.addEventListener("click", function(e){
    
    let mealsCategory = e.target.closest(".meal");
    console.log(mealsCategory);
    
    if (mealsCategory) {
        let catID = mealsCategory.dataset.id; 
        let cat = mealsCategory.dataset.cat
        console.log("Meal ID:", catID);
        console.log("cat:", cat);
        clear();
        getCatMeals(cat);
        loadingScreen.classList.remove("d-none");
    }
});

areaLink.addEventListener("click", function() {
    clear();
    toggleNav();
    getArea();
    loadingScreen.classList.remove("d-none");
});

area.addEventListener("click", function(e){
    
    let mealsArea = e.target.closest(".country");
    console.log(mealsArea);
    
    if (mealsArea) {
        let country = mealsArea.dataset.country
        console.log("country:", country);
        clear();
        getAreaMeals(country);
        loadingScreen.classList.remove("d-none");
    }
});

ingredientsLink.addEventListener("click", function() {
    clear();
    toggleNav();
    getIngredients();
    loadingScreen.classList.remove("d-none");
});

ingredient.addEventListener("click", function(e){
    
    let mealsIngredients = e.target.closest(".country");
    console.log(mealsIngredients);
    
    if (mealsIngredients) {
        let ingredientName = mealsIngredients.dataset.ingredient;
        console.log("ingredientName:", ingredientName);
        clear();
        getIngredientMeals(ingredientName);
        loadingScreen.classList.remove("d-none");
    }
});

searchLink.addEventListener("click", function() {
    clear();
    toggleNav();
    document.querySelector(".search").classList.remove("d-none");
    
});

searchLetterInput.addEventListener("input", function() {
    const letter = searchLetterInput.value;

    if (letter === "") {
        document.querySelector(".meals").classList.add("d-none");
        loadingScreen.classList.add("d-none"); 
        return;
    }

    loadingScreen.classList.remove("d-none");
    getSearchLetterMeals(letter);
});

searchNameInput.addEventListener("input",function(){
    console.log(searchNameInput.value);
    getSearchNameMeals(searchNameInput.value);
    loadingScreen.classList.remove("d-none");
    
});

contactLink.addEventListener("click", function() {
    clear();
    toggleNav();
    document.querySelector(".contact").classList.remove("d-none");
    clearForm();
    
});

nameInput.addEventListener("input",function(){
    if(regex.nameInput.value.test(nameInput.value)) {
        regex.nameInput.isValid = true;
        nameInput.nextElementSibling.classList.add("d-none");
    }
    else {
        regex.nameInput.isValid = false;
        nameInput.nextElementSibling.classList.remove("d-none");
    }
    console.log(regex.nameInput.isValid);
    toggleSubmitBtn();
    
});

emailInput.addEventListener("input",function(){
    if(regex.emailInput.value.test(emailInput.value)) {
        regex.emailInput.isValid = true;
        emailInput.nextElementSibling.classList.add("d-none");
    }
    else {
        regex.emailInput.isValid = false;
        emailInput.nextElementSibling.classList.remove("d-none");
    }
    console.log(regex.emailInput.isValid);
    toggleSubmitBtn();
});

phoneInput.addEventListener("input",function(){
    if(regex.phoneInput.value.test(phoneInput.value)) {
        regex.phoneInput.isValid = true;
        phoneInput.nextElementSibling.classList.add("d-none");
    }
    else {
        regex.phoneInput.isValid = false;
        phoneInput.nextElementSibling.classList.remove("d-none");
    }
    console.log(regex.phoneInput.isValid);
    toggleSubmitBtn();
});

ageInput.addEventListener("input",function(){
    if(regex.ageInput.value.test(ageInput.value)) {
        regex.ageInput.isValid = true;
        ageInput.nextElementSibling.classList.add("d-none");
    }
    else {
        regex.ageInput.isValid = false;
        ageInput.nextElementSibling.classList.remove("d-none");
    }
    console.log(regex.ageInput.isValid);
    toggleSubmitBtn();
});

passwordInput.addEventListener("input",function(){
    if(regex.passwordInput.value.test(passwordInput.value)) {
        regex.passwordInput.isValid = true;
        passwordInput.nextElementSibling.classList.add("d-none");
    }
    else {
        regex.passwordInput.isValid = false;
        passwordInput.nextElementSibling.classList.remove("d-none");
    }
    console.log(regex.passwordInput.isValid);
    toggleSubmitBtn();
});

repassInput.addEventListener("input",function(){
    if(repassInput.value !== "") {
        if(repassInput.value === passwordInput.value) {
            regex.repassInput.isValid = true;
        repassInput.nextElementSibling.classList.add("d-none");
    }
    else {
        regex.repassInput.isValid = false;
        repassInput.nextElementSibling.classList.remove("d-none");
    }
    }
    else {
        regex.repassInput.isValid = false;
         repassInput.nextElementSibling.classList.remove("d-none");
    }
    toggleSubmitBtn();
})

submitBtn.addEventListener("click",function(e){
    e.preventDefault();
    clearForm();
})