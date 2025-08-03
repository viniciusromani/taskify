# Taskify

<!-- SOBRE O PROJETO -->
## Descrição

Taskify é uma aplicação web full-stack construída com NestJS, React e TypeScript, projetada para ajudar usuários a gerenciarem suas tarefas diárias de forma eficiente. Ela oferece uma arquitetura limpa e escalável, com tratamento de erros e uma experiência de usuário fluida.

A aplicação segue um design mobile-first, mas ainda assim fornece uma interface responsiva e amigável para telas maiores. O projeto enfatiza boas práticas de desenvolvimento de software, incluindo código limpo e de fácil manutenção.

#### Visão Geral do Projeto
- Autenticação usando JWT
- CRUD completo para tarefas com filtragem por status
- Testes E2E para os principais fluxos do usuário
- Ambiente Dockerizado para fácil configuração e deploy
- Estrutura de código limpa e modular, seguindo boas práticas da indústria

### Tecnologias Utilizadas

#### Backend
* [Nest.js](https://nestjs.com)
* [PostgreSQL](https://www.postgresql.org)
* [TypeORM](https://typeorm.io)
* [JWT](https://github.com/nestjs/jwt)
* [Passport](https://docs.nestjs.com/recipes/passport)

#### Frontend
* [Vite](https://vite.dev/)
* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [TanstackQuery](https://tanstack.com/query/latest)
* [Shadcnui](https://ui.shadcn.com/)
* [React-Hook-Form](https://react-hook-form.com/)

### Funcionalidades
- Registro e login de usuário com JWT
- Cookie de autenticação com HttpOnly para prevenir XSS
- Validação de dados tanto no backend quanto no frontend
- Rotas protegidas no backend e páginas protegidas no frontend
- CRUD completo de tarefas (criar, atualizar, deletar)
- Filtragem de tarefas por status (pendente, concluída, todas)
- Infraestrutura dockerizada com docker-compose
- Testes E2E com Cypress cobrindo os principais fluxos

### Testes E2E

Os testes E2E são implementados usando **Cypress** e cobrem todos os cenários principais, incluindo:

- Registro de usuário
- Login de usuário
- Criação de tarefa
- Marcar tarefa como concluída
- Deletar tarefa
- Filtrar tarefas por status
- Proteção de rotas privadas (acesso bloqueado sem login)
- Validações de entrada (campos obrigatórios, etc.)

<!-- PRIMEIROS PASSOS -->
## Primeiros Passos

As instruções a seguir permitem executar uma cópia local da aplicação.

### Pré-requisitos

* [Docker](https://docs.docker.com/desktop/)

### Instalação

1. Clone o repositório
```sh
git clone git@github.com:viniciusromani/taskify.git
```
> ⚠️ **Atenção**: Se aparecer uma pasta `pgdata` na raiz do projeto, você **deve** excluí-la antes de continuar.

2. Crie o arquivo `.env` para o backend e frontend (ambos possuem um `.env.example` como referência do que é necessário)

*sugestão de `.env` para o backend (executando com docker localmente)*
```.sh
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres
JWT_SECRET=6b20321e40b2c5f676f0c57f7204e937db015615650adefc5bf7bd9e03035559
JWT_EXPIRES_IN=12h
CORS_ALLOWED_ORIGIN=http://localhost:5173
```

*sugestão de `.env` para o frontend (executando com docker localmente)*
```.sh
VITE_API_URL=http://localhost:3000
```

3. Execute o projeto a partir da pasta raiz
```sh
docker compose -p taskify --env-file backend/.env up --build -d
```

4. Aguarde os serviços do postgres e backend ficarem saudáveis e o frontend iniciar. Então acesse `http://localhost:5173`.
> ⚠️ **Atenção**: Tanto o Postgres quanto o backend têm um timeout de 150 segundos para ficarem saudáveis. Isso deve funcionar na maioria dos ambientes, mas se tiver problemas com inicialização lenta, aumente esse tempo no `docker-compose.yml` ou apenas reexecute o comando — o banco tende a iniciar mais rápido nas execuções seguintes.

### Testes

1. Navegue até a pasta `frontend` na raiz do projeto.
2. Instale os requisitos
```sh
npm install
```
3. Crie o arquivo `cypress.env.json` na pasta do frontend (existe um `cypress.env.json.example` como referência)
```json
{
  "host": "http://localhost:5173",
  "backend": "http://localhost:3000",
  "login": {
    "email": "admin@admin.com",
    "password": "123"
  }
}
```
> ⚠️ **Atenção**: As credenciais (admin@admin.com) são criadas durante o seeding do banco. Para executar todos os testes, forneça uma credencial existente.

4. Execute o Cypress
```sh
# modo headless
npm run cy:run

# modo com interface
npm run cy:open
```

<!-- ROADMAP -->
## Planejamento Futuro

- [ ] Implementar [dark-mode](https://ui.shadcn.com/docs/dark-mode/vite)
- [ ] Adicionar filtro padrão de tarefas (talvez trazer pendentes primeiro)
- [ ] Criar testes unitários para o backend
- [ ] Implementar logout (atualmente, para trocar de usuário, é necessário ir manualmente para /login)
- [ ] Usar Docker para rodar testes E2E (talvez utilizando imagem oficial do Cypress)

<!-- CONTRIBUIÇÃO -->
## Contribuindo

Contribuições são o que tornam a comunidade open source um lugar incrível para aprender, inspirar e criar. Qualquer contribuição é **muito bem-vinda**.

Se você tiver sugestões para melhorias, faça um fork do repositório e crie um pull request. Você também pode abrir uma issue com a tag "enhancement".
Não esqueça de deixar uma estrela no projeto! Obrigado!

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeatureIncrível`)
3. Commit suas alterações (`git commit -m 'Adiciona MinhaFeatureIncrível'`)
4. Faça push para a branch (`git push origin feature/MinhaFeatureIncrível`)
5. Abra um Pull Request

<!-- CONTATO -->
## Contato

Vinicius Romani - vn.romani@gmail.com
