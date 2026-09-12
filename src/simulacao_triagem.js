const fs = require('fs');

// 1. O sistema lê o banco de dados da clínica
const db = JSON.parse(fs.readFileSync('./database.json', 'utf-8'));

// 2. Simulando a requisição que chega do Celular do Tutor
const requestDoTutor = {
    pet_id: 1,
    sintoma_texto: "O Rex está coçando muito a orelha direita desde ontem. Chorou quando fui fazer carinho, a orelha está vermelha e com cheiro forte.",
    midia_anexa: "foto_orelha_vermelha.jpg"
};

// 3. Função principal que simula o motor de Inteligência Artificial Multimodal
function simularIA(dadosTutor) {
    console.log("=== INICIANDO TRIAGEM INTELIGENTE CLYVO VET ===\n");
    
    console.log("[SISTEMA] Buscando histórico do paciente no banco de dados...");
    const perfilPet = db.pets.find(p => p.id === dadosTutor.pet_id);
    
    console.log("[SISTEMA] Enviando dados para o modelo LLM Multimodal (Visão + Texto)...");
    console.log(`-> Analisando queixa: "${dadosTutor.sintoma_texto}"`);
    console.log(`-> Analisando anomalias na imagem: ${dadosTutor.midia_anexa}\n`);
    
    // Como é um MVP Acadêmico, mockamos o retorno exato que a API da OpenAI/Gemini daria:
    const respostaIA = {
        paciente: `${perfilPet.nome} (${perfilPet.raca}, ${perfilPet.idade_anos} anos)`,
        classificacao_urgencia: "Amarela (Atendimento Eletivo/Breve)",
        resumo_clinico: "Prurido intenso em pavilhão auricular direito, hiperemia e algia à palpação. Odor forte. Evolução de 24h.",
        analise_imagem: "Presença de eritema e exsudato escurecido (possível infecção fúngica/bacteriana).",
        hipoteses_diagnosticas: ["Otite Externa", "Corpo estranho", "Otite parasitária (Ácaros)"],
        recomendacao_clinica: "Preparar sala para otoscopia e citologia auricular. Orientar tutor a não limpar a orelha até a consulta."
    };

    console.log("=== RETORNO DA IA PARA O PAINEL DO VETERINÁRIO ===");
    console.log(JSON.stringify(respostaIA, null, 2));
    console.log("\n[SISTEMA] Triagem finalizada. Alerta enviado à clínica.");
}

// Executando a simulação
simularIA(requestDoTutor);
