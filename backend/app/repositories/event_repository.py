from app.database.mongodb import db


class EventRepository:

    @staticmethod
    def create(event_data):
        return db.events.insert_one(event_data)

    @staticmethod
    def get_all():
        return list(db.events.find())