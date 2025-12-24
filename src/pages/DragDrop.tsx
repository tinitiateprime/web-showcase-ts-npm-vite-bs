import { useMemo, useRef, useState } from "react";
import { Container, Row, Col, Card, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Rnd } from "react-rnd";
import type { XYCoord } from "dnd-core";

const SHAPE = "SHAPE" as const;

type ShapeType =
  | "rect"
  | "ellipse"
  | "diamond"
  | "parallelogram"
  | "terminator"
  | "process"
  | "decision"
  | "io"
  | "arrow"
  | "doubleArrow"
  | "curvedArrow"
  | "cloud"
  | "cylinder"
  | "database"
  | "stick";

type ShapeDef = {
  label: string;
  type: ShapeType;
};

type DragItem = {
  shape: ShapeDef;
};

type DroppedItem = {
  id: number;
  shape: ShapeDef;
  x: number;
  y: number;
  width: number;
  height: number;
};

const shapeList: ShapeDef[] = [
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

function ShapeIcon({ shape }: { shape: ShapeDef }) {
  const style: React.CSSProperties = useMemo(
    () => ({
      width: 30,
      height: 20,
      border: "2px solid black",
      backgroundColor: "white",
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: 10,
    }),
    []
  );

  switch (shape.type) {
    case "rect":
      return <div style={style} />;

    case "ellipse":
      return <div style={{ ...style, borderRadius: "50%" }} />;

    case "diamond":
      return <div style={{ ...style, transform: "rotate(45deg)", width: 20, height: 20 }} />;

    case "parallelogram":
      return <div style={{ ...style, transform: "skewX(-20deg)", width: 40 }} />;

    case "terminator":
      return <div style={{ ...style, borderRadius: "15px" }} />;

    case "process":
      return <div style={style} />;

    case "decision":
      return <div style={{ ...style, transform: "rotate(45deg)", width: 20, height: 20 }} />;

    case "io":
      return <div style={{ ...style, transform: "skewX(20deg)" }} />;

    case "arrow":
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderLeft: "12px solid black",
            display: "inline-block",
            marginRight: 10,
          }}
        />
      );

    case "doubleArrow":
      return (
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderLeft: "12px solid black",
            borderRight: "12px solid black",
            display: "inline-block",
            marginRight: 10,
          }}
        />
      );

    case "curvedArrow":
      return (
        <div
          style={{
            width: 16,
            height: 16,
            borderTop: "2px solid black",
            borderRight: "2px solid black",
            borderRadius: "0 100% 0 0",
            transform: "rotate(45deg)",
            display: "inline-block",
            marginRight: 10,
          }}
        />
      );

    case "cloud":
      return (
        <div
          style={{
            width: 30,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "white",
            border: "2px solid black",
            boxShadow: "6px 0 0 white, -6px 0 0 white",
            display: "inline-block",
            marginRight: 10,
          }}
        />
      );

    case "cylinder":
    case "database":
      return (
        <div
          style={{
            width: 24,
            height: 30,
            border: "2px solid black",
            borderRadius: "50% / 10%",
            backgroundColor: "white",
            display: "inline-block",
            marginRight: 10,
          }}
        />
      );

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

    default:
      return null;
  }
}

function Shape({ shape }: { shape: ShapeDef }) {
  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>(() => ({
    type: SHAPE,
    item: { shape },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        // react-dnd connector typing is not directly compatible with React.Ref, so we call it in a callback.
        drag(node);
      }}
      className="d-flex align-items-center px-2 py-1 border-bottom"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
    >
      <ShapeIcon shape={shape} />
      <span className="text-muted small">{shape.label}</span>
    </div>
  );
}

function Canvas({
  droppedItems,
  setDroppedItems,
  zoom,
}: {
  droppedItems: DroppedItem[];
  setDroppedItems: React.Dispatch<React.SetStateAction<DroppedItem[]>>;
  zoom: number;
}) {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop<DragItem>(() => ({
    accept: SHAPE,
    drop: (item, monitor) => {
      const client = monitor.getClientOffset() as XYCoord | null;
      const rect = canvasRef.current?.getBoundingClientRect();

      if (!client || !rect) return;

      // Convert client coords into canvas coords, and account for zoom
      const x = (client.x - rect.left) / zoom;
      const y = (client.y - rect.top) / zoom;

      const newItem: DroppedItem = {
        id: Date.now(),
        shape: item.shape,
        x,
        y,
        width: 110,
        height: 70,
      };

      setDroppedItems((prev) => [...prev, newItem]);
    },
  }));

  return (
    <div
      ref={(node) => {
        canvasRef.current = node;
        drop(node);
      }}
      className="border rounded position-relative overflow-hidden"
      style={{
        height: "600px",
        background: "#ffffff",
        border: "2px dashed #ced4da",
        transform: `scale(${zoom})`,
        transformOrigin: "top left",
      }}
    >
      {droppedItems.map((item) => (
        <Rnd
          key={item.id}
          default={{ x: item.x, y: item.y, width: item.width, height: item.height }}
          bounds="parent"
        >
          <div className="d-flex align-items-center justify-content-center h-100 w-100">
            <ShapeIcon shape={item.shape} />
          </div>
        </Rnd>
      ))}
    </div>
  );
}

const DragDropPage = () => {
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [zoom, setZoom] = useState<number>(1);

  const handleZoomIn = () => setZoom((z) => Math.min(Number((z + 0.1).toFixed(2)), 2));
  const handleZoomOut = () => setZoom((z) => Math.max(Number((z - 0.1).toFixed(2)), 0.5));

  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid className="p-4">
        <Row className="mb-3">
          <Col>
            <ButtonGroup>
              <Button variant="outline-primary">File</Button>
              <Button variant="outline-primary">Edit</Button>
              <Button variant="outline-primary" onClick={handleZoomIn}>
                Zoom In
              </Button>
              <Button variant="outline-primary" onClick={handleZoomOut}>
                Zoom Out
              </Button>
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
              <Canvas droppedItems={droppedItems} setDroppedItems={setDroppedItems} zoom={zoom} />
            </Card>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default DragDropPage;
