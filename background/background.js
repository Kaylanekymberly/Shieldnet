// background/background.js
console.log('🛡️ Escudo Digital - Background iniciado');

// Base de dados embedada
const DATABASE = {
  keywords: {
    level1: [
      "red pill", "redpill", "pílula vermelha",
      "blue pill", "bluepill", "pílula azul",
      "macho alfa", "macho-alfa", "alpha male",
      "macho beta", "macho-beta", "beta male",
      "homem sigma", "sigma male",
      "homem de alto valor", "high value man",
      "mulher de alto valor", "mulher de baixo valor",
      "valor sexual de mercado", "vsm", "smv",
      "mgtow", "men going their own way",
      "incel", "celibatário involuntário",
      "machosfera", "blue piller",
      "imperativo feminino", "hipergamia feminina"
    ],
    level2: [
      "não regue plantas mortas", "friendzone",
      "seja o prêmio", "red flag em mulher",
      "red flags femininas", "parede dos 30",
      "the wall", "masculinidade tóxica é mito",
      "feminismo destruiu", "feminismo é câncer",
      "psicologia evolutiva", "biologia evolutiva",
      "dimorfismo sexual", "coach de relacionamentos",
      "coach masculino", "desenvolvimento masculino"
    ],
    level3: [
      "autocontrole", "disciplina", "virilidade",
      "sucesso financeiro", "masculinidade"
    ]
  },
  channels: {
    blocklist: [
      { name: "thiago schutz", id: "@thiagoschutz" },
      { name: "rafael aires", id: "@rafaelaires" },
      { name: "homemcast", id: "@homemcast" },
      { name: "junior masters", id: "@juniormasters" },
      { name: "manual do redp", id: "@manualdoredp" },
      { name: "redpill avançado", id: "@redpillavancado" },
      { name: "thalis gomes", id: "@thalisgomes" }
    ]
  }
};

// Inicialização ao instalar
chrome.runtime.onInstalled.addListener(async () => {
  console.log('✅ Escudo Digital instalado com sucesso!');
  
  // Salvar base de dados no storage
  await chrome.storage.local.set({
    keywords: DATABASE.keywords,
    channels: DATABASE.channels,
    enabled: true,
    strictMode: true,
    blockCount: 0,
    version: '1.0.0',
    installDate: Date.now(),
    lastUpdate: Date.now()
  });
  
  console.log('✅ Base de dados carregada:', {
    keywords: DATABASE.keywords.level1.length + DATABASE.keywords.level2.length + DATABASE.keywords.level3.length,
    channels: DATABASE.channels.blocklist.length
  });
});

// Receber mensagens do content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeContent') {
    analyzeContent(request.data).then(result => {
      sendResponse(result);
    });
    return true; // Mantém canal aberto
  }
  
  if (request.action === 'contentBlocked') {
    updateBlockCount();
    sendResponse({ success: true });
    return true;
  }
});

// Analisar conteúdo
async function analyzeContent(data) {
  const storage = await chrome.storage.local.get(['keywords', 'channels', 'enabled']);
  
  if (!storage.enabled) {
    return { shouldBlock: false, score: 0 };
  }
  
  let score = 0;
  const reasons = [];
  
  // 1. Verificar canal bloqueado
  const channelName = data.channelName.toLowerCase();
  const isChannelBlocked = storage.channels.blocklist.some(blocked => 
    channelName.includes(blocked.name.toLowerCase())
  );
  
  if (isChannelBlocked) {
    score += 50;
    reasons.push('Canal identificado como produtor de conteúdo inadequado');
  }
  
  // 2. Analisar texto (título + descrição)
  const text = `${data.title} ${data.description}`.toLowerCase();
  
  // Nível 1 - Crítico (10 pontos cada)
  storage.keywords.level1.forEach(keyword => {
    if (text.includes(keyword.toLowerCase())) {
      score += 10;
      reasons.push(`Termo crítico detectado: "${keyword}"`);
    }
  });
  
  // Nível 2 - Alto (5 pontos cada)
  storage.keywords.level2.forEach(keyword => {
    if (text.includes(keyword.toLowerCase())) {
      score += 5;
      reasons.push(`Termo suspeito detectado: "${keyword}"`);
    }
  });
  
  // Nível 3 - Médio (2 pontos cada, mas precisa 3+ para contar)
  let level3Count = 0;
  storage.keywords.level3.forEach(keyword => {
    if (text.includes(keyword.toLowerCase())) {
      level3Count++;
    }
  });
  
  if (level3Count >= 3) {
    score += level3Count * 2;
    reasons.push(`Múltiplos termos ambíguos detectados (${level3Count})`);
  }
  
  // Decisão final
  const shouldBlock = score >= 50;
  
  console.log('📊 Análise:', {
    title: data.title.substring(0, 50),
    score,
    shouldBlock,
    reasons: reasons.length
  });
  
  return {
    shouldBlock,
    score,
    reasons
  };
}

// Atualizar contador de bloqueios
async function updateBlockCount() {
  const { blockCount } = await chrome.storage.local.get('blockCount');
  await chrome.storage.local.set({ blockCount: (blockCount || 0) + 1 });
}

// Define o estado inicial de bloqueio como ATIVO se ainda não estiver definido.
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['isBlockingActive'], (result) => {
        if (result.isBlockingActive === undefined) {
            // Define o padrão como TRUE (ativo)
            chrome.storage.local.set({ isBlockingActive: true });
        }
    });
});

// O service worker fica ativo no Chrome 
console.log("Escudo Digital - Background Service Worker rodando.");