import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("../demo.json");
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      {matches.map((match) => {
        const formattedTime = match.time.slice(-5);
        return (
          <div key={match.id}>
            {match.home.name} vs {match.away.name} at {formattedTime}
          </div>
        );
      })}
    </div>
  );
}

export default App;
