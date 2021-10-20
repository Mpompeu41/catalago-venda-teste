require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
let message = "";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const Kimonos = require("./models/kimonos");

app.get("/", async (req, res) => {
  const kimono = await Kimonos.findAll();

  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index", {
    kimono,
    message,
  });
});

app.get("/detalhes/:id", async (req, res) => {
  const kimono = await Kimonos.findByPk(req.params.id);
  res.render("detalhes", {
    kimono,
  });
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro", {
    message,
  });
});

app.post("/new", async (req, res) => {
  const { nome, tamanho, cor, preco, imagem } = req.body;

  const kimono = await Kimonos.create({
    nome,
    tamanho,
    cor,
    preco,
    imagem,
  });
  message = `O Kimonos ${kimono.nome} foi criado!!!`;
  res.redirect("/");
});

app.get("/editar/:id", async (req, res) => {
  const kimono = await Kimonos.findByPk(req.params.id);

  res.render("editar", {
    kimono,
    message,
  });
});

app.post("/editar/:id", async (req, res) => {
  const kimono = await Kimonos.findByPk(req.params.id);

  const { nome, tamanho, cor, preco, imagem} = req.body;

  kimono.nome = nome;
  kimono.tamanho = tamanho;
  kimono.cor = cor;
  kimono.preco = preco;
  kimono.imagem = imagem;

  const kimonoEditado = await kimono.save();
  kimonoEditado,
    message = `O kimono ${kimono.nome} foi Editado com sucesso!!`,
    res.redirect("/");
});

app.get("/deletar/:id", async (req, res) => {
  const kimono = await Kimonos.findByPk(req.params.id);

  res.render("deletar", {
    kimono,
    message,
  });
});
app.post("/deletar/:id", async (req, res) => {
  const kimono = await Kimonos.findByPk(req.params.id);

  await kimono.destroy();
  message = `Kimono ${kimono.nome} deletado com sucesso!`;
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
