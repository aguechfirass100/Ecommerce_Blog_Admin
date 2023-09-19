import React from 'react'
import styled from 'styled-components'
import Product from './Product'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
    -moz-user-select: none;
`

const Products = (props) => {

  const [products, setProducts] = React.useState([])
  // const [sortedProducts, setSortedProducts] = React.useState(products)
  // const [filteredProducts, setFilteredProducts] = React.useState([])

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          props.cat
            ? `http://localhost:5000/api/products?category=${props.cat}`
            : "http://localhost:5000/api/products"
        )
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [props.cat])

  // React.useEffect(() => {
  //   props.cat && setFilteredProducts(
  //     products.filter((item) =>
  //       Object.entries(props.filters).every(([key, value]) =>
  //         item[key].includes(value)
  //       )
  //     )
  //   )
  // }, [products, props.cat, props.filters])

  React.useEffect(() => {
    if (props.sorted === "newest") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )
    } else if (props.sorted === "asc") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      )
    } else if (props.sorted === "desc") {
      setProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      )
    }
  }, [props.sorted])

  console.log("here are the products", products)
  // console.log("here are the sorted products", sortedProducts)
  console.log("category", props.cat)
  // console.log("sorted", props.sorted)

  return (
    <Container>
        {props.cat
          ? products.map(item => <Product item={item} key={item.id} />)
          : products
              .slice(0, 8)
              .map(item => <Product item={item} key={item.id} />)
        }
    </Container>
  )
}

export default Products