import socket
from db_stuff import (
    create_db,
    insert_client,
    insert_message,
    get_client_messages,
    get_clients,
)
import re
from collections import defaultdict

UDP_MAX_SIZE = 65535


def get_port_from_client(client: str):
    return int("".join(re.findall(r"\d+", client)))


def listen(host: str = "127.0.0.1", port: int = 3000):
    socket_object = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    socket_object.bind((host, port))

    print(f"Listening at {host}:{port}")

    members = get_clients()

    members_visits_count = defaultdict(int)

    for el in members:
        members[el] = 0

    while True:
        msg, addr = socket_object.recvfrom(UDP_MAX_SIZE)
        client_id = addr[1]
        client = f"client{client_id}"

        if client not in members:
            insert_client(client)
            members.append(client)

        if not msg:
            continue

        if msg.decode("ascii") == "__join":
            print(f"Client {client_id} joined chat")
            if members_visits_count[client] == 0:
                socket_object.sendto("Welcome to chat".encode("ascii"), addr)
                members_visits_count[client] += 1
                continue
            for el in get_client_messages():
                socket_object.sendto(el.encode("ascii"), addr)
            continue

        client = f"client{client_id}"
        msg = f'{client}: {msg.decode("ascii")}'
        insert_message(client, msg)

        for member in members:
            if member == client:
                continue

            socket_object.sendto(
                msg.encode("ascii"), (host, get_port_from_client(member))
            )


if __name__ == "__main__":
    create_db()
    listen()
