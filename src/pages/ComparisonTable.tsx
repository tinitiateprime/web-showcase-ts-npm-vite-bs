import React, { useState } from "react";
import {
  Funnel,
  Search as SearchIcon,
  CheckLg,
  XLg,
  BoxSeam,
} from "react-bootstrap-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Table,
  Badge,
} from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js features
ChartJS.register(ArcElement, Tooltip, Legend);

interface Product {
  name: string;
  category: string;
  price: number;
  available: boolean;
  quantity: number;
}

const ComparisonPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("All");

  const products: Product[] = [
    { name: "Apple", category: "Fruits", price: 2, available: true, quantity: 50 },
    { name: "Banana", category: "Fruits", price: 1, available: true, quantity: 80 },
    { name: "Mango", category: "Fruits", price: 3, available: false, quantity: 30 },
    { name: "Carrot", category: "Vegetables", price: 1.5, available: true, quantity: 60 },
    { name: "Potato", category: "Vegetables", price: 1, available: true, quantity: 90 },
    { name: "Orange", category: "Fruits", price: 2.5, available: false, quantity: 40 },
  ];

  const filtered = products.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      item.name.toLowerCase().includes(query.toLowerCase())
  );

  const chartData = {
    labels: filtered.map((item) => item.name),
    datasets: [
      {
        label: "Quantity",
        data: filtered.map((item) => item.quantity),
        backgroundColor: [
          "#4e79a7",
          "#f28e2b",
          "#e15759",
          "#76b7b2",
          "#59a14f",
          "#edc948",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false as const,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #f8f9fa, #e0e7ff)",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <Container fluid>
        <Row className="g-4">
          {/* Sidebar Filters */}
          <Col md={4}>
            <Card className="shadow-sm rounded-4 border-0">
              <Card.Body>
                <h4 className="text-primary fw-bold mb-4">
                  <Funnel className="me-2" size={22} />
                  Filter Products
                </h4>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-secondary">
                      Category
                    </Form.Label>
                    <Form.Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>All</option>
                      <option>Fruits</option>
                      <option>Vegetables</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-secondary">
                      Search
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <SearchIcon />
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Table + Chart */}
          <Col md={8}>
            <Card className="shadow rounded-4 border-0 mb-4">
              <Card.Body>
                <h4 className="text-primary fw-bold mb-4">
                  <BoxSeam className="me-2" size={22} />
                  Product Comparison Table
                </h4>
                <Table responsive hover bordered className="align-middle">
                  <thead className="table-primary">
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price ($)</th>
                      <th>Availability</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length > 0 ? (
                      filtered.map((item, idx) => (
                        <tr key={idx}>
                          <td className="fw-semibold">{item.name}</td>
                          <td>
                            <Badge
                              bg={item.category === "Fruits" ? "success" : "info"}
                            >
                              {item.category}
                            </Badge>
                          </td>
                          <td className="text-end">{item.price.toFixed(2)}</td>
                          <td>
                            {item.available ? (
                              <span className="text-success fw-semibold">
                                <CheckLg className="me-1" />
                                Available
                              </span>
                            ) : (
                              <span className="text-danger fw-semibold">
                                <XLg className="me-1" />
                                Unavailable
                              </span>
                            )}
                          </td>
                          <td className="text-end">{item.quantity}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center text-muted">
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Chart Card */}
            <Card className="shadow rounded-4 border-0 p-3">
              <h5 className="text-center fw-bold mb-3 text-primary">Quantity Distribution</h5>
              <div className="d-flex justify-content-center">
                <div style={{ width: "250px", height: "250px" }}>
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ComparisonPage;
