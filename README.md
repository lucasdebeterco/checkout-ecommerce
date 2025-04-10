# Sistema de Checkout - Plataforma E-commerce

Este projeto é um desafio técnico que consiste no desenvolvimento de um sistema de Checkout para uma grande plataforma de e-commerce no Brasil. A aplicação simula o fluxo de uma compra, incluindo o checkout, listagem de transações e visualização de detalhes de cada transação.

---

### 🚀 Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/checkout-ecommerce.git
cd checkout-ecommerce

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

#### 📌 Observações

- Após finalizar a transação no checkout, acessar a página `/transactions` para ter acesso à area de operações do e-commerce.
- O número do cartão deve ser válido (conforme algoritmo de Luhn) para o formulário poder ser enviado.

---

### 🌐 Deploy

Este projeto foi implantado utilizando a plataforma Vercel e configurado para rodar no meu domínio pessoal:

- Acesse em: [checkout-ecommerce.lucasdebeterco.dev](https://checkout-ecommerce.lucasdebeterco.dev/)

---

### 🧪 Testes

#### Testes Unitários (validação de schema)

Para os testes unitários, foi utilizada a ferramenta **Vitest**, validando diferentes conjuntos de dados no schema do formulário.

Executar os testes unitários:
```bash
npm run test
```

#### Testes E2E (fim a fim)

Para os testes E2E, foi utilizado o **Cypress**, simulando o fluxo de finalização de compra na tela de checkout, incluindo validação de erros de formulário.

Executar testes E2E:
```bash
npx cypress run
```

---

### 📄 Páginas da Aplicação

#### **Página de Checkout** (`/`)
- Exibição dos itens do carrinho
- Coleta de informações do cliente
- Processamento do pagamento com validação de cartão
- Validação em tempo real dos campos do formulário
- Validação de número de cartão com o Algoritmo de Luhn
- Tratamento de erros e estados de carregamento
- Layout responsivo

#### **Listagem de Transações** (`/transactions`)
- Listagem de transações com filtros e ordenação
- Acompanhamento do status de pagamento

#### **Detalhes da Transação** (`/transactions/:id`)
- Informações completas da transação
- Dados do cliente
- Detalhes do método de pagamento
- Listagem dos itens da compra

---

### 🛠️ Tecnologias Utilizadas

- **React** + **TypeScript**
- **React Query** para busca e cache de dados
- **Zod** + **React Hook Form** para validação de formulários
- **TailwindCSS** para estilização da interface
- **React Router** para controle de rotas
- **React Toastify** para notificações
- **MirageJS** + **Local Storage** para simulação de respostas da API

---
