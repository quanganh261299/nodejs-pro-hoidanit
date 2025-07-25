import express from "express"
import 'dotenv/config'
import webRoutes from "./routes/web"

const app = express()
const PORT = process.env.PORT || 8080

// config view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views/')

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static files: image/css/js
app.use(express.static('public'))

// config routes
webRoutes(app);

app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`)
    console.log(__dirname + '/views/')
})