import { FavoriteBorderOutlined, SearchOutlined, ShoppingBasketOutlined } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2); 
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10;
    transition: all 0.5s ease;
    cursor: pointer;
    -moz-user-select: none;
`
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 300px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center; 
    background-color: #f5fbfd; 
    position: relative;
    -moz-user-select: none;

    &:hover ${Info} {
        opacity: 1;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`
const Image = styled.img`
    height: 75%;
    z-index: 2;
    height: 300px;
    width: 180px;
`
const Icon = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1); 
    }
`

const Product = (props) => {
  return (
    <Container>
        <Circle/>
        <Image src={props.item.img} />
        <Info>
            {/* <Icon>
                <ShoppingBasketOutlined/>
            </Icon> */}
            <Icon>
                <Link to={`/product/${props.item._id}`}>
                    <SearchOutlined/>
                </Link>
            </Icon>
            {/* <Icon>
                <FavoriteBorderOutlined/>
            </Icon> */}
            <Icon>${props.item.price}</Icon>
        </Info>
    </Container>
  )
}

export default Product