#!/usr/bin/python3

import socket
import threading
import argparse

# Parse command-line arguments
parser = argparse.ArgumentParser()
parser.add_argument("action", choices=["start", "connect"])
args = parser.parse_args()

# List to store connected clients
clients = []


# Broadcast function to send a message to all connected clients
def broadcast_message(message, sender_socket):
    for client in clients:
        try:
            if client != sender_socket:  # Don't send the message back to the sender
                client.send(message.encode("utf-8"))
        except:
            # Remove the client if there is an error (disconnection)
            clients.remove(client)


# Client handler function to handle communication with a single client
def handle_client(client_socket):
    try:
        # Get the client's remote address (IP and port)
        client_address = client_socket.getpeername()
        print(f"New connection from {client_address}")

        while True:
            # Receive message from the client
            message = client_socket.recv(1024).decode("utf-8")
            if message:
                print(f"Received message from {client_address}: {message}")
                broadcast_message(
                    message, client_socket
                )  # Broadcast message to all clients
            else:
                break  # If no message, assume client has disconnected

    except Exception as e:
        print(f"Error with client {client_socket.getpeername()}: {e}")

    finally:
        # Client has disconnected, remove them from the list
        print(f"{client_socket.getpeername()} has disconnected.")
        clients.remove(client_socket)
        client_socket.close()


# Function to start the client
def start_client():
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect(("127.0.0.1", 5555))
    except:
        print("Error connecting to the server.")
        return

    name = input("Enter your Name to chat: ")

    # Send the name to the server
    client_socket.send(name.encode("utf-8"))

    while True:
        # Get the message from the user and prepend the name
        message = input("Enter message to send: ")
        full_message = f"({name}) {message}"

        # Send the message to the server
        client_socket.send(full_message.encode("utf-8"))


# Server function to accept incoming client connections
def start_server(host, port):
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((host, port))
    server_socket.listen(5)
    print(f"Server started on {host}:{port}")

    while True:
        try:
            # Accept new client connections
            client_socket, client_address = server_socket.accept()
            clients.append(client_socket)

            # Create a new thread to handle communication with the client
            client_thread = threading.Thread(
                target=handle_client, args=(client_socket,)
            )
            client_thread.start()
        except KeyboardInterrupt as e:
            print("Server stopped.")
            break


# Main function
if __name__ == "__main__":
    # Set the host and port
    host = "127.0.0.1"
    port = 5555

    try:
        if args.action == "start":
            start_server(host, port)
        elif args.action == "connect":
            start_client()
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"Server is already running on {host}:{port}.")
        else:
            raise
