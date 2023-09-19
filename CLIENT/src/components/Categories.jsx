import React from 'react'
import styled from 'styled-components'
import { categories } from '../data'
import CategoryItem from './CategoryItem'
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    -moz-user-select: none;
    ${mobile({ padding: "0px", flexDirection:"column" })}
`

const Header = styled.h1`
    font-size: 30px;
    margin-left: 20px;
`

const Categories = () => {
    return (
        <>

        <Header>Categories</Header>
        <Container>
            {categories.map(item => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </Container>
        </>
    )
}

export default Categories