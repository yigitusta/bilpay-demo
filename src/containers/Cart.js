import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { getItems, getCurrency, getTotal, removeFromCart, openPayment, closePayment } from '../ducks/cart';

const mapStateToProps = (state, props) => {
    return {
        items: getItems(state, props),
        currency: getCurrency(state, props),
        total: getTotal(state, props)
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    openPayment: () => dispatch(openPayment()),
    closePayment: () => dispatch(closePayment())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
