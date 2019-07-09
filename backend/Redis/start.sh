#!/bin/sh

help() {
    echo "\nUsage: sh cmd.sh [option]"
    echo "\noption: init, start, stop, delete"
    echo "\tinit - Image build and Docker run"
    echo "\tstart - Docker restart"
    echo "\tstop - Docker stop"
    echo "\trm - Docker stop and Docker remove (with Build image)"
}

if [ $1 == 'init' ];then
    docker pull redis && docker run -d -p 6379:6379 --name redis redis
elif [ $1 == 'start' ];then
    docker restart redis
elif [ $1 == 'stop' ];then
    echo "Redis :: stop" &&
    docker stop redis
elif [ $1 == 'rm' ];then
    docker stop redis && docker rm redis && docker rmi redis
else
    help
fi
