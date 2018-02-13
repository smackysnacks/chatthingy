all: chatthingy

chatthingy:
	cd webapp; npm install; npm run build
	go get && go build

clean:
	rm -f chatthingy
