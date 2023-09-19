import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { getUserOrders, cancelOrder } from '../redux/apiCalls';
import { mobile } from '../responsive';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const OrderItem = styled.div`
  margin: 20px;
  width: 300px;
  border: 1px solid lightgray;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const OrderInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const OrderProductTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
`;

const OrderProductPrice = styled.p`
  font-size: 18px;
  font-weight: 300;
`;

const OrderProductQuantity = styled.p`
  font-size: 18px;
  font-weight: 300;
`;

const OrderAmount = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const CancelButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Order = () => {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = React.useState([]);
    console.log(orders)
  
    // const handleCancelOrder = async (orderId) => {
    //   const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    //   if (confirmCancel) {

    //     const canceledOrder = await cancelOrder(orderId)
    //     console.log(canceledOrder)
    //     console.log(orderId)

    //     const updatedOrders = orders.map((order) => {
    //       if (order._id === orderId) {
    //         return { ...order, canceled: true };
    //       }
    //       return order;
    //     });
    //     setOrders(updatedOrders);
  
    //     window.location.reload()
    //   }
    // };
  
    React.useEffect(() => {
      const fetchOrders = async () => {
        try {
          const userId = user.currentUser._id;
          const userOrders = await getUserOrders(userId);
          setOrders(userOrders);
        } catch (error) {
          setOrders([]);
          console.log(error);
        }
      };
  
      if (user.currentUser) {
        fetchOrders();
      }
    }, [user.currentUser]);
  
    return (
        <Container>
          <Navbar />
          <Announcement />
          <Wrapper>
      <Title>Your Orders</Title>
      {orders === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          {orders.length === 0 ? (
            <p>You have no orders.</p>
          ) : (
            <OrderContainer>
              {orders.map((order) => (
                <OrderItem key={order._id}>
                  {order.products && order.products.map((product) => (
                    <React.Fragment key={product._id}>
                      <OrderImage src={product.img} alt={product.title} />
                      <OrderInfo>
                        <OrderProductTitle>{product.title}</OrderProductTitle>
                        <OrderProductPrice>$ {product.price}</OrderProductPrice>
                        <OrderProductQuantity>Quantity: {product.quantity}</OrderProductQuantity>
                        <OrderAmount>Total: $ {product.quantity * product.price}</OrderAmount>
                    <hr />
                      </OrderInfo>
                    </React.Fragment>
                  ))}
                  {!order.canceled && (
                    <React.Fragment>
                      {/* <CancelButton onClick={() => handleCancelOrder(order._id)}>Cancel Order</CancelButton> */}
                      <OrderProductQuantity>Total Quantity: {order.quantity}</OrderProductQuantity>
                      <OrderAmount>Total Amount: $ {order.amount}</OrderAmount>
                    </React.Fragment>
                  )}
                </OrderItem>
              ))}
            </OrderContainer>
          )}
        </>
      )}
    </Wrapper>
          <Newsletter />
          <Footer />
        </Container>
      );
    };
  

export default Order;
