// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo implementa uma API RESTful baseada no JSONServer
// O servidor JSONServer fica hospedado na seguinte URL
// https://jsonserver.rommelpuc.repl.co/contatos
//
// Para montar um servidor para o seu projeto, acesse o projeto 
// do JSONServer no Replit, faça o FORK do projeto e altere o 
// arquivo db.json para incluir os dados do seu projeto.
//
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
//
// Autor: Rommel Vieira Carneiro
// Data: 03/10/2023

const jsonServer = require('json-server')
const server = jsonServer.create()

// Para permitir que os dados sejam alterados, altere a linha abaixo
// colocando o atributo readOnly como false.
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.listen(3000, () => {
  console.log('JSON Server está em execução!')
})