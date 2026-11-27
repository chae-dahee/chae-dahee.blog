---
title: "[네트워크] 6. Application Layer"
slug: "network-application-layer"
excerpt: "클라이언트-서버와 P2P 구조부터 HTTP 요청·응답과 쿠키·웹 캐시, SMTP, DNS 계층 구조와 질의 방식까지 네트워크 6강 내용을 정리한다."
category: "CS"
tags: ["네트워크", "응용계층", "HTTP"]
date: "2023-12-08T19:41"
published: true
---

## 개념

최상위 계층. OS 위에서 동작

**프로토콜** : Email → SMTP, Web → HTTP, File 전송 → FTP

그 외 POP3, IMAP, DNS 등

### Client - Server

Server : 항상 ON 켜져 있는 상태, Client의 연결을 기다리고 있음, unique(고정) IP address 가지고 있고, Client IP 주소 몰라도 됨

Client : 서버 IP 주소 알아야 함, src IP, dest IP 정보를 헤더에 가지고 네트워크 계층으로 request를 보내는 등의 연결 방식

~~클라이언트-클라이언트~~ 직접적 연결 안 함 ⇒ 클라이언트 - 서버 - 클라이언트 연결

### P2P

**항상 켜져 있는 서버 없이** peer끼리 직접 통신 연결. 각 peer가 클라이언트이자 서버 역할

(ex. 폰 to Car, BitTorrent)

## Web = HTTP

![웹 요청 동작](/posts/network-application-layer/web-request-flow.png)

클라이언트 : 웹페이지 화면 사용자에게 보여주기 위해 브라우저 Browser 프로그램 사용함

브라우저 : HTML 형식에 따라 모니터에 화면을 띄워줌

1. 클라이언트는 외부의 웹 server에게 HTTP Request message로 접속할 거라는 요청
2. Web Server는 클라이언트에게 브라우저가 해석해야 할 HTML 문서를 response로 보내줌
3. 브라우저가 문서를 해석해서 사용자의 모니터에 화면을 띄워줌

### HTTP

HyperText Transfer Protocol, 클라이언트-서버 구조

클라이언트 : 브라우저 Browser 프로그램(HTTP protocol로 사용됨), 웹 화면에 띄움

Browser : IE, Edge, Chrome, Firefox, Safari...

동작

1. 브라우저는 접속하려는 서버에 HTTP request를 보냄
2. 서버는 해당 request에 response를 보낸다 (HTML 파일 문서)
3. 브라우저가 문서를 받아서 모니터에 사람이 볼 수 있도록 띄움

![HTTP request, response message](/posts/network-application-layer/http-message.png)

**Client (request message)**

request line 필드 : 어떤 것을 요청하는지 적어서 서버에 보냄

- HTTP 메서드 : GET, POST, PUT, HEAD, DELETE
- 요청 대상 URL
- HTTP 버전 : HTTP/1.1

헤더 + 바디 추가된 내용

**Server (response message)**

status line 필드 = **status code**

- HTTP 버전 : HTTP/1.1
- 응답에 대한 상태 코드와 메시지 : 200 OK, 400 Bad Request, 403 Forbidden, 404 Not Found...

404 Not Found : 요청한 링크(리소스)가 서버에 없을 때 자주 보임. 인터넷 연결이 안 되는 경우는 HTTP 응답 자체를 못 받아 브라우저 오류 화면이 뜸

성공할 경우 200 코드를 가지고 성공한 통신을 보여줌

서버 1 클라이언트 N / 클라이언트 1 브라우저(OS) N

#### TCP 통신 이용

HTTP/1.x, 2.x ⇒ TCP, HTTP/3 ⇒ UDP 위의 QUIC

통신 과정

1. 클라이언트가 TCP 연결 요청 ⇒ 서버의 Dest port # = 80 (HTTPS는 443)
2. 서버는 요청을 승낙하고, 브라우저와 서버는 계속 HTTP message를 주고받음
3. 연결 종료

#### Cookie 쿠키

HTTP는 stateless(이전 요청을 기억하지 않음) → 상태 유지를 위해 쿠키 사용

- 내 특정 상태(정보)를 클라이언트와 웹 서버가 저장해 놓음. 브라우저는 쿠키를, 서버는 쿠키 ID에 연결된 정보를 DB에 저장
- 작은 size. 고유 ID 숫자, key=value 텍스트로 구성됨
- 저장 주체 : client 브라우저 관리 데이터
- ex. 팝업 ☑️더 이상 보지 않기 / 로그인 상태 유지

![쿠키 동작](/posts/network-application-layer/cookie.png)

