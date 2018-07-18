import * as aTypes from './actionTypes'
import axios from "../../axios-orders"

export const addIngredient = (name) => {
    return {
        type: aTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: aTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ing) => {
    return {
        type: aTypes.SET_INGREDIENTS,
        ingredients: ing
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get("https://reactburger-dd619.firebaseio.com/ingredients.json")
        .then(response=>    {
            dispatch(setIngredients(response.data))
        }).catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}


export const fetchIngredientsFailed = () => {
    return {
        type:aTypes.FETCH_INGREDIENTS_FAILED
    }
}