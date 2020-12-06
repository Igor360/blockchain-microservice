db.movie.insert({"name": "tron_db"});
db.createUser({
    user: 'user',
    pwd: '194352e304',
    roles: [
        {
            role: "readWrite",
            db: 'grd_db'
        }
    ]
});