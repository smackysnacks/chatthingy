package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sort"
	"sync"
	"time"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type message struct {
	Type string `json:"type"`
	Data string `json:"data"`
}

type user struct {
	name string
}

type Users []user

func (u Users) Len() int {
	return len(u)
}

func (u Users) Less(i, j int) bool {
	return u[i].name < u[j].name
}

func (u Users) Swap(i, j int) {
	u[i], u[j] = u[j], u[i]
}

var users = make(Users, 0)

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

func genUsername() string {
	now := time.Now()
	digits := fmt.Sprintf("%v", now.UnixNano())

	return digits[11:]
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

	// generate a new username until we find one that doesn't exist
	// in our users slice
	name := genUsername()
	for sort.Search(len(users), func(i int) bool { return users[i].name == name }) != len(users) {
		name = genUsername()
	}

	// add generated user to users slice and sort by name
	users = append(users, user{name: name})
	sort.Sort(users)

	c := &connection{ws: ws}
	connections.conns[c] = struct{}{}
	go readLoop(c)

	// tell all connected clients that user has joined
	msg := message{Type: "join", Data: name}
	for conn, _ := range connections.conns {
		conn.ws.WriteJSON(msg)
	}

	// tell this client about all other users
	for _, user := range users {
		if user.name == name {
			continue
		}

		msg = message{Type: "join", Data: user.name}
		c.ws.WriteJSON(msg)
	}
}
