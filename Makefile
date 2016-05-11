all:
	npm install -g typings typescript
	(cd static/scripts && typings install && tsc --jsx react --module AMD *.{tsx,ts})
	go get && go build