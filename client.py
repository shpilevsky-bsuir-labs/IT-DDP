import socket
import threading
import os


UDP_MAX_SIZE = 65535


def listen(socket_object: socket.socket):
    while True:
        msg = socket_object.recv(UDP_MAX_SIZE)
        print("\r\r" + msg.decode("ascii") + "\n" + "you: ", end="")


def connect(host: str = "127.0.0.1", port: int = 3000):
    socket_object = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    socket_object.bind((host, 33470))
    socket_object.connect((host, port))

    threading.Thread(target=listen, args=(socket_object,), daemon=True).start()

    socket_object.send("__join".encode("ascii"))

    while True:
        msg = input("you: ")
        socket_object.send(msg.encode("ascii"))


if __name__ == "__main__":
    os.system("clear")
    connect()
