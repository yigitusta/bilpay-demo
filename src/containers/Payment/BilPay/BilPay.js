import React, { Component } from 'react';
import { QRCode } from 'react-qr-svg';
import posed from 'react-pose';
import Success from './Success';
import './Bilpay.css';
window.url = "https://stellar.altugankarali.com/api/merchant/authorize";

class BilPay extends Component {
  componentDidMount() {
    this.sendAuthorizationRequest();
    window.success = () => this.setState.call(this, { status: "success" });
  }
  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }
  state = {
    status: "loading",
    url: window.url,
    transactionID: null,
    publicKey: null,
    amount: null
  }

  renderQRCode() {
    return (
      <QRCode
        level="Q"
        style={{ width: 256 }}
        value={JSON.stringify({
          publicKey: this.state.publicKey,
          amount: this.state.amount,
          transactionID: this.state.transactionID,
          additionalInfo: this.props.additionalInfo
        })}
      />
    );
  }

  sendAuthorizationRequest() {
    fetch(this.state.url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant_public_key: this.props.publicKey,
        shop_name: this.props.shopName,
        additional_info: this.props.additionalInfo,
        amount: this.props.amount
      })
    })
    .then(response => response.json())
    .then(result => {
      setTimeout(() => {
        if (!!result.id) { // successfull
          this.setState({
            status: "authorized",
            transactionID: result.id,
            publicKey: result.merchant_public_key,
            shopName: result.shop_name,
            amount: result.amount,
            additionalInfo: result.additional_info
          });
          this.pollTransactionStatus();
        } else { // error
          this.setState({ status: "authorizationError" });
        }
      }, 300);
    });
  }

  pollTransactionStatus() {
    this.interval && clearInterval(this.interval);
    this.interval = setInterval(function() {
      fetch(this.state.url + `/${this.state.transactionID}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status === "received") {
          this.setState({ status: "success" });
          clearInterval(this.interval);
        }
      });
    }.bind(this), 1000);
  }

  renderLoading() {
    return (
      <div>LOADING...</div>
    );
  }

  renderError() {
    return (
      <div>Authorization Error...</div>
    );
  }

  render() {
    if (this.state.status === "success") {
      this.interval && clearInterval(this.interval);
    }
    const Box = posed.div({
      hoverable: true,
      init: { scale: 1 },
      hover: { scale: 1.2 }
    });

    let content;
    switch (this.state.status) {
      case "loading":
      default:
        content = this.renderLoading();
        break;
      case "authorizationError":
        content = this.renderError();
        break;
      case "authorized":
        content = this.renderQRCode();
        break;
      case "success":
        content = <Success />;
        break;
    }

    return (
      <div className="bilpay-wrapper">
        <h1 className="bilpay-header">Pay With BilPay</h1>
          <Box className="bilpay-content-wrapper">
            {content}
          </Box>
      </div>
    );
  }
}

export default BilPay;