cache 캐시 : 자주 사용되는 데이터나 명령어를 빠르게 접근할 수 있는 임시 저장 공간. 동영상, 이미지 같은 큰 용량 내부 저장해 놓음. 통신 없이 저장한 소스 보여줌

### Web caches (proxy servers)

한 대의 서버에 요청이 너무 많이 몰리지 않도록, 클라이언트와 서버 중간 단계에 프록시 서버를 둔다. 응답 시간 단축, 외부 링크 트래픽 감소

한국에서 자주 접속하는 사이트의 웹 페이지(객체)를 proxy server에 저장해 두고 브라우저에 바로 전송함.

자주 접속 안 하는 외국 사이트 → 프록시에 없어서(cache miss) 원 서버까지 가야 하므로 로딩 오래 걸리는 경우!

## Email = SMTP

Simple Mail Transfer Protocol

이메일 송수신하기 위한 프로토콜

메일 주소에 직접 보내는 게 아닌, 송신자의 메일 서버가 수신자 도메인의 메일 서버로 SMTP(TCP 25번 포트)를 통해 전송하고, 수신자 메일박스에 저장됨. 수신자는 POP3, IMAP, HTTP(웹메일)로 메일을 가져옴

클라이언트 : 유저(user agent, 메일 프로그램)

서버 : 기관마다 존재하는 mail server

## ⭐DNS

Domain Name System

도메인 : www.\_\_\_\_\_ / 문자 형식의 주소 체계

컴퓨터 IP 주소 체계 ↔ 사람이 읽는 도메인 이름 연결 짓는 프로토콜 = 도메인 주소를 IP 주소로 **mapping**

![nslookup으로 본 canonical name과 alias](/posts/network-application-layer/dns-nslookup.png)

실제 이름(주소) canonical name : www.naver.com.nheos.com

Aliases : 도메인 별명 www.naver.com

→ 부하를 관리하기 위해 하나의 도메인에 여러 개의 IP 주소 N개가 매칭된다

### 구조

계층화된 분산 DB 구조

![DNS 계층 구조](/posts/network-application-layer/dns-hierarchy.png)

Root 다음 단계에서 .com 등을 Top Level Domain(TLD)으로 구분함

#### **TLD** Top Level Domain

어느 DNS 서버에 저장되어 있는지 구분된 도메인 서버를 파악함. 다음에 물어볼 권한 DNS 서버를 알려줌

- country Domain : kr, uk, fr 나라를 나타내는 도메인 관리
- 그 외 일반 최상위 도메인(gTLD) : .com, .net, .org, .edu

#### **권한 Authoritative** DNS 서버

- 기업, ISP, 개인 구축한 서버
- 최종 도메인을 가지고 IP 주소를 클라이언트에게 response 해줄 수 있다.

### 동작방식

#### iterated 반복 - 적절

호스트와 root DNS server 사이의 local DNS server가 존재함

인터넷 서비스 provider or 내부 외부 DNS 서버를 들여와서 중간 단계 역할 함

3, 5 : 어떤 TLD / Authoritative DNS Server로 보내야 하는지 response함

7 : 권한 DNS 서버가 도메인 주소와 매핑되는 IP 주소를 local DNS 서버로 응답, 8 : local DNS 서버가 클라이언트로 전송

local DNS 서버는 받은 결과를 TTL 동안 캐싱 → 같은 질의는 root, TLD까지 가지 않고 바로 응답

![iterated query](/posts/network-application-layer/dns-iterated.png)

#### recursive 회귀 - 부적절

과부하. 질의를 받은 서버가 대신 끝까지 찾아 주므로 상위 계층(root, TLD) 서버에 부담이 큼

실제로는 호스트 → local DNS 서버는 recursive, local DNS 서버 → root, TLD, 권한 서버는 iterated로 조합해 사용

![recursive query](/posts/network-application-layer/dns-recursive.png)

## 회고

수업 내용을 들으면서 정리하였다. 응전네데물을 학기 동안 뜯어보는 내용이었는데, 응전보다 네데물 부분이 더 어려운 내용인 것 같다. 시험 범위가 전 범위여서 걱정이다.. 아자잣!

참고 : [https://hororolol.tistory.com/category/Computer%20Networks/%EC%9D%B4%EB%A1%A0](https://hororolol.tistory.com/category/Computer%20Networks/%EC%9D%B4%EB%A1%A0)

서치를 하다가 해당 블로그에서 수업 자료와 비슷한 느낌으로 정리한 것을 보았다. 그 밖에 GPT를 활용하여 글을 작성하였다
