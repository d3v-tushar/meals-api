const loadMeals = (search) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
    .then(Response => Response.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = meals =>{
    const mealsContainer = document.getElementById('meal-container');
    mealsContainer.innerHTML = ``;
    meals.forEach(meal => {
        // console.log(meal);
        const {strMeal, strMealThumb, strInstructions, idMeal} = meal;
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div class="col">
        <div onclick="loadMealDetails(${idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="card">
          <img src="${strMealThumb}" class="card-img-top img-fluid" alt="...">
          <div class="card-body">
            <h5 class="card-title text-danger">${strMeal}</h5>
            <p class="card-text">${strInstructions.slice(0,200)+'...'}</p>
          </div>
        </div>
      </div>
        `;
        mealsContainer.appendChild(mealDiv);
    });
}

const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadMeals(searchText);
    searchField.value = '';
}

const loadMealDetails = (idMeal) =>{
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
  .then(Response => Response.json())
  .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = details =>{
  console.log(details);
  const detailsContainer = document.getElementById('modal-pop');
  detailsContainer.innerHTML = '';
  const mealDetailsDiv = document.createElement('div');
  mealDetailsDiv.innerHTML = `
  <div class="modal-content text-center">
  <div class="modal-header">
    <h5 class="modal-title text-danger" id="exampleModalLabel">${details.strMeal}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
  <h6>--- Instructions ---</h6>
      <p>${details.strInstructions}</p>
      <img class="img-fluid" src="${details.strMealThumb}">
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
  </div>
</div>
  `;
  detailsContainer.appendChild(mealDetailsDiv);
}

loadMeals('');