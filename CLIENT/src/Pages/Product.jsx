import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Add, Remove } from '@material-ui/icons'
import { useLocation } from "react-router-dom"
import { publicRequest } from '../requestMethods'
import { addProduct } from '../redux/cartRedux'
import { useDispatch, useSelector } from 'react-redux'
import { mobile } from "../responsive";

const Container = styled.div`

`

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`

const ImgContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
    font-weight: 200;
`

const Desc = styled.p`
    margin: 20px 0px;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption = styled.option`

`

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`

const AmmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Ammount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    font-weight: 500;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    opacity: ${props => props.disabled ? "0.6" : "1"};
    pointer-events: ${props => props.disabled ? "none" : "auto"};

    &:hover {
        background-color: #f8f4f4;
        transform: scale(1.01);
    }
`

const Quantity = styled.span`
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
    margin-left: 20px;
`;

const Product = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.user.currentUser)
    const [checkAdmin, SetCheckAdmin] = React.useState(false)
    
    
    React.useEffect(() => {
        if(currentUser) {
            const isAdmin = currentUser.isAdmin
            SetCheckAdmin(isAdmin)
            console.log("isAdmin : ", isAdmin);
        }
    }, [currentUser])


    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id)
                setProduct(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getProduct()
    }, [id])

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1)
        }
        if (type === "inc") {
            if (quantity < product.quantity) {
                setQuantity(quantity + 1)
            }
        }
    }

    //generate Id
    const [counter, setCounter] = useState(0);
  
    const generateId = () => {
        setCounter(prevCounter => prevCounter + 1)
        return counter
    }

    const handleCLick = () => {
        // update cart
        const productId = generateId()
        dispatch( addProduct( { ...product, quantity, productId, } ) )
        console.log("here are the passed data",{ ...product, quantity, productId})
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    {product.quantity === 0 ? (
                        <span>Out of Stock</span>
                    ) : (
                        <>
                            <Quantity>Available Quantity: {product.quantity}</Quantity>
                            <FilterContainer>
                            </FilterContainer>
                            <AddContainer>
                                <AmmountContainer>
                                    <Remove
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleQuantity("dec")}
                                        disabled={quantity === 1}
                                    />
                                    <Ammount>{quantity}</Ammount>
                                    <Add
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleQuantity("inc")}
                                        disabled={quantity === product.quantity}
                                    />
                                </AmmountContainer>
                                <Button onClick={handleCLick} disabled={product.quantity === 0 || currentUser === null || checkAdmin}>
                                    {product.quantity === 0 ? "Out of Stock" : "ADD TO CART"}
                                </Button>
                            </AddContainer>
                        </>
                    )}
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product