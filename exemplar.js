// ========================================================================
// 🌐 Servidor Express completo — com as principais funcionalidades
// ========================================================================

// Importações essenciais
import express from "express";
import cors from "cors";           // Permite o acesso de apps externos (como React Native)
import morgan from "morgan";       // Mostra logs bonitos no terminal
import path from "path";
import { fileURLToPath } from "url";

// ========================================================================
// 🧩 Configurações básicas
// ========================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

// Middleware padrão para entender JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================================================
// ⚙️ Middlewares úteis
// ========================================================================

// 1️⃣ CORS — permite que apps externos acessem seu servidor
app.use(cors());

// 2️⃣ Morgan — exibe logs das requisições (ótimo para debug)
app.use(morgan("dev"));

// 3️⃣ Servir arquivos estáticos (front-end)
app.use(express.static(path.join(__dirname, "public")));

// ========================================================================
// 📁 Rotas de exemplo
// ========================================================================

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota de exemplo (HTML)
app.get("/sobre", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sobre.html"));
});

// ========================================================================
// 🧠 Rotas de API (para apps ou front-end consumir)
// ========================================================================

// GET — exemplo simples
app.get("/api/mensagem", (req, res) => {
  res.json({ sucesso: true, mensagem: "Olá do servidor Node.js! 🚀" });
});

// POST — recebendo dados (ex: formulário ou app mobile)
app.post("/api/contato", (req, res) => {
  const { nome, email, mensagem } = req.body;
  console.log("📩 Novo contato recebido:", { nome, email, mensagem });

  res.json({ sucesso: true, resposta: `Mensagem recebida, ${nome}!` });
});

// PUT — atualizar algum dado
app.put("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  res.json({ sucesso: true, mensagem: `Usuário ${id} atualizado para ${nome}` });
});

// DELETE — remover algum item
app.delete("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  res.json({ sucesso: true, mensagem: `Usuário ${id} removido com sucesso.` });
});

// ========================================================================
// ⚠️ Middleware de erro (último a ser executado)
// ========================================================================
app.use((err, req, res, next) => {
  console.error("🚨 Erro interno:", err);
  res.status(500).json({ erro: "Algo deu errado no servidor." });
});

// ========================================================================
// 🚀 Inicialização do servidor
// ========================================================================
app.listen(PORT, () => {
  console.log(`✅ Servidor Express rodando em http://localhost:${PORT}`);
});
