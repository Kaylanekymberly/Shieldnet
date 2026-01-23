// content/content-youtube.js
console.log('🛡️🛡️🛡️ ESCUDO DIGITAL CARREGOU NO YOUTUBE! 🛡️🛡️🛡️');

// Dados direto no código (sem depender de arquivos externos)
const KEYWORDS_LEVEL1 = [
  "red pill", "redpill", "macho alfa", "macho beta", 
  "homem de alto valor", "mgtow", "incel"
];

const BLOCKED_CHANNELS = [
  "thiago schutz", "rafael aires", "homemcast", 
  "manual do redp", "redpill"
];

let processedVideos = new Set();

// Aguardar página carregar
setTimeout(() => {
  console.log('⏰ Iniciando processamento de vídeos...');
  startProcessing();
}, 3000);

function startProcessing() {
  console.log('🔍 Procurando por vídeos...');
  
  // Processar vídeos a cada 2 segundos
  setInterval(() => {
    processAllVideos();
  }, 2000);
  
  // Primeira execução
  processAllVideos();
}

function processAllVideos() {
  const videos = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, ytd-rich-item-renderer');
  
  console.log(`📹 Encontrados ${videos.length} vídeos na página`);
  
  videos.forEach((video, index) => {
    processVideo(video, index);
  });
}

function processVideo(videoElement, index) {
  // Pegar o título
  const titleElement = videoElement.querySelector('#video-title, #video-title-link');
  if (!titleElement) return;
  
  const title = titleElement.textContent.trim().toLowerCase();
  
  // Pegar o canal
  const channelElement = videoElement.querySelector('#channel-name a, #text a');
  const channelName = channelElement ? channelElement.textContent.trim().toLowerCase() : '';
  
  // Criar ID único
  const videoId = `${title.substring(0, 20)}-${index}`;
  if (processedVideos.has(videoId)) return;
  processedVideos.add(videoId);
  
  console.log(`🎬 Analisando: "${title.substring(0, 50)}..." | Canal: "${channelName}"`);
  
  // Verificar se deve bloquear
  let shouldBlock = false;
  let reason = '';
  
  // Checar canal
  for (const blocked of BLOCKED_CHANNELS) {
    if (channelName.includes(blocked)) {
      shouldBlock = true;
      reason = `Canal bloqueado: ${blocked}`;
      break;
    }
  }
  
  // Checar palavras-chave
  if (!shouldBlock) {
    for (const keyword of KEYWORDS_LEVEL1) {
      if (title.includes(keyword)) {
        shouldBlock = true;
        reason = `Palavra-chave: ${keyword}`;
        break;
      }
    }
  }
  
  // Bloquear se necessário
  if (shouldBlock) {
    console.log(`🚫 BLOQUEANDO: ${reason}`);
    blockVideo(videoElement, reason);
  }
}

function blockVideo(element, reason) {
  // Bloquear todos os links do vídeo
  const links = element.querySelectorAll('a');
  links.forEach(link => {
    link.style.pointerEvents = 'none';
    link.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      alert('🛡️ Este conteúdo foi bloqueado pelo Escudo Digital por conter material inadequado.');
      return false;
    };
  });
  
  // Bloquear cliques no elemento inteiro
  element.style.pointerEvents = 'none';
  element.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  
  // Criar overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    border-radius: 12px;
    pointer-events: all;
    cursor: not-allowed;
  `;
  
  overlay.innerHTML = `
    <div style="text-align: center; color: white; padding: 20px; pointer-events: none;">
      <div style="font-size: 64px; margin-bottom: 15px;">🛡️</div>
      <h3 style="margin: 10px 0; font-size: 20px; color: #ff4444;">Conteúdo Bloqueado</h3>
      <p style="margin: 10px 0; font-size: 14px; opacity: 0.9;">
        Este vídeo foi identificado como inadequado
      </p>
      <p style="margin: 5px 0; font-size: 12px; opacity: 0.7;">
        Motivo: ${reason}
      </p>
      <p style="margin: 15px 0; font-size: 11px; opacity: 0.5;">
        Protegido pelo Escudo Digital
      </p>
    </div>
  `;
  
  // Bloquear cliques no overlay também
  overlay.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('🛡️ Este conteúdo foi bloqueado pelo Escudo Digital.\n\nMotivo: ' + reason + '\n\nEste vídeo contém material identificado como inadequado para jovens.');
    return false;
  };
  
  // Inserir overlay
  const thumbnail = element.querySelector('ytd-thumbnail, #thumbnail');
  if (thumbnail) {
    thumbnail.style.position = 'relative';
    thumbnail.appendChild(overlay);
    console.log('✅ Overlay aplicado com sucesso!');
  }
  
  // Marcar elemento como bloqueado
  element.setAttribute('data-escudo-blocked', 'true');
  element.style.opacity = '0.6';
}

console.log('✅ Script inicializado completamente!');

// 1 — Carrega as palavras do keywords.json
let keywords = [];

fetch(chrome.runtime.getURL("data/keywords.json"))
  .then(response => response.json())
  .then(data => {
    keywords = data.keywords.map(k => k.toLowerCase());
    observeYouTube();
  });

// 2 — Função que verifica vídeos
function checkVideos() {
  const items = document.querySelectorAll("ytd-video-renderer, ytd-grid-video-renderer");

  items.forEach(item => {
    const titleEl = item.querySelector("#video-title");
    if (!titleEl) return;

    const title = titleEl.innerText.toLowerCase();

    if (keywords.some(k => title.includes(k))) {
      blockVideo(item, `palavra-chave detectada`);
    }
  });
}

// 3 — Observa mudanças na página
function observeYouTube() {
  checkVideos(); // primeira rodada

  const observer = new MutationObserver(() => {
    checkVideos();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}