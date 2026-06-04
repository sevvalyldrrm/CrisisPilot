from app.database.mongodb import db

result = db.test.insert_one({
    "message": "MongoDB connected"
})

print(result.inserted_id)