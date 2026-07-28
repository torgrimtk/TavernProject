import { useEffect, useRef } from "react";
import { createPhaserGame } from "./game/PhaserGame";


function App() {

  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameContainerRef.current) {
      return;
    }

    const game = createPhaserGame(gameContainerRef.current);

    return () => {
      game.destroy(true);
    }
  }, []);

  return <div ref={gameContainerRef} />;
}

export default App
