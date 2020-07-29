import React, { Component } from "react";
import api from "../../services/api";
import { Card, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Product extends Component {
  state = {
    product: [],
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/products/${id}`);
    this.setState({ product: response.data });
  }
  render() {
    const { product } = this.state;
    return (
      <Card className="shadow mt-2 p-3 m-3">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>

        <Alert variant="info">
          {`URL:`}
          <a href={product.url}>{product.url}</a>
        </Alert>

        <Link to={"/"} className="btn btn-secondary">
          Voltar
        </Link>
      </Card>
    );
  }
}
