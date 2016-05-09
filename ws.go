package main

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sync"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type connection struct {
	ws *websocket.Conn
}

var connections = struct {
	mutex sync.Mutex
	conns map[*connection]struct{}
}{
	sync.Mutex{},
	make(map[*connection]struct{}),
}

func cleanupConnection(c *connection) {
	if _, ok := connections.conns[c]; ok {
		connections.mutex.Lock()
		delete(connections.conns, c)
		connections.mutex.Unlock()
	}
}

func readLoop(c *connection) {
	for {
		messageType, p, err := c.ws.ReadMessage()
		if err != nil {
			cleanupConnection(c)
			return
		}

		// write the message to all connected clients
		if messageType == websocket.TextMessage {
			connections.mutex.Lock()
			for conn, _ := range connections.conns {
				conn.ws.WriteMessage(websocket.TextMessage, p)
			}
			connections.mutex.Unlock()
		}
	}
}

func Websocket(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println(err)
		return
	}

	c := &connection{ws: ws}
	connections.conns[c] = struct{}{}
	go readLoop(c)
}
