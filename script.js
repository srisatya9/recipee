const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const output = document.getElementById('recipes');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  output.innerHTML = 'Loading...';

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    if (!data.meals) {
      output.innerHTML = 'No recipes found.';
      return;
    }

    output.innerHTML = '';
    data.meals.forEach(meal => {
      output.innerHTML += `
        <div class="card">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h2>${meal.strMeal}</h2>
          <p>${meal.strInstructions.slice(0, 150)}...</p>
        </div>
      `;
    });
  } catch (err) {
    output.innerHTML = 'Error fetching recipes.';
    console.error(err);
  }
});
