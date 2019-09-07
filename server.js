const express = require('express')
bodyPaser = require('body-parser')
fs = require('fs')
app = express()
port = 8084

users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'))
artists = JSON.parse(fs.readFileSync('data/artists.json', 'utf-8'))

app.use(bodyPaser.urlencoded({ extended: true }))
app.use(bodyPaser.json())

token = () => {
    key = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
    return key
}

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

const writeFile = () => {
    fs.writeFileSync('data/users.json', JSON.stringify(users))
    fs.writeFileSync('data/artists.json', JSON.stringify(artists))
}

app.use(express.static(__dirname));


app.get('/artists', (req, res) => {
    res.json(artists);
})


app.post('/signup', (req, res) => {
    user = req.body
    user.token = ""
    users.push(user)
    writeFile();
})

app.post('/login', (req, res) => {
    userTryLog = req.body
    let result = {}
    user = users.find((x) => x.email == userTryLog.email && x.password == userTryLog.password)
    if (user) {
        result.error = false
        result.token = token()
        user.token = result.token
    } else {
        result.error = true
    }
    res.json(result)
})

app.post('/logged', (req, res) => {
    userTryLog = req.body
    let result = {}
    user = users.find((x) => x.id == userTryLog.id && x.token == userTryLog.token)
    if (user) {
        result.error = false
    } else {
        result.error = true
    }
    res.json(result)
})

app.post('/search', (req, res) => {
    search = req.body.search
    result = artists.find((x) => x.name.toLowerCase().startsWith(search))
    res.json(result)
})

app.post('/like', (req, res) => {
    like = req.body.like
    user = req.body.id
    result = {}
    user = users.find((x) => x.id == user)
    if (user) {
        user.likes = like
        writeFile()
        result.like = true
    } else {
        result.like = false
    }
    res.json(result)
})

app.post('/playlist', (req, res) => {
    playlist = req.body.playlist
    user = req.body.id
    result = {}
    user = users.find((x) => x.id == user)
    if (user) {
        user.playlists = playlist
        writeFile()
        result.playlist = true
    } else {
        result.playlist = false
    }
    res.json(result)
})

app.get('/top', (req, res) => {
    top = {}
    users.forEach(x => {
        if (x.likes != '') {
            x.likes.forEach(y => {
                artists.forEach(a => {
                    if (a.id == y.id_artist) {
                        top.artist = a
                        a.albums.forEach(b => {
                            if (b.id == y.id_album) {
                                top.albums = b
                            }
                        })
                        a.songs.forEach(c => {
                            if (c.id == y.id_song) {
                                top.songs = c
                            }
                        })
                    }
                });
                console.dir(top.albums)
            })
        }
    });
    res.json(top)
})

app.listen(port)