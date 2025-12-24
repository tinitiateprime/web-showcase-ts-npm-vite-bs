import { useEffect, useMemo, useRef, useState } from "react";
import { Container, Row, Col, Card, Button, ProgressBar, Form, ListGroup, Badge } from "react-bootstrap";
import { FaPlay, FaPause, FaPlus, FaTrash } from "react-icons/fa";

type Track = {
  title: string;
  artist: string;
  duration: number; // seconds
  src: string;
  cover?: string;
};

const Audio = () => {
  const tracks: Track[] = useMemo(
    () => [
      {
        title: "Focus Beats",
        artist: "TINITIATE Studio",
        duration: 180,
        src: "/audio/focus-beats.mp3",
        cover: "https://via.placeholder.com/80",
      },
      {
        title: "Calm Piano",
        artist: "TINITIATE Studio",
        duration: 210,
        src: "/audio/calm-piano.mp3",
        cover: "https://via.placeholder.com/80",
      },
      {
        title: "Lo-fi Chill",
        artist: "TINITIATE Studio",
        duration: 240,
        src: "/audio/lofi-chill.mp3",
        cover: "https://via.placeholder.com/80",
      },
    ],
    []
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // seconds
  const [volume, setVolume] = useState(0.8);
  const [playlist, setPlaylist] = useState<Track[]>([]);

  // keep volume in sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  // keep progress in sync + cleanup listener
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrack]);

  const playTrack = async (track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    // if switching track
    if (!currentTrack || currentTrack.src !== track.src) {
      setCurrentTrack(track);
      setProgress(0);

      // set src and play
      audio.src = track.src;
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    // same track toggle
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setProgress(value);
  };

  const addToPlaylist = (track: Track) => {
    setPlaylist((prev) => (prev.some((t) => t.src === track.src) ? prev : [...prev, track]));
  };

  const removeFromPlaylist = (track: Track) => {
    setPlaylist((prev) => prev.filter((t) => t.src !== track.src));
  };

  const formatTime = (sec: number) => {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, "0")}`;
  };

  const duration = currentTrack?.duration ?? 0;
  const percent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <Container className="py-4">
      <Row className="g-3">
        <Col md={7}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white fw-bold">🎵 Audio Player</Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={currentTrack?.cover || "https://via.placeholder.com/80"}
                  alt="cover"
                  width={80}
                  height={80}
                  style={{ borderRadius: 12, objectFit: "cover" }}
                />
                <div>
                  <div className="fw-bold">{currentTrack ? currentTrack.title : "Select a track"}</div>
                  <div className="text-muted small">{currentTrack ? currentTrack.artist : "—"}</div>
                  {currentTrack && <Badge bg={isPlaying ? "success" : "secondary"}>{isPlaying ? "Playing" : "Paused"}</Badge>}
                </div>
              </div>

              <div className="mb-2 d-flex justify-content-between small text-muted">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <ProgressBar now={percent} className="mb-2" />

              <Form.Range
                min={0}
                max={duration || 0}
                step={1}
                value={Math.min(progress, duration)}
                onChange={(e) => seek(Number(e.target.value))}
                disabled={!currentTrack}
              />

              <div className="d-flex align-items-center justify-content-between mt-3">
                <Button
                  variant={isPlaying ? "danger" : "success"}
                  onClick={() => currentTrack && playTrack(currentTrack)}
                  disabled={!currentTrack}
                >
                  {isPlaying ? <FaPause className="me-2" /> : <FaPlay className="me-2" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>

                <div className="d-flex align-items-center gap-2" style={{ width: 220 }}>
                  <span className="small text-muted">🔊</span>
                  <Form.Range
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                  />
                  <span className="small text-muted">{Math.round(volume * 100)}%</span>
                </div>
              </div>

              {/* Hidden audio element */}
              <audio ref={audioRef} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="shadow-sm border-0 mb-3">
            <Card.Header className="fw-bold">🎧 Tracks</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {tracks.map((t) => {
                  const active = currentTrack?.src === t.src;
                  return (
                    <ListGroup.Item key={t.src} className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="fw-semibold">{t.title}</div>
                        <div className="text-muted small">
                          {t.artist} • {formatTime(t.duration)}
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <Button size="sm" variant={active && isPlaying ? "danger" : "success"} onClick={() => playTrack(t)}>
                          {active && isPlaying ? <FaPause /> : <FaPlay />}
                        </Button>
                        <Button size="sm" variant="outline-primary" onClick={() => addToPlaylist(t)}>
                          <FaPlus />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0">
            <Card.Header className="fw-bold">📃 Playlist</Card.Header>
            <Card.Body>
              {playlist.length === 0 ? (
                <div className="text-muted">No items in playlist</div>
              ) : (
                <ListGroup>
                  {playlist.map((t) => (
                    <ListGroup.Item key={t.src} className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="fw-semibold">{t.title}</div>
                        <div className="text-muted small">{t.artist}</div>
                      </div>
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="outline-success" onClick={() => playTrack(t)}>
                          <FaPlay />
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => removeFromPlaylist(t)}>
                          <FaTrash />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Audio;
