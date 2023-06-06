import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
//import { ImCross } from "react-icons/im";
import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";
//import BuyCredits from "../Stripe/BuyCredits";
import { Navigate, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const Pricing = ({
  data,
  price,
  background,
  shadow = "#a0c5fa",
  buttonContent,
  currency = "PKR",
  subTitle,
  priceText,
  headerText,
}) => {
  const [products, setProducts] = useState({
    name: "Buy Credits",
    price: price,
  });
  const priceForStripe = products.price * 100;
  const navigation = useNavigate();
  const payNow = async (token) => {
    try {
      var date = new Date();
      const response = await axios({
        url: "http://localhost:1337/pricingplan/payment",
        method: "POST",
        data: {
          amount: products.price * 100,
          token,
          date,
          check: true,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailue();
      console.log(error);
    }
  };
  const handleFailue = () => {
    MySwal.fire({
      icon: "error",
      title: "Error occured",
      time: 4000,
    });
  };
  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment Successful",
      time: 4000,
    });
  };

  return (
    <MainContainer shadow={shadow}>
      <Header background={background}>{headerText}</Header>
      {price !== undefined && (
        <PricingContainer>
          <PriceContainer>
            <CurrencyContainer>
              <span>{currency}</span>
            </CurrencyContainer>
            <Price>
              <span>{price}</span>
            </Price>
          </PriceContainer>
          {subTitle && (
            <SubTitle>
              <h4>{subTitle}</h4>
            </SubTitle>
          )}
          {priceText && (
            <PriceText>
              <h5>{priceText}</h5>
            </PriceText>
          )}
        </PricingContainer>
      )}
      {buttonContent && (
        <StripeCheckout
          stripeKey="pk_test_51Mqj7DEYINMUWJgYQTw78v33czX8EnKiPTrDoFuqT9AqIPNUHicvCfzJCoH36A9mIjX8Tvv7YXML7TtlipaSPc8u00HuVbHO9d"
          billingAddress
          shippingAddress
          amount={priceForStripe}
          description={`Your total is ${products.price}`}
          token={payNow}
        />
      )}
      {data && (
        <DataContainer>
          <ul>
            {data.map((dt, index) => (
              <li key={index}>
                {dt.value ? (
                  <FaCheck className="true" />
                ) : (
                  <ImCross className="false" />
                )}
                {dt.text}
              </li>
            ))}
          </ul>
        </DataContainer>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap");
  font-family: "Raleway", sans-serif;
  width: 20rem;
  min-height: 40rem;
  height: max-content;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  color: #1d3557;
  box-shadow: 0 8px 14px -6px ${(props) => props.shadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: 0 8px 26px -6px ${(props) => props.shadow};
    margin-bottom: 0.4rem;
  }
`;

const Header = styled.div`
  margin: 0.6rem;
  height: 4rem;
  background-color: #ebf3fd;
  background-image: ${(props) => props.background};
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  font-weight: 600;
`;

const PricingContainer = styled.div`
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
`;

const PriceContainer = styled.div`
  display: flex;
`;

const CurrencyContainer = styled.div`
  margin-top: 0.5rem;
  margin-right: 0.2rem;
`;

const Price = styled.div`
  span {
    font-size: 3rem;
  }
`;

const Duration = styled.div`
  margin-top: 2rem;
`;

const SubTitle = styled.div`
  text-transform: uppercase;
  text-align: center;
  margin: 0.4rem 0 1.3rem 0;
`;

const PriceText = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  text-align: center;
  font-weight: 100;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

const Button = styled.button`
  display: flex;
`;

const DataContainer = styled.div`
  ul {
    list-style-type: none;
    li {
      display: flex;
      align-items: center;
      .true {
        color: #34f034;
        font-size: 1rem;
      }
      .false {
        color: #f54343;
      }
      svg {
        margin-right: 0.5rem;
        font-size: 0.8rem;
      }
      margin-bottom: 1rem;
    }
  }
`;

Pricing.propTypes = {
  data: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  duration: PropTypes.oneOf(["y", "m"]).isRequired,
  buttonContent: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
};

export default Pricing;
