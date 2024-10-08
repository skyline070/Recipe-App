import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () =>{

const APP_ID = 'dc34792b';
const APP_KEY = '3eab1a651f78f58e8b394f905f3efa21'
const [recipes,setRecipes] = useState([]);
const [search,setSearch] = useState('');
const [query,setQuery] = useState('paneer');

useEffect(() =>{
getRecipes()
},[query])

const getRecipes = async () =>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json()
  // console.log(response)
  // console.log(data)
  setRecipes(data.hits)
}
const getSearch = e =>{
  e.preventDefault();
  console.log("hi")
  setQuery(search)
  setSearch('')
}

return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar"  value={search} onChange={e=>setSearch(e.target.value)}/>
        <button type="submit"  className="search-button">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
       <Recipe
        key={recipe.recipe.label} 
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />
      ))}
              </div>
            </div>
  )
}

export default App;