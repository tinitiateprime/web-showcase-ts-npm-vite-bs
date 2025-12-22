import React, { useState } from "react";
import { Container, Row, Col, Card, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Rnd } from "react-rnd";

const SHAPE = "SHAPE";

const shapeList = [
  { label: "Rectangle", type: "rect" },
  { label: "Ellipse", type: "ellipse" },
  { label: "Diamond", type: "diamond" },
  { label: "Parallelogram", type: "parallelogram" },
  { label: "Start/End", type: "terminator" },
  { label: "Process", type: "process" },
  { label: "Decision", type: "decision" },
  { label: "Input/Output", type: "io" },
  { label: "Arrow Right", type: "arrow" },
  { label: "Double Arrow", type: "doubleArrow" },
  { label: "Curved Arrow", type: "curvedArrow" },
  { label: "Cloud", type: "cloud" },
  { label: "Cylinder", type: "cylinder" },
  { label: "Database", type: "database" },
  { label: "Stick Figure", type: "stick" },
];

const ShapeIcon = ({ shape }) => {
  const style = {
    width: 30,
    height: 20,
    border: "2px solid black",
    backgroundColor: "white",
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 10,
  };

  switch (shape.type) {
    case "rect": return <div style={style} />;
    case "ellipse": return <div style={{ ...style, borderRadius: "50%" }} />;
    case "diamond": return <div style={{ ...style, transform: "rotate(45deg)", width: 20, height: 20 }} />;
    case "parallelogram": return <div style={{ ...style, transform: "skewX(-20deg)", width: 40 }} />;
    case "terminator": return <div style={{ ...style, borderRadius: "15px" }} />;
    case "process": return <div style={style} />;
    case "decision": return <div style={{ ...style, transform: "rotate(45deg)", width: 20, height: 20 }} />;
    case "io": return <div style={{ ...style, transform: "skewX(20deg)" }} />;
    case "arrow": return <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "12px solid black", display: "inline-block", marginRight: 10 }} />;
    case "doubleArrow": return <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "12px solid black", borderRight: "12px solid black", display: "inline-block", marginRight: 10 }} />;
    case "curvedArrow": return <div style={{ width: 16, height: 16, borderTop: "2px solid black", borderRight: "2px solid black", borderRadius: "0 100% 0 0", transform: "rotate(45deg)", display: "inline-block", marginRight: 10 }} />;
    case "cloud": return <div style={{ width: 30, height: 20, borderRadius: "50%", backgroundColor: "white", border: "2px solid black", boxShadow: "6px 0 0 white, -6px 0 0 white", display: "inline-block", marginRight: 10 }} />;
    case "cylinder":
    case "database": return <div style={{ width: 24, height: 30, border: "2px solid black", borderRadius: "50% / 10%", backgroundColor: "white", display: "inline-block", marginRight: 10 }} />;
    case "stick":
      return (
        <svg width="24" height="30" style={{ marginRight: 10, display: "inline-block", verticalAlign: "middle" }}>
          <circle cx="12" cy="5" r="4" stroke="black" strokeWidth="2" fill="white" />
          <line x1="12" y1="9" x2="12" y2="20" stroke="black" strokeWidth="2" />
          <line x1="4" y1="14" x2="20" y2="14" stroke="black" strokeWidth="2" />
          <line x1="12" y1="20" x2="4" y2="28" stroke="black" strokeWidth="2" />
          <line x1="12" y1="20" x2="20" y2="28" stroke="black" strokeWidth="2" />
        </svg>
      );
    default: return null;
  }
};

const Shape = ({ shape }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: SHAPE,
    item: { shape },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="d-flex align-items-center px-2 py-1 border-bottom" style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}>
      <ShapeIcon shape={shape} />
      <span className="text-muted small">{shape.label}</span>
    </div>
  );
};

const Canvas = ({ droppedItems, setDroppedItems, zoom, setZoom }) => {
  const [, drop] = useDrop(() => ({
    accept: SHAPE,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const newItem = {
          id: Date.now(),
          shape: item.shape,
          x: offset.x - 300,
          y: offset.y - 100,
        };
        setDroppedItems((prev) => [...prev, newItem]);
      }
    },
  }));

  return (
    <div ref={drop} className="border rounded position-relative overflow-hidden" style={{ height: "600px", background: "#ffffff", border: "2px dashed #ced4da", transform: `scale(${zoom})`, transformOrigin: "top left" }}>
      {droppedItems.map((item) => (
        <Rnd key={item.id} default={{ x: item.x, y: item.y, width: 100, height: 60 }} bounds="parent">
          <div className="d-flex align-items-center justify-content-center h-100 w-100">
            <ShapeIcon shape={item.shape} />
          </div>
        </Rnd>
      ))}
    </div>
  );
};

const DragDropPage = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));

  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid className="p-4">
        <Row className="mb-3">
          <Col>
            <ButtonGroup>
              <Button variant="outline-primary">File</Button>
              <Button variant="outline-primary">Edit</Button>
              <Button variant="outline-primary" onClick={handleZoomIn}>Zoom In</Button>
              <Button variant="outline-primary" onClick={handleZoomOut}>Zoom Out</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Card className="p-3">
              <h6 className="mb-3">🧰 Toolbox</h6>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100">
                  General
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  {shapeList.map((shape, index) => (
                    <Dropdown.Item key={index} className="p-0">
                      <Shape shape={shape} />
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Card>
          </Col>
          <Col md={10}>
            <Card className="p-3">
              <h6 className="mb-3">🧱 Canvas</h6>
              <Canvas droppedItems={droppedItems} setDroppedItems={setDroppedItems} zoom={zoom} setZoom={setZoom} />
            </Card>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};


export default DragDropPage;

