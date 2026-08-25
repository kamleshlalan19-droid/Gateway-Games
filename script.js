// LuminSDK Configuration
const LUMIN_REPO = "LuminSDK/LuminSDK";
const RAW_BASE = "https://raw.githubusercontent.com/LuminSDK/LuminSDK/main/";
const SITE_BASE = "https://luminsdk.com/";

const gameGrid = document.getElementById('gameGrid');
const playerModal = document.getElementById('playerModal');
const gameFrame = document.getElementById('gameFrame');
const closeBtn = document.getElementById('closeBtn');

// Helper to format folder names into title case (e.g., "retro-bowl" -> "Retro Bowl")
function formatTitle(str) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

// Fetch games dynamically from LuminSDK GitHub repository
async function fetchLuminGames() {
  try {
    const response = await fetch(`https://api.github.com/repos/${LUMIN_REPO}/contents`);
    const contents = await response.json();

    // Filter directories that contain games (excluding non-game hidden files/dirs)
    const gameDirs = contents.filter(item => 
      item.type === 'dir' && !item.name.startsWith('.') && item.name !== 'assets'
    );

    const games = gameDirs.map(dir => ({
      name: formatTitle(dir.name),
      // Uses the standard image path inside LuminSDK repositories with a fallback placeholder
      image: `${RAW_BASE}${dir.name}/img.png`,
      url: `${SITE_BASE}${dir.name}/`
    }));

    renderGames(games);
  } catch (error) {
    console.error("Error fetching LuminSDK games:", error);
    // Fallback static list if GitHub API rate limit is reached
    renderGames([
      { name: "Slope", image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ynOWNdI9yS3ylwKjb8aAWui4_pMKb_6PPBSvNe7sgg&s=10`, url: `slope.html` },
      { name: "Retro Bowl", image: `${RAW_BASE}retro-bowl/img.png`, url: `${SITE_BASE}retro-bowl/` },
      { name: "1v1.LOL", image: `${RAW_BASE}1v1/img.png`, url: `${SITE_BASE}1v1/` },
      { name: "Subway Surfers", image: `${RAW_BASE}subway-surfers/img.png`, url: `${SITE_BASE}subway-surfers/` }
    ]);
  }
}

// Render Game Cards to the grid
function renderGames(gameList) {
  gameGrid.innerHTML = gameList.map(game => `
    <div class="game-card" onclick="openGame('${game.url}')">
      <img 
        src="${game.image}" 
        alt="${game.name}" 
        onerror="this.onerror=null; this.src='https://via.placeholder.com/220x160/181a24/ffffff?text=${encodeURIComponent(game.name)}';" 
      />
      <h3>${game.name}</h3>
    </div>
  `).join('');
}

// Open selected game in embedded full-screen modal
function openGame(url) {
  gameFrame.src = url;
  playerModal.classList.add('active');
}

// Close player modal and stop game audio/execution
closeBtn.addEventListener('click', () => {
  playerModal.classList.remove('active');
  gameFrame.src = '';
});

// Initialize fetching on page load
fetchLuminGames();
