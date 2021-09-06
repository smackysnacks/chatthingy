package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

const STATIC_ROOT = "webapp/build/"

func Home(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "webapp/build/index.html")
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", Home)
	r.HandleFunc("/ws", Websocket)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir(STATIC_ROOT)))

	fmt.Println("Listening on http://localhost:8080/")
	http.ListenAndServe(":8080", r)
}
