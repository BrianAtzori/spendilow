run:
	make --always-make -j 2 all

all: server app test

app: 
		cd client;npm run dev

server: 
		docker compose up --build -d

test:
		cd server;npm run test 2>&1 | tee test-logs.txt

.PHONY: app server test