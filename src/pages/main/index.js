import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./style.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  };

  prevPage = () => {
    const { page, productInfo } = this.state;

    if (page === 1) return;

    const numberPage = page - 1;
    this.loadProducts(numberPage);
  };
  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  };

  render() {
    const { products, page, productInfo } = this.state;

    return (
      <div className="product-list">
        {products.map((product) => (
          <Card className="shadow mt-2 p-3 mb-3" key={product._id}>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Link
              to={`/products/${product._id}`}
              className="btn btn-outline-primary"
            >
              Acessar
            </Link>
          </Card>
        ))}

        <Card
          className="shadow mt-2 p-1 mb-5 "
          style={{ width: "32rem", margin: "0 auto" }}
        >
          <div className="actions m-2">
            <Button
              disabled={page === 1}
              onClick={this.prevPage}
              className="disabled"
            >
              Anterior
            </Button>
            <Button
              disabled={page === productInfo.pages}
              onClick={this.nextPage}
            >
              Próximo
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
