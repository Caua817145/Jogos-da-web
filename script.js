// Digite seu SID do GamePix aqui para ganhar com os anúncios
const MEU_SID = "DIGITE_SEU_SID_AQUI"; 

// Esta função busca os jogos direto do servidor do GamePix
async function carregarJogos() {
    const grid = document.getElementById('grid-jogos');
    grid.innerHTML = "<p>Carregando centenas de jogos...</p>";

    try {
        // Buscamos a lista de jogos mais populares (limitado a 100 por vez para não travar)
        const resposta = await fetch('https://games.gamepix.com/games?category=all&order=popular');
        const dados = await resposta.json();
        
        grid.innerHTML = ""; // Limpa o texto de carregando

        dados.data.map(jogo => {
            const card = document.createElement('div');
            card.className = 'game-card';
            
            // Montamos o card com a imagem e o título do jogo vindo da API
            card.innerHTML = `
                <img src="${jogo.thumbnailUrl}" alt="${jogo.title}" loading="lazy">
                <p>${jogo.title}</p>
            `;
            
            // Ao clicar, abre o jogo com o seu SID
            card.onclick = () => {
                const jogoUrl = `${jogo.url}?sid=${MEU_SID}`;
                document.getElementById('game-iframe').src = jogoUrl;
                document.getElementById('nome-jogo-tela').innerText = "Jogando: " + jogo.title;
                document.getElementById('game-container').style.display = 'block';
            };
            
            grid.appendChild(card);
        });
    } catch (erro) {
        grid.innerHTML = "<p>Erro ao carregar jogos. Tente recarregar a página.</p>";
        console.error(erro);
    }
}

// Inicia a função assim que o site abre
carregarJogos();

// Função para fechar o player
function fecharJogo() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('game-iframe').src = "";
}
