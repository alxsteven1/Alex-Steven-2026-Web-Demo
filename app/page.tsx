

"use client";
import { useEffect, useState, useRef } from "react";
import initPlanet3D from "@/components/3D/planet";
import { CITIES, CityData } from "@/config/cities";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [introStarted, setIntroStarted] = useState(false);
  const planetApi = useRef<any>(null);

  useEffect(() => {
    const api = initPlanet3D((cityId: string) => {
      const city = CITIES.find((c) => c.id === cityId);
      if (city) {
        setSelectedCity(city);
        setImgIndex(0);
      }
    });
    planetApi.current = api;
    return () => { if (planetApi.current?.destroy) planetApi.current.destroy(); };
  }, []);

  useEffect(() => {
    if (!selectedCity || selectedCity.imageCount <= 1) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % selectedCity.imageCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  const handleClose = () => {
    setSelectedCity(null);
    planetApi.current?.resetCamera();
  };

  const handleStartIntro = () => {
    if (introStarted) return;
    setIntroStarted(true);
    planetApi.current?.playIntro();
  };

  // Helper to split text into animate-able spans
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="letter">{char === " " ? "\u00A0" : char}</span>
    ));
  };

  return (
    <div className="page">
      {!introStarted && (
        <div className="intro-trigger" onClick={handleStartIntro}>
          <span className="pulse-text">Tap anywhere to enter</span>
        </div>
      )}

      <section className="hero_main">
        <div className="content top-text">
          <h1>{splitText("Alexander Steven")}</h1>
        </div>
        <div className="content bottom-text">
          <p>{splitText("IT and System Solutions")}</p>
        </div>
        <canvas className="planet-3D" />
      </section>

      {selectedCity && (
        <div className="ui-overlay active">
          <button className="close-btn" onClick={handleClose}>✕ Close</button>
          <div className="card info-card blur-in">
            <div className="card-header">
              <span className="location-pill">{selectedCity.country}</span>
              <div className="title-block">
                <h2>{selectedCity.name}</h2>
                {selectedCity.logo && <img src={selectedCity.logo} className="wimbledon-logo" alt="Logo" />}
              </div>
            </div>
            <div className="experience-list">
              {selectedCity.roles.map((role, idx) => (
                <div key={idx} className="role-entry">{role}</div>
              ))}
            </div>
          </div>
          <div className="card photo-card blur-in">
            <div className="carousel-container">
              <img src={`/content/${selectedCity.id}/${selectedCity.id}${imgIndex + 1}.png`} className="carousel-image" alt="Experience" />
              {selectedCity.imageCount > 1 && (
                <div className="carousel-controls">
                  <button onClick={() => setImgIndex(prev => (prev - 1 + selectedCity.imageCount) % selectedCity.imageCount)}>◀</button>
                  <div className="carousel-indicators">
                    {Array.from({ length: selectedCity.imageCount }).map((_, i) => (
                      <div key={i} className={`indicator ${i === imgIndex ? 'active' : ''}`} />
                    ))}
                  </div>
                  <button onClick={() => setImgIndex(prev => (prev + 1) % selectedCity.imageCount)}>▶</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}