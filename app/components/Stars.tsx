import { useState,useEffect } from "react";
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  twinkle: number;
}

export const StarField: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = (): void => {
      const newStars: Star[] = [];
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          speedX: Math.cos(angle) * (Math.random() * 0.1 + 0.02),
          speedY: Math.sin(angle) * (Math.random() * 0.1 + 0.02),
          opacity: Math.random() * 0.7 + 0.3,
          twinkle: Math.random() * 3 + 2,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star: Star) => {
          let newX = star.x + star.speedX;
          let newY = star.y + star.speedY;

          if (newX > 100) newX = 0;
          if (newX < 0) newX = 100;
          if (newY > 100) newY = 0;
          if (newY < 0) newY = 100;

          return {
            ...star,
            x: newX,
            y: newY,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes slide-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes number-count {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes golden-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.3); }
          50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.6); }
        }
        
        @keyframes smooth-pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.8; 
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out;
        }
        
        .animate-number-count {
          animation: number-count 1s ease-out;
        }
        
        .animate-golden-glow {
          animation: golden-glow 2s ease-in-out infinite;
        }
        
        .animate-smooth-pulse {
          animation: smooth-pulse 4s ease-in-out infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
      {stars.map((star: Star) => (
        <div
          key={star.id}
          className="absolute bg-yellow-400 rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.twinkle}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};