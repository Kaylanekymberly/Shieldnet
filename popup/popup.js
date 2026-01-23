// popup/popup.js

// Carregar ao abrir popup
document.addEventListener('DOMContentLoaded', loadPopup);

async function loadPopup() {
  // Buscar configurações
  const data = await chrome.storage.local.get(['enabled', 'blockCount']);
  
  // Atualizar UI
  document.getElementById('toggleEnabled').checked = data.enabled !== false;
  document.getElementById('blockCount').textContent = data.blockCount || 0;
  updateStatusText(data.enabled !== false);
  
  // Listeners
  document.getElementById('toggleEnabled').addEventListener('change', toggleProtection);
  document.getElementById('resetBtn').addEventListener('click', resetStats);
}

// Toggle de proteção
async function toggleProtection(e) {
  const enabled = e.target.checked;
  
  // Salvar
  await chrome.storage.local.set({ enabled });
  
  // Atualizar texto
  updateStatusText(enabled);
  
  // Recarregar página atual
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.url.includes('youtube.com')) {
    chrome.tabs.reload(tab.id);
  }
}

// Atualizar texto de status
function updateStatusText(enabled) {
  const statusText = document.getElementById('statusText');
  if (enabled) {
    statusText.textContent = 'Filtrando conteúdo inadequado';
    statusText.style.color = '#4CAF50';
  } else {
    statusText.textContent = 'Proteção desativada';
    statusText.style.color = '#999';
  }
}

// Resetar estatísticas
async function resetStats() {
  if (confirm('Tem certeza que deseja resetar as estatísticas?')) {
    await chrome.storage.local.set({ blockCount: 0 });
    document.getElementById('blockCount').textContent = '0';
  }
}