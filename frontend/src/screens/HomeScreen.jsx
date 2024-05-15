import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SortingComponent from '../components/Sorting';
import { useGetProductsQuery } from '../slices/productApiSlice';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setSortedProducts(products);
    }
  }, [products]);

  const handleSort = (sortOrder) => {
    const sorted = [...products].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
    setSortedProducts(sorted);
  };

  return (
    <>
      <SortingComponent handleSort={handleSort} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Our Services</h1>
          <Row>
            {sortedProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
