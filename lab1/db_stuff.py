import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base


engine = sa.create_engine("sqlite:///chat.db")
session = sa.orm.Session(bind=engine)
Base = declarative_base()


class Client(Base):
    __tablename__ = "clients"
    id = sa.Column(sa.Integer(), primary_key=True)
    name = sa.Column(sa.String(100), nullable=False)


class Message(Base):
    __tablename__ = "messages"
    id = sa.Column(sa.Integer(), primary_key=True)
    message = sa.Column(sa.String(100), nullable=False)


def insert_client(client_name: str):
    client = Client(name=client_name)
    session.add(client)
    session.commit()
    print("URA")


def insert_message(client_name: str, message: str):
    client = session.query(Client).filter(Client.name == client_name).first()
    message = Message(client_id=client.id, message=message)
    session.add(message)
    session.commit()


def get_client_messages():
    messages = session.query(Message).all()
    return [message.message for message in messages]


def get_clients():
    clients = session.query(Client).all()
    return [client.name for client in clients]


def create_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
