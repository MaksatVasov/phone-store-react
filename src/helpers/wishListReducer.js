


const objOfFucntions = {

    "ADD_TO_WISHLIST": (state, id) => {

        const isFound = state.find((item) => item === id);

        if (isFound) {
            return state.filter((item) => item !== id);
        }

        return [...state, id];
    },
    "DELETE_FROM_WISHLIST": (state, id) => {

        return state.filter((item) => item !== id);

    }

}

export default function reducerWishlist(state, action) {


    const { type, payload } = action;

    const func = objOfFucntions[type];

    if (func) {
        return func(state, payload.id);
    }

    return state;

}