# Toy-Blind

0. 목표
	- 블라인드 앱을 모방해 보자.

1. 기술스택
	- Vue, Vuex, Node, Express, MySQL, Redis: Pub/Sub, JWT, WebSocket
	- Linux, Docker, GCP

2. 기능
	- 회원 CRUD
		- 익명
	- 게시판 CRUD
		- 좋아요 on/off
		- 댓글 CRUD
		- 대댓글 CRUD
	- 1:1 채팅
	- 쪽지 보내기

3. 어떻게 실행하나요?
	- frontend / backend 디렉토리별 package.json 에 실행 스크립트가 있습니다.
	- 통합 커멘드 라인을 지원합니다
		``` bash
		./cmd.sh [target] [option]
		```
		![command-image1](.readmedoc/img/cmd1.png)
	
License
---
This is released under the MIT license. See [LICENSE](LICENSE) for details.

