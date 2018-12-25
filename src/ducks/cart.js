import { getProduct } from '../ducks/products';

// actions
const CART_ADD   = 'cart/ADD';
const CART_REMOVE = 'cart/REMOVE';
const OPEN_PAYMENT = 'OPEN_PAYMENT';
const CLOSE_PAYMENT = 'CLOSE_PAYMENT';

// reducer
const initialState = {
    items: [], // array of product ids
    currency: 'BLC',
    payment: false
};

export default function cart(state = initialState, action = {}) {
    switch (action.type) {
        case CART_ADD:
            return handleCartAdd(state, action.payload);
        case CART_REMOVE:
            return handleCartRemove(state, action.payload);
        case OPEN_PAYMENT:
            return handleOpenPayment(state);
        case CLOSE_PAYMENT:
            return handleClosePayment(state);
        default:
            return state;
    }
}

function handleOpenPayment(state) {
    return {
        ...state,
        payment: true
    };
}

function handleClosePayment(state) {
    return {
        ...state,
        payment: false
    };
}

function handleCartAdd(state, payload) {
    return {
        ...state,
        items: [ ...state.items, payload.productId ]
    };
}

function handleCartRemove(state, payload) {
    return {
        ...state,
        items: state.items.filter(id => id !== payload.productId)
    };
}

// action creators
export function addToCart(productId) {
    return {
        type: CART_ADD,
        payload: {
            productId
        }
    }
}

export function removeFromCart(productId) {
    return {
        type: CART_REMOVE,
        payload: {
            productId
        }
    }
}

export function openPayment(){
    return {
        type: OPEN_PAYMENT
    }
}

export function closePayment() {
    return {
        type: CLOSE_PAYMENT
    }
}

export function getPaymentStatus(state, props) {
    return state.cart.payment;
}

// selectors
export function isInCart(state, props) {
    return state.cart.items.indexOf(props.id) !== -1;
}

export function getItems(state, props) {
    return state.cart.items.map(id => getProduct(state, { id }));
}

export function getCurrency(state, props) {
    return state.cart.currency;
}

export function getTotal(state, props) {
    return state.cart.items.reduce((acc, id) => {
        const item = getProduct(state, { id });
        return acc + item.price;
    }, 0);
}
