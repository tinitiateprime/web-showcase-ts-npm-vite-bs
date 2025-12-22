import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  ToggleButton,
  ProgressBar,
  ListGroup,
} from "react-bootstrap";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaVolumeUp,
  FaDownload,
  FaShareAlt,
  FaTrash,
} from "react-icons/fa";

const sampleTracks = [
  {
    title: "Lofi Chill Beats",
    artist: "DJ Relax",
    duration: 180,
    cover: "https://via.placeholder.com/150/6610f2/ffffff?text=Lofi",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Electro Pop",
    artist: "Nova",
    duration: 210,
    cover: "https://via.placeholder.com/150/20c997/ffffff?text=Electro",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Jazz Vibes",
    artist: "Smooth Sax",
    duration: 240,
    cover: "https://via.placeholder.com/150/ffc107/ffffff?text=Jazz",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

const AudioDashboard = () => {
  const [theme, setTheme] = useState("light");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [volume]);

  const handlePlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const addToPlaylist = (track) => {
    if (!playlist.find((t) => t.title === track.title)) {
      setPlaylist([...playlist, track]);
    }
  };

  const removeFromPlaylist = (track) => {
    setPlaylist(playlist.filter((t) => t.title !== track.title));
  };

  const themeClass = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";

  return (
    <div className={`position-relative ${themeClass}`} style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Waveform animation */}
      <div className="waveform-bg"></div>

      <Container className="py-4 position-relative" style={{ zIndex: 2 }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">🎧 Ultimate Audio Player</h2>
          <Button
            variant={theme === "dark" ? "light" : "dark"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
          </Button>
        </div>

        {/* Cards */}
        <Row className="g-4">
          {sampleTracks.map((track, idx) => (
            <Col md={4} key={idx}>
              <Card className={`shadow border-0 ${themeClass}`}>
                <Card.Img variant="top" src={track.cover} />
                <Card.Body className="text-center">
                  <h5>{track.title}</h5>
                  <p className="text-muted">{track.artist}</p>
                  <div className="d-flex justify-content-around my-2">
                    <Button
                      variant={currentTrack?.title === track.title && isPlaying ? "danger" : "success"}
                      onClick={() =>
                        currentTrack?.title === track.title
                          ? setIsPlaying(!isPlaying)
                          : handlePlay(track)
                      }
                    >
                      {currentTrack?.title === track.title && isPlaying ? <FaPause /> : <FaPlay />}
                    </Button>
                    <Button variant="outline-primary" onClick={() => addToPlaylist(track)}>
                      ➕ Add
                    </Button>
                  </div>
                  <div className="d-flex justify-content-around mt-2">
                    <a href={track.src} download target="_blank" rel="noreferrer">
                      <Button variant="outline-success"><FaDownload /></Button>
                    </a>
                    <Button variant="outline-warning" onClick={() => alert("Sharing: " + track.title)}>
                      <FaShareAlt />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Playlist */}
        {playlist.length > 0 && (
          <div className={`mt-5 p-3 rounded ${theme === "dark" ? "bg-secondary" : "bg-white"} shadow`}>
            <h5>📁 My Playlist</h5>
            <ListGroup variant="flush">
              {playlist.map((track, i) => (
                <ListGroup.Item key={i} className={themeClass}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{track.title}</span>
                    <div>
                      <Button size="sm" variant="outline-primary" onClick={() => handlePlay(track)}>
                        ▶ Play
                      </Button>{" "}
                      <Button size="sm" variant="outline-danger" onClick={() => removeFromPlaylist(track)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}

        {/* Now Playing */}
        {currentTrack && (
          <div className={`mt-5 p-4 rounded shadow ${theme === "dark" ? "bg-secondary" : "bg-white"}`}>
            <Row className="align-items-center">
              <Col md={3}>
                <strong>Now Playing:</strong>
                <div>{currentTrack.title} - <small>{currentTrack.artist}</small></div>
              </Col>
              <Col md={6}>
                <ProgressBar
                  animated
                  now={(progress / currentTrack.duration) * 100}
                  label={`${Math.floor(progress)}s / ${currentTrack.duration}s`}
                />
              </Col>
              <Col md={3} className="text-end">
                <FaVolumeUp className="me-2" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  style={{ width: "100px" }}
                />
              </Col>
            </Row>
            <audio ref={audioRef} src={currentTrack.src} />
          </div>
        )}
      </Container>

      {/* Waveform CSS */}
      <style>{`
        .waveform-bg {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 140px;
          background: repeating-linear-gradient(
            to right,
            #0d6efd 0px,
            #0d6efd 3px,
            transparent 3px,
            transparent 6px
          );
          animation: wave 1.2s linear infinite;
          opacity: 0.05;
          z-index: 0;
        }

        @keyframes wave {
          from { background-position-x: 0; }
          to { background-position-x: 60px; }
        }
      `}</style>
    </div>
  );
};

export default AudioDashboard;
