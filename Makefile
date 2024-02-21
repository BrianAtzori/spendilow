run:
	make --always-make -j 2 all

all: server app

app: 
		cd client;npm run dev

server: 
		cd server&&npm run dev

test:
		cd server;npm run test 2>&1 | tee test-logs.txt

.PHONY: app server test