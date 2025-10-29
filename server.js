import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
const PORT = 8000;


app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "techor_db",
});
 

db.connect(err => {
  if (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL!");
});

// Rota para receber o formulário
app.post("/enviar", (req, res) => {
  const { nome, email, mensagem } = req.body;
  const sql = "INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)";
  db.query(sql, [nome, email, mensagem], err => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao salvar mensagem 😢");
    } else {
      res.send("Mensagem enviada com sucesso 💚");
    }
  });
});


// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Rotas específicas (opcional)
app.get("/sobre", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sobre.html"));
});

app.get("/infos", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "infos.html"));
});

app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contato.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor Express rodando em http://localhost:${PORT}`);
});
