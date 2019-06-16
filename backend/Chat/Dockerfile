FROM node:12

MAINTAINER 1ilsang <1ilsang@naver.com>

RUN apt-get update
RUN apt install -y redis-server

# 앱 디렉토리 생성
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

# start.sh 에서 알아서 넣는다.
# ENV PORT 3010
# EXPOSE 3010

# 앱 소스 추가
COPY . .

CMD service redis-server start && npm start && bash