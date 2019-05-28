#!/bin/sh

err() {
	echo "\nERROR - Impossible command"
	echo "Usage: [front/back] [build/dev/start]"
	echo "\ne.x) ./simple_script.sh front build"
	echo "\noption:	front - build, dev"
	echo "        back - start"
}

if [ $# -ne 2 ]
then
	err
	exit 0
fi

target=$1
option=$2

if [ $target == 'front' ];then
	cd frontend
	if [ $option == 'build' ];then
		echo '\nSCRIPT :: client-build'
		npm run build
	elif [ $option == 'dev' ];then
		echo '\nSCRIPT :: client-dev'
		npm run dev
	else
		err
	fi
	cd ..
elif [ $target == 'back' ];then
	cd backend
	if [ $option == 'start' ];then
		echo '\nSCRIPT :: backend-start'
		npm run start
	else
		err
	fi
	cd ..
else
		err
fi


