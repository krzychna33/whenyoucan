whenyoucan-frontend-id=$(shell docker ps -a -q -f "name=whenyoucan-frontend")

build-all:
	@docker-compose -f docker-compose.yml build

run:
	@docker-compose -f docker-compose.yml up -d

stop:
	@docker-compose stop

rm:
	@docker rm $(whenyoucan-frontend-id)

rebuild: stop rm build-all run

test:
	@docker exec -t rma npm run test

test-u:
	@docker exec -t rma npm run test -- -u

build-server:
	@docker exec -t rma npm run build:server

attach-console:
	@docker logs --follow $(whenyoucan-frontend-id)
