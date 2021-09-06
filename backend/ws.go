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
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

type user struct {
	name string
	ws   *websocket.Conn
}

type Users []user

var userslock = sync.Mutex{}

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

func genUsername() string {
	now := time.Now()
	digits := fmt.Sprintf("%v", now.UnixNano())

	return digits[11:]
}

func disconnectUser(u *user) {

	name := u.name

	userslock.Lock()
	// remove the user from users slice
	for i, _ := range users {
		if users[i].name == u.name {
			users = append(users[:i], users[i+1:]...)
			break
		}
	}
	userslock.Unlock()

	// inform other users of leave
	broadcastMessage(message{Type: "leave", Data: name})
}

func broadcastMessage(m message) {
	userslock.Lock()
	defer userslock.Unlock()

	for _, u := range users {
		u.ws.WriteJSON(m)
	}
}

func readLoop(u *user) {
	for {
		messageType, p, err := u.ws.ReadMessage()
		if err != nil {
			disconnectUser(u)
			return
		}

		// text messages should be broadcast to all users
		if messageType == websocket.TextMessage {
			m := struct {
				User    string `json:"user"`
				Message string `json:"message"`
			}{
				u.name,
				string(p),
			}

			broadcastMessage(message{Type: "message", Data: m})
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
	connectinguser := user{name: name, ws: ws}
	users = append(users, connectinguser)
	sort.Sort(users)

	go readLoop(&connectinguser)

	// tell all connected clients that user has joined
	msg := message{Type: "join", Data: name}
	for _, u := range users {
		u.ws.WriteJSON(msg)
	}

	// tell this client about all other users
	for _, u := range users {
		if u.name == name {
			continue
		}

		msg = message{Type: "join", Data: u.name}
		connectinguser.ws.WriteJSON(msg)
	}
}
