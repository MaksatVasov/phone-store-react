
const objOfFucntions = {
    "ADD_TO_CART": (state, id) => {

        const isFound = state.some((item) => item.id === id);

        if (!isFound) {

            return [...state, { id, quantity: 1 }];

        }



        return state.map((item) => {

            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        })

    },

    "DELETE_FROM_CART": (state, id) => {

        return state.filter((item) => item.id !== id);


    },

    "INCREASE_QUANTITY": (state, id) => {

        const newState = state.map((item) => {

            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }

            return item;

        });


        return newState;
    },

    "DECREASE_QUANTITY": (state, id) => {

        const isFound = state.find((item) => item.id === id);

        if (isFound) {

            if (isFound.quantity === 1) {
                return state.filter((item) => item.id !== id);
            }

            return state.map((item) => {

                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 };
                }

                return item;

            });

        }

        return state;

    }

}



export default function cartReducer(state, action) {

    const { type, payload } = action;


    const func = objOfFucntions[type];

    if (func) {
        return func(state, payload.id);
    }


    return state;

}