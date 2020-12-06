#!make
define LOGO

endef

RED='\033[0;31m'         #  ${RED}
GREEN='\033[0;32m'       #  ${GREEN}
YELLOW='\033[0;33m'      #  ${GREEN}
BOLD='\033[1;m'          #  ${BOLD}
WARNING='\033[37;1;41m'  #  ${WARNING}
END_COLOR='\033[0m'      #  ${END_COLOR}
.PHONY: install clean all TAGS info check distclean

DOCKER_COMPOSE_FILE=-f ./docker/docker-compose.yml -f ./docker/docker-compose.dev.yml
PROJECT_NAME=manager_blockchain_app
ifeq ($(MODE), PROD)
	DOCKER_COMPOSE_FILE=-f ./docker/docker-compose.yml
endif

export LOGO

all : help

listCommands help: # List all command call make help or make listCommands ## '^[^\.#[:space:]].*:' - old regex save, maybe useful in future ##
	@$(MAKE)  --no-print-directory info
	@echo ${GREEN}"\nHELP INFORMATION:\n" ${END_COLOR}
	@GREP_COLOR='01;33' grep --color=always  '^[^\.^[:space:]][^:]*:' Makefile | sed G
.PHONY:listCommands

info: # Base info
	@echo ${BOLD}"*********************"${RED}POWERED BY EXPRESS JS${END_COLOR}"**************************"${END_COLOR}
	@echo "$$LOGO"
	@echo ${BOLD}"For getting all commands list run"${GREEN}"make help"${END_COLOR}"or"${GREEN}make listCommands${END_COLOR}${END_COLOR}
	@echo ${BOLD}"If you want start app run"${RED}"make up"${END_COLOR}"or"${RED}make run${END_COLOR}"when your containers stopped"${END_COLOR}
	@echo ${BOLD}"Lets go! Have a good codding time..."${END_COLOR}
	@echo ${BOLD}"**********************************************************"${END_COLOR}
.PHONY: info

reload: # Reload application
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) down
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) up -d --build
.PHONY: restart

restart: # Restart application
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) stop
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) up -d --build
.PHNY:restart

down: # Stop all containers and delete volumes
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) down -v
.PHONY: down

stop: # Stop all containers
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) stop
.PHONY: stop

up: run # Start application
.PHONY: up

run: # Build and start application
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) up -d --build
.PHONY: run

goToServer: # Go to server container console
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) exec server sh
.PHONY: goToServer

startServer: # Start server container
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) up -d --build server
.PHONY: startServer

log: # Get server container logs
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) logs --tail=200 server
.PHONY: log

logDB: # Get database container logs
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) logs --tail=all database
.PHONY: logDB

logExpress: # Get mongo express container logs
	@docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) logs mongo-express
.PHONY: logExpress

ps:status # Get status of containers
.PHONY:ps

status: # Get status of containers
	docker-compose -p $(PROJECT_NAME) $(DOCKER_COMPOSE_FILE) ps
.PHONY: status

#buildServer: # Build php cli cron container and push to docker hub local
#	@$(MAKE)  --no-print-directory info
#	@echo ${GREEN}"\nBuilding image...\n" ${END_COLOR}
#	@docker rmi -f manager_blockchain_app || true
#	@docker build . -f docker/app/Dockerfile --tag manager_blockchain_app --no-cache
#	@docker tag manager_blockchain_app
#	@docker push
#	@docker rmi -f manager_blockchain_app || true
#	@echo ${GREEN}"\nFINISHED\n" ${END_COLOR}
#	@$(MAKE)  --no-print-directory end
#.PHONY: buildServer