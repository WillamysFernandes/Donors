//configurando o servidor
const express = require("express")
const server = express()

//configurar servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//Habilitar body do formulário
server.use(express.urlencoded({extended: true}))

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true, //bolleano aceita dois valores, true or false
})


//Lista de doadores: Array
const donors = [
    {
        name : "Enderson Amorim",
        blood: "O+",
    },
    {
        name : "Luana Pontes",
        blood: "AB+"
    },
    {
        name : "Willamys Fernandes",
        blood: "A+"
    },
    {
        name : "Enderson Jr",
        blood: "O+"
    },
    
]


//configurar apresentação da página, buscar dados e apresenta-los
server.get("/", function(req, res){
    return res.render("index.html", { donors })
})

//Pegar dados do formulário
server.post("/", function(req, res){
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood
//coloco valores dentro do array
    donors.push({
        name : name,
        blood : blood,
    })
    return res.redirect("/")
})


//ligar servidor e permitir acesso na porta 3000
server.listen(3000, function(){
    console.log("iniciei o servidor")
})