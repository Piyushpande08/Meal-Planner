// - **Step-6**: Daily Calorie Requirement
//     - On clicking the user form submit button, take all the inputs from the user form and calculate the BMR of the user. The formula for BMR is

//         **For women**, BMR = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)

//         **For men**, BMR = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)

//     - Calculate the daily calorie requirement from the BMR. The formula varies for different levels of activity level.
//         - **Lightly active (exercise 1–3 days/week)**: BMR x 1.375
//         - **Moderately active (exercise 3–5 days/week)**: BMR x 1.55
//         - **Active (exercise 6–7 days/week)**: BMR x 1.725
"use strict";
let bmr;

function Submit() {
  let height = document.getElementById("height").value;
  let weight = document.getElementById("weight").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let activity = document.getElementById("activity-level").value;

  let calories = BMR(height, weight, age, gender, activity);
  meal(calories);
}

function BMR(height, weight, age, gender, activity) {
  if (gender === "female") {
    if (activity === "light") {
      return (bmr =
        (65.51 + 9.563 * weight + 1.85 * height - 4.676 * age) * 1.375);
    } else if (activity === "moderate") {
      return (bmr =
        (65.51 + 9.563 * weight + 1.85 * height - 4.676 * age) * 1.55);
    } else if (activity === "active") {
      return (bmr =
        (65.51 + 9.563 * weight + 1.85 * height - 4.676 * age) * 1.725);
    } else {
      alert("Please select one activity");
    }
  } else if (gender === "male") {
    if (activity === "light") {
      return (bmr =
        (66.47 + 13.75 * weight + 5.003 * height - 6.755 * age) * 1.375);
    } else if (activity === "moderate") {
      return (bmr =
        (66.47 + 13.75 * weight + 5.003 * height - 6.755 * age) * 1.55);
    } else if (activity === "active") {
      return (bmr =
        (66.47 + 13.75 * weight + 5.003 * height - 6.755 * age) * 1.725);
    } else {
      alert("Please select one activity");
    }
  } else {
    alert("Please choose one gender");
  }
}

function meal(calories) {
  fetch(
    `https://api.spoonacular.com/mealplanner/generate?apiKey=7712903132db4abbaefacf97a216494e&timeFrame=day&targetCalories=${calories}`
  )
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

      const breakfast = document.getElementById("breakfast-calories");
      const lunch = document.getElementById("lunch-calories");
      const dinner = document.getElementById("dinner-calories");

      document.getElementById(
        "breakfast-name"
      ).textContent = `Title- ${data.meals[0].title}`;
      breakfast.innerText = `Calories - ${data.nutrients.calories}`;
      document.getElementById("lunch-name").textContent = data.meals[1].title;
      lunch.innerText = `Calories - ${data.nutrients.calories}`;
      document.getElementById("dinner-name").textContent = data.meals[2].title;
      dinner.innerText = `Calories - ${data.nutrients.calories}`;
       
      document.getElementById('dinner-recipe').addEventListener('click', function() {
        switchTab(data.meal[2].id);
    });
      // Show meal plan section
      // document.getElementById("meal-plan-section").style.display = "block";
     
    })
    .catch(() => {
      console.log("error");
    });
}

//  function recipe_One() {
//   let recipeid = meal().data.meals[0].id;
//         fetchRecipeInformation(recipeid);
//       }
//       function recipe_two() {
//         let recipeid = meal().data.meals[1].id;
//         fetchRecipeInformation(recipeid);
//       }
//       function recipe_three() {
//         let recipeid = meal().data.meals[2].id;
//         fetchRecipeInformation(recipeid);
//       }

// // Function to fetch recipe information from Spoonacular API
function switchTab(mealId) {
  const recipeda = `https://api.spoonacular.com/recipes/${mealId}/information?includeNutrition=false`;

  fetch(recipeda)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // document.getElementById('recipe-ingredients').innerHTML = data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('');
      // document.getElementById('recipe-steps').innerHTML = data.instructions ? data.instructions.split('.').map(step => `<li>${step.trim()} </li>`).join('') : 'No instructions available';
      // document.getElementById('recipe-equipment').innerHTML = data.equipment ? data.equipment.map(equipment => `<li>${equipment.name}</li>`).join('') : 'No equipment required';

      // // Show recipe section
      // document.getElementById('recipe-section').style.display = 'block';

      // // Set active tab to ingredients
      // switchTab('ingredients');
    })
    .catch((error) => {
      console.error("Error fetching recipe:", error);
    });
}

// Populate recipe section with data from API
//       document.getElementById('recipe-name').textContent = data.title;
//       document.getElementById('recipe-image').src = data.image
