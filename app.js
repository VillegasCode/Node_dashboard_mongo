//Mirar este video https://www.youtube.com/watch?v=RGJ8Geq3tGU
const express = require('express')
const app = express()

//Invocamos a la conexión para la DB
const conexion = require('./database/db')
conexion.once('open', ()=> console.log('Conexion exitosa a MongoDB'))
conexion.on('error', ()=> console.log('El error de conexion es: ' + error))

//AdminBro
const AdminBro = require('admin-bro')
const expressAdminBro = require('@admin-bro/express')
const mongooseAdminBro = require('@admin-bro/mongoose')

//MODELOS
const User = require('./models/User')
const Post = require('./models/Post')

AdminBro.registerAdapter(mongooseAdminBro)
const AdminBroOptions = {resources: [User, Post]}

const adminBro = new AdminBro(AdminBroOptions)
const router = expressAdminBro.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

app.get('/', (req, res)=>{
    res.send('Dashboard con Node')
})

app.listen(3000, ()=>{
    console.log('Server Up! en http://localhost:3000/admin')
})