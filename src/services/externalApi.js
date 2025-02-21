import dotenv from "dotenv";
import process from "process";
dotenv.config();

const baseUrl = process.env.X_RAPIDAPI_BASE_URL;
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
    "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
  },
};

function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}${month}${day}`;
}

async function fetchMatches() {
  try {
    const url = `${baseUrl}/football-get-matches-by-date-and-league?date=${getFormattedDate()}`;

    console.log(`${getFormattedDate()}: fetching matches`);

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error fetching matches: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function filterLeagues(data) {
  const laLigaId = process.env.LALIGA_ID;
  const array = data.response;

  const filteredLeagues = array.find((l) => (l.id = laLigaId));
  return filteredLeagues;
}

async function getMatches() {
  const data = await fetchMatches();
  const filteredLeagues = filterLeagues(data);

  return filteredLeagues;
}

console.log(getMatches());
