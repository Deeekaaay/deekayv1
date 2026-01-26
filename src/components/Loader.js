// src/components/Loader.js
import React, { useState, useEffect } from 'react';
import '../styles/Loader.css';

const Loader = ({ onLoadComplete, dataLoader }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const loadingSteps = [
    "Brewing some React magic... ☕",
    "Warming up AWS ninjas, hold tight! 🥷",
    "Fetching certification data... 📜", // Updated specifically for data loading
    "Summoning Python scripts from the void... 🐍",
    "Calibrating DevOps chakra points... 🧘",
    "Installing Node modules... still going... 📦",
    "Convincing CSS to behave properly... 🎨",
    "Teaching JavaScript about async/await... 🤓",
    "Compiling cool vibes, ya know! ✨",
    "Almost there... polishing the portfolio! 🚀"
  ];

  const bootText = "> Booting_up_Deekay's_Awesome_Portfolio...";

  // Execute data loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dataLoader) {
          await dataLoader();
        }
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Data loading failed", error);
        setIsDataLoaded(true); // Proceed even if error
      }
    };
    fetchData();
  }, [dataLoader]);

  // Typing animation for boot text
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= bootText.length) {
        setTypedText(bootText.substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  // Progress through steps - waits for real data at cert step
  useEffect(() => {
    // If we're at the data fetching step (index 2) and data isn't loaded yet, wait
    if (currentStep === 2 && !isDataLoaded) {
      return; 
    }

    if (currentStep < loadingSteps.length) {
      // Standard step duration, but proceed faster if we're catching up after data load
      const duration = (currentStep === 2 && isDataLoaded) ? 200 : 600;
      
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setProgress(((currentStep + 1) / loadingSteps.length) * 100);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // All steps complete - finish
      const finalTimer = setTimeout(() => {
        onLoadComplete();
      }, 500);

      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, loadingSteps.length, onLoadComplete, isDataLoaded]);

  return (
    <div className="loader-container">
      <div className="loader-content">
        {/* Terminal Header */}
        <div className="terminal-header">
          <span className="terminal-title">deekay</span>
          <div className="terminal-buttons">
            <span className="btn-close"></span>
            <span className="btn-minimize"></span>
            <span className="btn-maximize"></span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          {/* Boot message with cursor */}
          <div className="boot-message">
            {typedText}
            <span className="cursor-blink">_</span>
          </div>

          {/* Loading steps */}
          <div className="loading-steps">
            {loadingSteps.map((step, index) => (
              <div 
                key={index}
                className={`loading-step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
              >
                {index < currentStep && (
                  <>
                    <span className="step-text">{step}</span>
                    <span className="step-status">Done!</span>
                  </>
                )}
                {index === currentStep && (
                  <span className="step-text loading">{step}</span>
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-glow"></div>
              </div>
            </div>
            <div className="progress-text">{Math.round(progress)}%</div>
          </div>

          {/* Anime sparkles effect */}
          <div className="sparkles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="sparkle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
