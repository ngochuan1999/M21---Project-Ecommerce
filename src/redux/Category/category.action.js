import categoryTypes from "./category.types";


export const addCategory = categoryData => ({
    type: categoryTypes.ADD_NEW_CATEGORY,
    payload: categoryData
});


// categories []
export const fetchCategories = () => ({
    type: categoryTypes.FETCH_CATEGORIES
});
export const setCategories = categories => ({
    type: categoryTypes.SET_CATEGORIES,
    payload: categories
})




// category {}

export const fetchCategory = cateID => ({
    type: categoryTypes.FETCH_CATEGORY,
    payload: cateID
});
export const setCategory = category => ({
    type: categoryTypes.SET_CATEGORY,
    payload: category
});



// action
export const deleteCategory = cateID => ({
    type: categoryTypes.DELETE_CATEGORY,
    payload: cateID
})
export const editCategoryDetail = (cateData, id) => ({
    type: categoryTypes.EDIT_CATEGORY,
    payload: cateData,
    id: id

})





// loading 

