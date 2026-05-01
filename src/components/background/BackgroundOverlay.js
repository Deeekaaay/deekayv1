// src/components/BackgroundOverlay.js
import React from "react";
import "./BackgroundOverlay.css";

/**
 * BackgroundOverlay
 *
 * Layer stack (back to front):
 *   1. FloatingLines WebGL canvas — blurred 3px, opacity 0.42
 *      Install: npm install @reactbits/floating-lines
 *      Degrades gracefully if package is absent.
 *   2. Engineering grid — CSS gradient, opacity 0.20
 *   3. Radial vignette — keeps headline text crisp at centre
 */

// Use the local FloatingLines component implementation
import FloatingLines from "./FloatingLines";

const BackgroundOverlay = () => (
  <div className="bg-overlay" aria-hidden="true">

    {/* Layer 1 — FloatingLines WebGL, blurred for depth */}
    <div className="bg-overlay__lines">
      <FloatingLines
        linesGradient={["#F59E0B", "#c47a04", "#8c5602"]}
        enabledWaves={["top", "middle", "bottom"]}
        lineCount={8}
        lineDistance={8}
        animationSpeed={0.5}
        interactive={true}
        bendRadius={23.5}
        bendStrength={-1}
        mouseDamping={0.05}
        parallax={true}
        parallaxStrength={0.2}
        mixBlendMode="screen"
      />
    </div>

    {/* Layer 2 — Engineering grid */}
    <div className="bg-overlay__grid" />

    {/* Layer 3 — Centre vignette keeps headline crisp */}
    <div className="bg-overlay__vignette" />

  </div>
);

export default React.memo(BackgroundOverlay);

