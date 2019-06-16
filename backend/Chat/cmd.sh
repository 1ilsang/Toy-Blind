#!/bin/sh

help() {
    echo "\nUsage: sh cmd.sh [option]"
    echo "\noption: init, start, stop, delete"
    echo "\tinit - Image build and Docker run"
    echo "\tstart - Docker restart"
    echo "\tstop - Docker stop"
    echo "\tdelete - Docker stop and Docker remove (with Build image)"
}

if [ $1 == 'init' ];then
    docker build -t chat-server . &&
    docker run -d -p 3010:3010 --name chat1 -e PORT=3010 --link redis:redis chat-server &&
    docker run -d -p 3020:3020 --name chat2 -e PORT=3020 --link redis:redis chat-server &&
    docker run -d -p 3030:3030 --name chat3 -e PORT=3030 --link redis:redis chat-server
elif [ $1 == 'start' ];then
    docker restart chat1 && docker restart chat2 && docker restart chat3
elif [ $1 == 'stop' ];then
    echo "loading..." &&
    docker stop chat1 && docker stop chat2 && docker stop chat3
elif [ $1 == 'delete' ];then
    echo "loading..." &&
    docker stop chat1 && docker stop chat2 && docker stop chat3 &&
    docker rm chat1 && docker rm chat2 && docker rm chat3 &&
    docker rmi chat-server
else
    help
fi

