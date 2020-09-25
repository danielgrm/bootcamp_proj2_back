const mongoose = require("mongoose")

const FilmSchema = new mongoose.Schema({
    titulo : {
        type: String,
        required: true,
        unique: true
    },
    ano : {
        type: Number,
        required: true
    }, 
    genero : {
        type: String,
        required: true
    }, 
    duracao : {
        type: Number,
        default: true
    },
    diretor : {
        type: String,
    }
    
    
})

module.exports =  mongoose.model('dbase0', FilmSchema)


// class Usuario {
//   constructor(titulo, ano, genero, duracao, diretor) {
//     this.titulo = titulo
//     this.ano = ano
//     this.genero = genero
//     this.duracao = duracao
//     this.diretor = diretor

//   }
// }

// let listadeusuarios = []
// listadeusuarios.push(new Usuario(titulo = "Ghostbusters", ano = 1984, genero = "comedia", duracao = 105, diretor = "Ivan Reitman"))
// listadeusuarios.push(new Usuario(titulo = "Blade Runner", ano = 1982, genero = "sci-fi", duracao = 117, diretor = "Ridley Scott"))
// listadeusuarios.push(new Usuario(titulo = "Raiders of the Lost Ark", ano = 1981, genero = "aventura", duracao = 115, diretor = "Steven Spielberg"))
// listadeusuarios.push(new Usuario(titulo = "Matrix", ano = 1999, genero = "sci-fi", duracao = 126, diretor = "Wachowski Brothers"))
// listadeusuarios.push(new Usuario(titulo = "Star Wars", ano = 1978, genero = "aventura", duracao = 121, diretor = "George Lucas"))
// listadeusuarios.push(new Usuario(titulo = "Tropa de Elite", ano = 2007, genero = "policial", duracao = 115, diretor = "José Padilha"))
// listadeusuarios.push(new Usuario(titulo = "BootCamp", ano = 2020, genero = "terror", duracao = 3000, diretor = "Elberth Moraes"))
// module.exports = {
//   Usuario,
//   listadeusuarios
