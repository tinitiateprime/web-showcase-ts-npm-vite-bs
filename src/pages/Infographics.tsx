import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ProgressBar,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale);

const Infographics = () => {
  // State
  const [timeframe, setTimeframe] = useState("month");
  const [darkMode, setDarkMode] = useState(false);

  // Dynamic Chart Data based on timeframe
  const barDataMap = {
    week: [5, 10, 7, 6],
    month: [10, 30, 20, 40],
    year: [100, 150, 120, 180],
  };

  const pieData = {
    labels: ["Design", "Development", "Marketing"],
    datasets: [
      {
        data: [25, 50, 25],
        backgroundColor: ["#6610f2", "#0d6efd", "#20c997"],
      },
    ],
  };

  const barData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: `Earnings (${timeframe})`,
        data: barDataMap[timeframe],
        backgroundColor: "#0dcaf0",
        borderRadius: 4,
      },
    ],
  };

  const darkClass = darkMode ? "bg-dark text-light" : "bg-light text-dark";

  return (
    <div className={`${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`} style={{ minHeight: "100vh", padding: "30px 0" }}>
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mb-4 px-3">
          <h2 className="fw-bold">📊 Advanced Business Dashboard</h2>
          <Button variant={darkMode ? "light" : "dark"} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </Button>
        </div>

        {/* Timeframe Toggle */}
        <div className="d-flex justify-content-center mb-4">
          <ButtonGroup>
            {["week", "month", "year"].map((val) => (
              <ToggleButton
                key={val}
                id={`radio-${val}`}
                type="radio"
                variant="outline-primary"
                name="radio"
                value={val}
                checked={timeframe === val}
                onChange={(e) => setTimeframe(e.currentTarget.value)}
              >
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>

        {/* Stats Cards */}
        <Row className="mb-4 g-4">
          {[
            { title: "👥 Users", value: "23,480", badge: "active" },
            { title: "📦 Orders", value: "1,204", badge: "new" },
            { title: "💰 Revenue", value: "$124K", badge: "↑12%" },
            { title: "📈 Growth", value: "34.6%", badge: "🔥 hot" },
          ].map((item, i) => (
            <Col md={3} key={i}>
              <Card className={`shadow-lg border-0 text-center ${darkClass}`}>
                <Card.Body>
                  <h6>{item.title}</h6>
                  <h2 className="fw-bold">{item.value}</h2>
                  <Badge bg="info" className="mt-2">
                    {item.badge}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Charts */}
        <Row className="g-4">
          <Col md={6}>
            <Card className={`shadow-lg border-0 ${darkClass}`}>
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Task Distribution</h5>
              </Card.Header>
              <Card.Body>
                <Pie data={pieData} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className={`shadow-lg border-0 ${darkClass}`}>
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">Revenue - {timeframe}</h5>
              </Card.Header>
              <Card.Body>
                <Bar data={barData} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Progress Bars */}
        <Row className="mt-5 g-4">
          <Col md={4}>
            <Card className={`shadow border-0 ${darkClass}`}>
              <Card.Body>
                <h6>🚀 Project Completion</h6>
                <ProgressBar now={85} label={`85%`} striped variant="success" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={`shadow border-0 ${darkClass}`}>
              <Card.Body>
                <h6>🧠 Productivity</h6>
                <ProgressBar now={68} label={`68%`} striped variant="info" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={`shadow border-0 ${darkClass}`}>
              <Card.Body>
                <h6>📞 Support Quality</h6>
                <ProgressBar now={95} label={`95%`} striped variant="warning" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Infographics;
