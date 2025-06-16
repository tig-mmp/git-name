# Git Name

Esta aplicação gera **nomes de branches** e **mensagens de commit** com base numa descrição de funcionalidade e um número de tarefa, seguindo regras específicas de nomenclatura. É útil para manter consistência nos fluxos de trabalho com Git.

---

## 🧠 O que faz este projeto

A partir de uma breve **descrição da funcionalidade** (ex.: "Adicionar formulário de login") e de um **número** (ex.: tarefa #42), a aplicação gera:

- Um **nome de branch Git**: `feature/42-adicionar-formulario-de-login`
- Uma **mensagem de commit**: `feat(42): Adicionar formulário de login`

Isto ajuda a manter nomes uniformes em projetos individuais ou de equipa.

---

## 📁 Estrutura do Projeto

- `src/`: Código-fonte da aplicação
- `Dockerfile`: Define a imagem do container para correr a app
- `docker-compose.yml`: Orquestra a execução da app com Docker
- `vite.config.js`: Configuração do servidor de desenvolvimento Vite
- `package.json`: Dependências e scripts do projeto

---

## 🚀 Como correr o projeto

Tens **duas formas** de correr a aplicação: usando Docker (recomendado) ou diretamente na tua máquina (sem Docker).

---

### 🐳 Opção 1: Usar Docker

> ✅ Recomendado para garantir que tudo corre igual em qualquer computador, sem instalar dependências globalmente.

1. **Garante que o Docker está instalado e em execução**.

   - Abre o Docker Desktop e confirma que diz "Docker is running".

2. **Constrói a imagem Docker** (necessário apenas da primeira vez ou após mudar dependências):

   ```bash
   docker build -t git-name-image .
   ```

3. Inicia o servidor de desenvolvimento com Docker Compose:

   ```bash
   docker compose up
   ```

   - Isto corre a aplicação num container chamado git-name.

   - O teu código local é ligado ao container, permitindo alterações em tempo real.

4. Abre a aplicação no browser:

   ```bash
   http://localhost:7890/
   ```

   - Dentro do container, o Vite corre na porta 5173, mas está exposto na tua máquina na porta 7890.

5. Para parar a aplicação:

   - Carrega em Ctrl + C no terminal, ou então corre:

   ```bash
   docker compose down
   ```

---

### 💻 Opção 2: Sem Docker (Desenvolvimento local)

> ✅ Útil se já tiveres o Node.js e o Yarn instalados na tua máquina.

1. Instala as dependências:

   ```bash
   yarn install
   ```

2. Inicia o servidor de desenvolvimento:

   ```bash
   yarn run dev
   ```

3. Acede à aplicação:

   - O terminal irá indicar o URL local, normalmente http://localhost:5173/.

   - O Vite faz reload automático sempre que editares ficheiros.

---

### ⚙️ Tecnologias Utilizadas

    - Node.js (versão LTS)

    - Yarn como gestor de pacotes

    - Vite para desenvolvimento rápido

    - Docker e Docker Compose para ambiente isolado

---

### 🛠️ Comandos Docker úteis (para referência futura)

- Construir a imagem:

  ```bash
  docker build -t git-name-image .
  ```

- Correr a aplicação:

  ```bash
  docker compose up
  ```

- Parar e remover os containers:

  ```bash
  docker compose down
  ```

- Ver containers ativos:

  ```bash
  docker ps
  ```
