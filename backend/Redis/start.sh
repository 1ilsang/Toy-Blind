#!/bin/sh

docker pull redis && docker run -d -p 6379:6379 --name redis redis
