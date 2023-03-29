import React, { useEffect, useState } from 'react';
import Recipe from './Recipe'
import './App.css';


const App = () => {


  const APP_KEY  = import.meta.env.VITE_APP_KEY;
  const APP_ID  = import.meta.env.VITE_APP_ID;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  const BASE_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line 
  }, [query]);


  const getRecipes = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();

      const { hits } = data;
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
