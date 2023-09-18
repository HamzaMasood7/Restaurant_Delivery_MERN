import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchItemById } from "../../api/Items";
import { Container, Row, Col, Spinner } from "react-bootstrap";

export const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const itemData = await fetchItemById(itemId);
        setItem(itemData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  if (isLoading) {
    return (
      <Container className="py-4">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <div>Error: {error}</div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {item && (
        <Row>
          <Col md={6}>
            <img
              src={
                item.photo
                  ? item.photo
                  : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
              }
              alt="item"
              className="card-img-top"
            />
          </Col>
          <Col md={6}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};
