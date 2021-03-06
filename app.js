const express = require('express')
const app = express()
const port = 3000

// template engine
const expressHandlebars = require('express-handlebars')
app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')

// middle for logging requests on terminal
const logRequest = require('./tools/logRequest')
app.use(logRequest)

const logs = []

app.get('/', (req, res) => {
  logs.unshift(res.locals.logs)
  res.render('index', { message: '對 endpoint / 發出GET request', logs })
})

app.get('/delay', (req, res) => {
  setTimeout(() => {
    logs.unshift(res.locals.logs)
    res.render('index', { message: '至少延遲1秒後，再對 endpoint / 發出GET request', logs })
  }, 1000)
})

app.get('/new', (req, res) => {
  logs.unshift(res.locals.logs)
  res.render('index', { message: '對 endpoint /new 發出GET request', logs })
})

app.get('/:id', (req, res) => {
  logs.unshift(res.locals.logs)
  res.render('index', { message: '對任意id內容的 /:id endpoint 發出GET request', logs })
})

app.post('/', (req, res) => {
  logs.unshift(res.locals.logs)
  res.render('index', { message: '對 endpoint / 發出POST request', logs })
})

app.post('/download', (req, res) => {
  const file = './requestLogs/requestLogs.txt'
  const timeStart = new Date()
  const date = timeStart.toISOString().slice(0, 10)
  const time = timeStart.toLocaleTimeString('en-US', { timeStyle: 'medium', hour12: false }).split(':').join('') // HH:MM:SS to HHMMSS
  const fileName = `log_${date}_${time}.txt`
  res.download(file, fileName)
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
