# html-css-js-project-boilerplate

# Meal Planner Project

## Project o**bjective**

- You will be building an meal planner application using html, css and javascript
- In the end, we’ll have a web application which takes user data and generates meal plan for them along with their recipes.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff0ee167-421b-4b48-b2d9-cfe3a45cdc63/Untitled.png)

## **Project Context**

- It has become difficult to manage and plan daily meals for the average citizen due to the modern busy lifestyle. Among the enormous data present in the internet it becomes very time consuming to find new recipes and get all details of that recipe in one place.
- We will explore a way to meet the user's meal planning needs using the Spoonacular API. ([https://spoonacular.com/food-api](https://spoonacular.com/food-api))

**Tech stack Prerequisite:** HTML, CSS, JavaScript

## \***\*Project Steps\*\***

- **Step-1**: Create Api Key
  - Create an account in [https://spoonacular.com/food-api](https://spoonacular.com/food-api) and get the api key which you would use in the project.
- **Step-2**: Nav bar
  - The website should have a `navigation` section.
  - The `nav` bar should have the logo of your website
- **Step-3**: User Form
  - This `user-form` will be used to take user data and calculate the daily calorie requirement of the user.
  - The form should have five input fields, `weight`(kg), `height`(cm), `age`, `gender` and `physical activity` level. The `physical activity` should have three options, `light, moderate and active.`
  - The form should have a `submit` button
- **Step-4**: Meal Plan
  - The meal-plan section would have 3 meal cards, for breakfast, lunch and dinner respectively.
  - Each of the meal cards should have the following: `meal image`, `meal name`, `calories` of the meal and a `get-recipe` button.
- **Step-5**: Recipe
  - The recipe section should have 3 tabs - `Ingredients`, `steps` and `Equipment`.
  - The ingredients tab would display the list of ingredients along with their quantity required for the recipe.
  - The equipment tab displays a list of equipment needed for the recipe.
  - The steps tab would display a ordered list of steps that need to be followed.
- **Step-6**: Daily Calorie Requirement
  - On clicking the user form submit button, take all the inputs from the user form and calculate the BMR of the user. The formula for BMR is
    **For women**, BMR = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)
    **For men**, BMR = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)
  - Calculate the daily calorie requirement from the BMR. The formula varies for different levels of activity level.
    - **Lightly active (exercise 1–3 days/week)**: BMR x 1.375
    - **Moderately active (exercise 3–5 days/week)**: BMR x 1.55
    - **Active (exercise 6–7 days/week)**: BMR x 1.725
- **Step-7**: Generate Meal Plan
  - Once the daily calorie requirement is calculated, use the spoonacular api ([https://spoonacular.com/food-api/docs#Generate-Meal-Plan](https://spoonacular.com/food-api/docs#Generate-Meal-Plan)) to **generate a** **new meal plan**. The api would return three meals each for **breakfast, lunch and dinne**r.
  - Populate the `meal-plan` section with the data received from the api.
  - The `meal-plan` section should be displayed only after the meal plan is generated from the daily calorie requirement.
- **Step 8**: Generate Recipe
  - When the user clicks on the `get-recipe` button on one of the meals in the meal plan, use the `id` of that meal to fetch its recipe from the api ([https://spoonacular.com/food-api/docs#Get-Recipe-Information](https://spoonacular.com/food-api/docs#Get-Recipe-Information) )
  - Use the **data** received from the api to populate all the three tabs of the recipe section.
  - The `recipe-section` should only be displayed once the data is fetched from the api.

## Project Checkpoints

- The navbar and the user form
- The meal plan and the recipe section
- Daily Calorie Calculation and Meal Plan Generation.
- Fetching and displaying of recipes.
