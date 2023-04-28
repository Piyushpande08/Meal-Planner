const btn = document.getElementById("generate-Meal");
const cardList = document.getElementById("meal-List");
const mealIngredient = document.getElementById("");
const mealForm = document.getElementById("meal-Form");
const detailsBox = document.getElementById("details-box");
// Meal Form submit button
detailsBox.style.display = "none";
mealForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let height = document.getElementById("height").value;
  let weight = document.getElementById("weight").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
  let activity = document.getElementById("activity").value;
  let menBmr = 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
  let womenBmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  let bmr, calories;
  bmr = gender == "male" ? menBmr : womenBmr;
  if (activity == "light") {
    calories = bmr * 1.375;
  } else if (activity == "moderate") {
    calories = bmr * 1.55;
  } else if (activity == "active") {
    calories = bmr * 1.725;
  }
  try {
    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=bb03e6e5c84642c49ce2f2786f5bda86&timeFrame=day&targetCalories=${calories}`
    );
    const data = await response.json();
    console.log(data);
    let html = "";
    if (data.meals) {
      let count = 0;
      data.meals.forEach(async (meal) => {
        const mealImage = await getMealImage(meal.id);
        let mealName = "";
        if (count === 0) {
          mealName = "BREAKFAST";
        }
        if (count === 1) {
          mealName = "LUNCH";
        }
        if (count === 2) {
          mealName = "DINNER";
        }
        html += `<div class="card-wrapper" data-id="${meal.id}" >
            <h2>${mealName}</h2>
            <div class="card">
            <img src="${mealImage}" alt="${mealName}">
            <div class="card-content">
            <h3>${meal.title}</h3>
            <p> Calories : ${data.nutrients.calories}</p>
            <button class="button getRec" onClick="getMeal(${meal.id})">Get Recepi</button>
            </div>
            </div>
            </div>`;
        cardList.innerHTML = html;
        count++;
      });
    }
  } catch (err) {
    console.log(err);
  }
});

async function getMealImage(mealId) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${mealId}/information?apiKey=bb03e6e5c84642c49ce2f2786f5bda86&includeNutrition=false`
    );
    const data = await response.json();
    return data.image;
  } catch (err) {
    console.log(err);
  }
}

function getMeal(id) {
  getMealIngredient(id);
  getMealSteps(id);
  getMealEquipment(id);
  detailsBox.style.display="block";
}

function getMealIngredient(id) {
  fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=bb03e6e5c84642c49ce2f2786f5bda86&includeNutrition=false`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.extendedIngredients) {
        html = `<table class ="tbl-class">`;
        data.extendedIngredients.forEach((ingredients) => {
          html += `<tr><td>${capitalize(ingredients.nameClean)}</td><td>${
            ingredients.amount + " " + ingredients.unit
          }</td><tr>`;
        });
        html += `</table>`;
        document.getElementById("ingredient").innerHTML = html;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getMealSteps(id) {
  fetch(
    `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=bb03e6e5c84642c49ce2f2786f5bda86&includeNutrition=false`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data[0].steps) {
        html = `<ol class="ulist">`;
        data[0].steps.forEach(async (step) => {
          html += `<li>${step.step}</li>`;
        });
        html += `</ol>`;
        document.getElementById("steps").innerHTML = html;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getMealEquipment(id) {
  fetch(
    `https://api.spoonacular.com/recipes/${id}/equipmentWidget.json?apiKey=bb03e6e5c84642c49ce2f2786f5bda86&includeNutrition=false`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.equipment) {
        html = `<ul class="ulist">`;
        data.equipment.forEach(async (equipment) => {
          html += `<li>${equipment.name}</li>`;
        });
        html += `</ul>`;
        document.getElementById("equipment").innerHTML = html;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function capitalize(string) {
  const words = string.toLowerCase().split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
}

function openTab(evt, data) {
  var i, x, tablinks;
  x = document.getElementsByClassName("data");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(data).style.display = "block";
  evt.currentTarget.className += " w3-red active";
}
var firstTablink = document.getElementsByClassName("tablink")[0];
var firstData = document.getElementsByClassName("data")[0];
firstTablink.className += " w3-red active";
firstData.style.display = "block";
