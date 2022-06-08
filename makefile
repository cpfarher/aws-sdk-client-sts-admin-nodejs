build:
	docker build . -t cpfarher/node-aws

run:
	docker run -p 49160:8080 --rm cpfarher/node-aws

start: build run
