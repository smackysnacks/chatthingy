## Dependencies
* Go
* NodeJS


## Building
* `npm install -g typings typescript`
* `cd static/scripts && typings install && tsc --jsx react --module AMD *.{tsx,ts}`
* `cd ../../ && go run *.go`

Navigate to `http://localhost:8080`
