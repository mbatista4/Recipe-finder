import React from 'react'
import style from './Recipe.module.css';

const Recipe = ({ image, title, calories, src, ingredients }) => {
    return (
        <div className={style.recipe}>
            <h1 >{title}</h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li className={style.list_item} key={Math.random() * 100}>{ingredient.text}</li>
                )
                )}
            </ol>
            <p>{calories}</p>
            <img className={style.image} src={image} alt={src} />
        </div>
    );
};

export default Recipe;