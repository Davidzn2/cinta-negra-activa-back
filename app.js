const { app } = require('./api');
const path = require('path') 

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/views/index.html'))
})
app.listen(process.env.PORT, ()=> console.log(`Listening on port ${process.env.PORT}`))