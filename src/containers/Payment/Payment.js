import { connect } from 'react-redux';
import React, { Component } from 'react';
import { closePayment, getTotal, getPaymentStatus } from '../../ducks/cart';
import BilPay from './BilPay/BilPay';
import Modal from './Modal/Modal';

const mapStateToProps = (state, props) => {
  return {
    total: getTotal(state, props),
    payment: getPaymentStatus(state, props)
  };
};

const mapDispatchToProps = (dispatch) => ({
  closePayment: () => dispatch(closePayment())
});

class Payment extends Component {
  render() {
    return (
      <div className="payment-root" style={{ zIndex: this.props.payment ? 99 : -1 }}>
        {
          this.props.payment &&
          <Modal closeModal={() => this.props.closePayment()}>
            <BilPay
              shopName="BilPay DEMO Shop"
              publicKey="GDQ4HUXJXNKSKZD56HDXWUD3FTD7KCF7V3O4ZDZQD6RXFRSATHQIKXYI"
              amount={this.props.total}
              additionalInfo= {{ merchantOrderID: String(parseInt(Math.random() * 100000, 10)) }}
            />
          </Modal>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);