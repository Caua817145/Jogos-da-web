// Usando a API da GamePix, mas tratando os dados como "Repositórios"
const API_URL = 'https://games.gamepix.com/games';
const grid = document.getElementById('gameGrid');
let allRepos = [];

async function fetchRepositories() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    
    // Armazenamos os dados (ajuste conforme a estrutura da API)
    allRepos = result.data || []; 
    displayRepos(allRepos);
  } catch (error) {
    grid.innerHTML = `<p style="color: #f85149; padding: 20px;">
        Error fetching repositories. Please check your connection.
    </p>`;
  }
}

function displayRepos(repos) {
  grid.innerHTML = '';
  
  // No GitHub, mostramos os itens em lista ou cards detalhados
  repos.slice(0, 50).forEach(repo => {
    const card = document.createElement('div');
    card.className = 'game-card'; // Mantendo a classe do seu CSS anterior
    
    // Simulando dados do GitHub (Estrelas aleatórias e Categorias como Linguagens)
    const stars = Math.floor(Math.random() * 5000);
    const language = repo.category || 'JavaScript';
    
    card.onclick = () => openRepo(repo.url);
    
    card.innerHTML = `
      <div class="game-info">
        <h3 style="margin: 0; color: #58a6ff; font-size: 14px;">
            <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor" style="vertical-align: middle; margin-right: 4px;">
                <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7L5.3 13.52a.75.75 0 11-1.1 1.02l-1.323-1.42A2.503 2.503 0 012 11.4V2.5z"></path>
            </svg>
            ${repo.author || 'community'} / ${repo.title.replace(/\s+/g, '-').toLowerCase()}
        </h3>
        <p style="color: #8b949e; font-size: 12px; margin: 8px 0;">${repo.description || 'No description provided.'}</p>
        <div style="display: flex; gap: 15px; font-size: 12px; color: #8b949e; margin-top: 10px;">
            <span><span style="color: #f1e05a;">●</span> ${language}</span>
            <span>⭐ ${stars}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openRepo(url) {
  const modal = document.getElementById('gameModal');
  const frame = document.getElementById('gameFrame');
  
  frame.src = url;
  modal.style.display = "flex"; // Usando flex para centralizar o modal GitHub
}

// Fechar Modal
document.querySelector('.close-btn').onclick = () => {
  document.getElementById('gameModal').style.display = "none";
  document.getElementById('gameFrame').src = "";
};

// Busca em tempo real (Estilo GitHub "Jump to")
document.getElementById('searchInput').oninput = (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allRepos.filter(r => 
    r.title.toLowerCase().includes(term) || 
    (r.category && r.category.toLowerCase().includes(term))
  );
  displayRepos(filtered);
};

// Inicializa a busca
fetchRepositories();
