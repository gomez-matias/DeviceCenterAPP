import express from "express"
import morgan from "morgan"
import path from "path"
import { engine } from "express-handlebars"
import {fileURLToPath} from 'url';
import router from './routes/routes.js'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";


// Initialization
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers:{
        json: function(context){
            return JSON.stringify(context)
        }
    }
}));
app.set('view engine', '.hbs')

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(cookieParser( 'SecretStringForCookies7_7'))
app.use(session({
    secret: 'SecretStringForSession7_7',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use(router)

// Global Variables

// Public

// Start 
app.listen(app.get('port'))


