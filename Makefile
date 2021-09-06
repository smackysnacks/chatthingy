.PHONY: run
run: ./backend/chatthingy ./webapp/build
	./backend/chatthingy

./backend/chatthingy:
	cd backend; go build

./webapp/build: ./webapp/src ./webapp/package.json ./webapp/tsconfig.json ./webapp/package-lock.json
	cd webapp; npm install; npm run build

.PHONY: clean
clean:
	rm -rf ./backend/chatthingy ./webapp/build
