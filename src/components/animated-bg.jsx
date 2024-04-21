import React from 'react';
import Particles from 'react-particles-js';

const AnimatedBackground = () => {
  return (
    <Particles
      params={{
        "particles": {
          "number": {
            "value": 50
          },
          "size": {
            "value": 3
          },
          "color": {
            "value": "#b794f4"
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#b794f4",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "speed": 2
          }
        },
        "interactivity": {
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            }
          }
        }
      }}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        background: "linear-gradient(135deg, #f8f7fc 0%, #e2d1f9 100%)"
      }}
    />
  );
};

export default AnimatedBackground;
