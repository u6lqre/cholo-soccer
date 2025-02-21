import dotenv from "dotenv";
import process from "process";
dotenv.config();

const apiBaseUrl = process.env.X_RAPIDAPI_BASE_URL;
const apiRequestOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
    "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
  },
};

function getCurrentDateFormatted() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  return `${year}${month}${day}`;
}

async function fetchDailyFootballMatches() {
  try {
    const apiEndpoint = `${apiBaseUrl}/football-get-matches-by-date-and-league?date=${getCurrentDateFormatted()}`;

    console.log(`${getCurrentDateFormatted()}: Fetching football matches`);

    const apiResponse = await fetch(apiEndpoint, apiRequestOptions);

    if (!apiResponse.ok) {
      throw new Error(`Error fetching matches: ${apiResponse.status}`);
    }

    const matchesData = await apiResponse.json();
    return matchesData;
  } catch (error) {
    console.error(error);
  }
}

function findLaLigaMatches(matchesData) {
  const laLigaId = process.env.LALIGA_ID;
  const allLeagues = matchesData.response;
  const laLigaMatches = allLeagues.find((league) => league.id === laLigaId);

  return laLigaMatches;
}

function formatMatchDetails(matches) {
  const formattedMatches = matches.map((match) => ({
    id: match.id,
    home: {
      id: match.home.id,
      name: match.home.name,
      logo_url: createTeamLogoUrl(match.home.id),
    },
    away: {
      id: match.away.id,
      name: match.away.name,
      logo_url: createTeamLogoUrl(match.away.id),
    },
  }));

  return formattedMatches;
}

function createTeamLogoUrl(teamId) {
  return `https://images.fotmob.com/image_resources/logo/teamlogo/${teamId}_large.png`;
}

async function getLaLigaMatches() {
  const allMatches = await fetchDailyFootballMatches();
  const laLigaMatches = findLaLigaMatches(allMatches);

  if (!laLigaMatches) {
    console.log("We have not found any La Liga matches today.");
    return [];
  }

  const formattedMatches = formatMatchDetails(laLigaMatches);

  return formattedMatches;
}

console.log(getLaLigaMatches());
