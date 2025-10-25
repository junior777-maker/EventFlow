# EventFlow - Aplicativo de Gerenciamento de Eventos

## 📌 Descrição
O EventFlow é um aplicativo móvel que permite visualizar, cadastrar e gerenciar eventos. Ele possui autenticação de usuários, listagem de eventos, detalhes de eventos, mapa com localização, cadastro de categorias e locais, e integração com uma API própria.

O projeto foi desenvolvido como trabalho final da disciplina **Desenvolvimento de Aplicativos**.

---

## 🛠 Estrutura do Projeto

EventFlowOFICIALOFICIAL2/
├── EventFlowAPI/ # API Node.js (Express)
├── App/ # Projeto Expo do aplicativo
└── README.md

markdown
Copiar código

---

## 🚀 Funcionalidades Implementadas

1. **Autenticação**
   - Tela de login com e-mail e senha.
   - Persistência de sessão e logout funcional.

2. **Listagem de Eventos**
   - Exibição de nome, data, preço, categoria e imagem do evento.
   - Busca simples por nome do evento.

3. **Detalhes de Evento**
   - Exibe todas as informações do evento.
   - Visualização do local no mapa.

4. **Mapa de Eventos**
   - Marcadores no mapa para cada evento.
   - Ao tocar, exibe nome do evento.

5. **Cadastro/Edição**
   - Adição de eventos, categorias e locais.
   - Upload de imagem para eventos.
   - Cadastro de locais com latitude e longitude.

6. **Perfil**
   - Exibe dados do usuário logado.
   - Botão de logout funcional.

7. **Integração com API**
   - API em Node.js com Express.
   - Endpoints: `/usuarios`, `/eventos`, `/categorias`, `/locais`.

---

## 💻 Como Rodar a API

1. Entre na pasta da API:

```bash
cd EventFlowOFICIALOFICIAL2/EventFlowAPI
Instale as dependências:

bash
Copiar código
npm install
Inicie a API:

bash
Copiar código
npx nodemon server.js
A API ficará disponível em:

arduino
Copiar código
http://localhost:3000
Teste os endpoints no navegador ou Postman:

http://localhost:3000/usuarios

http://localhost:3000/eventos

http://localhost:3000/categorias

http://localhost:3000/locais

📱 Como Rodar o App
1. Modo Desenvolvimento (Expo)
Entre na pasta do app Expo:

bash
Copiar código
cd EventFlowOFICIALOFICIAL2
Instale as dependências do Expo:

bash
Copiar código
npm install
Inicie o app:

bash
Copiar código
npx expo start
Abra no celular via QR Code ou no emulador.

2. Instalar APK
APK gerada disponível em: Download APK

Instale diretamente no Android.

✅ Testando Funcionalidades
Login com usuários cadastrados na API.

Visualizar lista de eventos.

Abrir detalhes do evento.

Cadastrar categorias e locais.

Ver mapa com marcadores de eventos.

Logout e login novamente para testar persistência de sessão.

🔑 Contato
Desenvolvedor: Arildo dos Anjos Morais Júnior

Email: junior@gmail.com

yaml
Copiar código
