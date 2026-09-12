# 🐾 CLYVO VET - Sistema Inteligente de Triagem e Apoio ao Diagnóstico

**Equipe:** Matheus Gianolli, Enzo Xavier Coelho, Gustavo Ribeiro Permagnani, Larissa Juvenal de Magalhaes e Julia Menezes.


1. Matheus Gianolli - RM 565258
2. Gustavo Ribeiro Permagnani- RM 564995
3. Enzo Xavier Coelho - RM 563379
4. Julia Menezes - RM 565568
5. Larissa De Magalhaes - RM 566457

Links para Avaliação:

Repositório GitHub: https://github.com/MatheusGianolli/IOT-challenge.git

Vídeo Pitch (YouTube): https://youtu.be/SmZzfZo7jVM




---

## 📌 1. O Problema de Negócio
No ecossistema de saúde veterinária, o tempo de resposta entre a identificação de um sintoma pelo tutor e o atendimento clínico pode ser crítico. Clínicas frequentemente enfrentam gargalos na triagem, gerando salas de espera lotadas e estresse. 

O problema central que nossa IA resolve é a **falta de uma triagem remota e inteligente**. Atualmente, não há um filtro prévio que classifique a urgência dos casos e estruture as informações clínicas *antes* do paciente chegar à mesa do veterinário.

## 💡 2. A Solução e Estratégia de Personalização
Desenvolvemos um **Sistema de Apoio à Decisão Clínica (CDSS)**. O objetivo é atuar como uma triagem avançada, onde o tutor envia dados (texto, fotos e vídeos) sobre os sintomas do pet. A IA processa essas informações e envia um relatório estruturado ao veterinário.

*   **Estratégia de Personalização:** A IA não dá respostas genéricas. Ela personaliza a triagem cruzando os sintomas relatados com o **perfil específico do pet** (espécie, raça, idade, peso e doenças pré-existentes). Por exemplo, um sintoma de tosse em um *Pug idoso* gera um alerta de urgência respiratória muito maior do que em um *Basset Hound jovem*.
*   **Geração de Valor:** 
    *   *Para o Tutor:* Sensação de acolhimento imediato e direcionamento rápido.
    *   *Para a Clínica:* Otimização do tempo de consulta, priorização de casos graves e agilização na solicitação de exames.

## 🧠 3. Abordagem de Inteligência Artificial e Justificativa
*   **Modelo Adotado:** IA Generativa Multimodal (LLM com Processamento de Linguagem Natural - NLP e Visão Computacional).
*   **Justificativa:** Optamos por essa abordagem pois os inputs dos tutores são dados não estruturados (textos descritivos e informais) combinados com mídias visuais (fotos de lesões ou vídeos de comportamento). Modelos tradicionais não conseguiriam interpretar a nuance de um vídeo ou a descrição aberta de um sintoma. Utilizando um modelo Multimodal, conseguimos extrair o contexto clínico real das mídias e gerar hipóteses estruturadas.

## 📊 4. Mapeamento e Estrutura de Dados
Os dados necessários para alimentar a IA são divididos nas seguintes categorias:

| Categoria | Origem | Estrutura | Utilização pela IA |
| :--- | :--- | :--- | :--- |
| **Perfil do Pet** | Banco de Dados | JSON (Raça, Idade, Peso) | Definição de riscos baseados em predisposição racial e etária. |
| **Histórico Clínico** | Prontuário Eletrônico | JSON (Vacinas, Medicações) | Contextualização e exclusão de hipóteses (ex: descartar cinomose se vacina em dia). |
| **Queixa (Input)** | Tutor (via App) | Texto (NLP) | Extração da queixa principal e tempo de evolução do quadro. |
| **Mídia Visual** | Tutor (via App) | Imagens (.jpg) / Vídeos (.mp4) | Visão computacional para detectar anomalias físicas (secreções, lesões, postura). |

## 🏗️ 5. Arquitetura e Fluxo de Dados
**Fluxo de Integração:**
1. **App do Tutor:** Coleta os dados e mídias.
2. **Backend (API):** Recebe os dados do app, busca o histórico do pet no Banco de Dados e formata o *Prompt* consolidado.
3. **Módulo de IA:** Analisa os dados multimodais e devolve um JSON com Nível de Urgência, Hipóteses e Recomendações.
4. **App do Veterinário:** Recebe o retorno da IA para validação e tomada de decisão.

**Diagrama de Comunicação:**
> [Tutor (App)] --> {Sintomas + Mídias} --> [Backend / API]
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v
> [Banco de Dados] <--- {Busca Histórico} --- [Backend]
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v
> [Dashboard Vet] <--- {JSON Triagem} <--- [Motor de IA Generativa]

## 🛠️ 6. Tecnologias Utilizadas
*   **Frontend (Simulado):** React.js (Web/Dashboard Vet) e React Native (App Tutor).
*   **Backend:** Node.js para roteamento da API.
*   **Inteligência Artificial:** API de IA Multimodal (Processamento de Visão e Texto).
*   **Banco de Dados:** PostgreSQL (armazenamento relacional de perfis e históricos).

## 🚀 7. Instruções de Uso e Organização do Repositório
A estrutura lógica do projeto está organizada da seguinte forma:
*   `/docs`: Contém a documentação técnica e arquitetural.
*   `/src`: Contém o código-fonte simulado de integração.
*   `/simulacao`: Contém os exemplos de JSON para testar o retorno da IA.

## 🔬 8. Resultados Parciais: Demonstração Funcional (Simulada)
Para demonstrar o funcionamento do componente de IA, realizamos uma simulação passando um cenário real para o motor generativo.

**Cenário de Entrada (Enviado pelo Tutor):**
*   **Pet:** "Rex", Golden Retriever, 4 anos, vacinas em dia.
*   **Sintoma Descrito:** "O Rex está coçando muito a orelha direita desde ontem. Hoje de manhã ele chorou quando eu fui fazer carinho e a orelha tá bem vermelha e com um cheiro forte."
*   **Mídia Anexada:** Foto da orelha (detectado: vermelhidão, excesso de cerúmen escuro).

**Saída Gerada pela IA (Enviada para o Painel do Veterinário):**
```json
{
  "paciente": "Rex (Golden Retriever, 4 anos)",
  "classificacao_urgencia": "Amarela (Atendimento Eletivo/Breve)",
  "resumo_clinico": "Prurido intenso em pavilhão auricular direito, hiperemia, algia à palpação e odor forte. Evolução de 24h.",
  "analise_imagem": "Presença de eritema e exsudato escurecido (possível infecção fúngica/bacteriana).",
  "hipoteses_diagnosticas_iniciais": [
    "Otite Externa (Fúngica ou Bacteriana)",
    "Presença de corpo estranho",
    "Otite parasitária (Ácaros)"
  ],
  "recomendacao_clinica_previa": "Preparar sala para otoscopia. Sugerida coleta de material para citologia auricular. Orientar tutor a não aplicar remédios caseiros até a consulta."
}





