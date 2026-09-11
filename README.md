# 🐾 CLYVO VET - Sistema Inteligente de Triagem e Apoio ao Diagnóstico

**Equipe:** Gabriel Gianolli, Enzo Xavier Coelho, Gustavo Ribeiro Permagnani, Larissa Juvenal de Magalhães e Julia Menezes.

## 1. Visão Geral e Problema de Negócio
No ecossistema de saúde veterinária, o tempo de resposta entre a identificação de um sintoma pelo tutor e o atendimento clínico pode ser crítico para a saúde do pet. Clínicas veterinárias frequentemente enfrentam gargalos na triagem de pacientes, resultando em salas de espera lotadas, estresse para os animais e sobrecarga dos profissionais. 

O **problema de negócio** central resolvido por nossa solução é a **otimização e qualificação da triagem veterinária**. Atualmente, a recepção de casos (presencial ou remota) carece de um filtro inteligente capaz de classificar a urgência e compilar dados clínicos estruturados antes que o paciente chegue à mesa do veterinário.

## 2. A Solução de IA e Geração de Valor
A CLYVO VET integra um **Sistema de Apoio à Decisão Clínica (CDSS)** baseado em Inteligência Artificial. A IA não substitui o médico veterinário; ela atua como um "Copiloto Clínico". 

**Como funciona a jornada:**
1. O tutor insere no aplicativo fotos, vídeos (ex: claudicação, lesões cutâneas, respiração ofegante) e uma descrição em texto/áudio dos sintomas.
2. A IA analisa esses dados multimodais e cruza com o histórico do pet.
3. O sistema gera um **relatório de triagem** para o painel do veterinário, contendo:
   - Nível de urgência (Sistema de Cores: Vermelho, Amarelo, Verde).
   - Possíveis hipóteses diagnósticas (apenas para o veterinário).
   - Recomendações de exames preliminares.
4. O veterinário revisa os dados, confirma ou ajusta o diagnóstico e toma as medidas necessárias.

**Geração de Valor:**
*   **Para o Tutor:** Redução da ansiedade com respostas rápidas, atendimento direcionado e sensação de acolhimento contínuo.
*   **Para a Clínica/Veterinário:** Otimização do tempo de consulta (anamnese pré-compilada), priorização assertiva de casos graves e aumento na taxa de assertividade e faturamento (direcionamento mais rápido para exames).

## 3. Abordagem de Inteligência Artificial Justificada
A abordagem técnica escolhida é a **IA Generativa Multimodal (LLM + Computer Vision)**. 

*   **Justificativa Técnica:** Modelos tradicionais de aprendizado de máquina (como regressões ou árvores de decisão) não são adequados para interpretar dados não estruturados simultâneos (texto descritivo do tutor + imagens de lesões + vídeos de comportamento). 
*   **Tecnologia:** Utilizaremos modelos fundacionais multimodais (como GPT-4o Vision, Claude 3.5 Sonnet ou Gemini 1.5 Pro via API). Estes modelos integram Processamento de Linguagem Natural (NLP) para entender os sintomas relatados e Visão Computacional para extrair características das mídias enviadas.
*   **Prompt Engineering & Fine-Tuning:** A IA receberá *System Prompts* rigorosos orientando-a a atuar estritamente como um assistente de triagem veterinária, baseando-se em literatura médica atualizada, sem fornecer o diagnóstico final ao tutor.

## 4. Mapeamento e Estrutura de Dados
Para alimentar a IA de forma contextualizada, o sistema trafega o seguinte pipeline de dados:

| Categoria de Dado | Origem | Estrutura/Formato | Utilização pela IA |
| :--- | :--- | :--- | :--- |
| **Perfil do Pet** | Banco de Dados (App) | JSON (Espécie, Raça, Idade, Peso, Sexo) | Base de cálculo para predisposições raciais e faixas etárias. |
| **Histórico Clínico** | Prontuário Eletrônico | JSON (Vacinas, Vermífugos, Doenças Crônicas) | Contextualização (ex: exclusão de cinomose se vacina em dia). |
| **Sintomas (Input)** | Tutor (via App) | Texto (NLP) e Áudio transcrito | Identificação da queixa principal e evolução do quadro. |
| **Mídia Visual** | Tutor (via App) | Imagens (.jpg) e Vídeos curtos (.mp4) | Visão Computacional para detecção de anomalias visíveis. |

## 5. Arquitetura da Solução e Fluxo de Dados

A arquitetura foi desenhada para ser escalável e segura.

**Diagrama de Fluxo Lógico:**
```text
[Tutor App] 
   │
   ├──> 1. Envia Dados (Texto + Fotos + Vídeos do Pet)
   v
[API Gateway / Backend (Node.js/Python)] 
   │
   ├──> 2. Busca Perfil/Histórico no [Banco de Dados (PostgreSQL)]
   ├──> 3. Empacota Payload (Histórico + Novos Sintomas + Mídias)
   v
[Módulo de IA Multimodal (API Externa - OpenAI/Anthropic/Google)]
   │
   ├──> 4. Processa Visão Computacional + NLP
   ├──> 5. Retorna JSON estruturado (Urgência, Hipóteses, Justificativa)
   v
[Backend] 
   │
   ├──> 6. Salva relatório no [Banco de Dados]
   v
[Dashboard do Veterinário (Web)]
   │
   └──> 7. Exibe Triagem Inteligente. Médico avalida, valida e aprova ações.
