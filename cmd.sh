#!/bin/sh

err() {
	echo "\nERROR - Impossible command"
	echo "\nUsage: [front/back/npm] [build/dev/start/i]"
	echo "\ne.x) sh cmd.sh front build"
	echo "\noption:	[front] [build / dev] : Webpack : build / DEV start"
	echo "        [back] [start] : PORT - 3000"
	echo "        [npm] [i] : This is installed at once."
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
	elif [ $option == 'start' ];then
		echo '\nSCRIPT :: client-start'
		npm run build && npm run dev
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
elif [ $target == 'npm' ] && [ $option == 'i' ];then
	echo '\nNPM install :: frontend\n'
	cd frontend
	npm i
	cd ..
	echo '\nNPM install :: backend\n'
	cd backend
	npm i
	cd ..
else
		err
fi


