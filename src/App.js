import React, { useEffect, useState } from 'react';
import Recipe from './Recipe'
import './App.css';



const App = () => {

  const [recipes, setRecipes] = useState([]);
  const [counter, setCounter] = useState(0);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  const APP_ID = '33defd7d';
  const APP_KEY = 'dcf0cf4e8771da492daa6b1aa296de5d';
  const BASE_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    getRecipes();
  }, [query]);


  const getRecipes = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();

      const { hits } = data;
      console.log(hits);
      setRecipes(hits);

    } catch (error) {
      console.log(error);
    }
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  return (
    <div className="app">
      <h1 className='title'>Recipe Finder</h1>
      <form onSubmit={getSearch} className="search-form">
        <input type="text" name="" className='search-bar' value={search} onChange={updateSearch} />
        <button type="submit" className='search-btn'>Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (<Recipe key={recipe.recipe.label} image={recipe.recipe.image} title={recipe.recipe.label} calories={Math.round(recipe.recipe.calories)} src={recipe.recipe.source} ingredients={recipe.recipe.ingredients} />))}
      </div>
    </div>
  );
}


export default App;
