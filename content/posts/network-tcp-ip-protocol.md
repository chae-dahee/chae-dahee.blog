---
title: "[네트워크] 1. TCP/IP Protocol Suite"
slug: "network-tcp-ip-protocol"
excerpt: "컴퓨터 네트워크의 구성 요소와 LAN·WAN, 물리적 토폴로지부터 프로토콜 계층화, TCP/IP와 OSI 7계층 모델까지 네트워크 1강 내용을 정리한다."
category: "CS"
tags: ["네트워크", "TCP-IP", "OSI7계층"]
date: "2023-12-06T18:48"
image: "/posts/network-tcp-ip-protocol/tcp-ip-layer-architecture.png"
published: true
---

## 컴퓨터 네트워크

스마트폰도 네트워크를 통해 데이터를 주고받는 통신을 한다.

컴퓨터와 컴퓨터 간의 연결을 어떤 방식으로 할 것인가?

여러 컴퓨터 및 기기가 서로 통신하고 데이터를 공유할 수 있도록 연결된 구조. 노드와 프로토콜을 활용한다

서로 통신하기 위해 디지털 연결을 통한 공통 통신 프로토콜을 사용한다

**물리적 유선 통신**, **무선 주파수 통신**

network topology : 컴퓨터 네트워크에서 노드(PC) 간의 물리적 및 논리적 연결 구조를 나타내는 개념. 연결 방법에 따라 구조가 달라진다

## 인터넷

가장 거대한 컴퓨터 네트워크. 수억 명의 사용자가 유무선 전송 매체를 사용하여 소형 및 대형 컴퓨터를 연결하는 네트워크

인터넷을 통해서 서비스를 제공하는 host들에 접근한다. 중간자는 데이터 흐름 제어(routing 경로 결정)를 위해 connecting device가 있어야 한다

WAN > RAN > MAN > CAN > LAN > PAN > BAN > Nano (규모가 큰 순)

WAN : Wide Area Network

LAN : Local Area Network

## 네트워크

기기들이 서로 연결되어 데이터를 교환하는 시스템의 모음

각각 연결된 노드의 끝단 = host

노드 : 개별 장치. 네트워크에 연결되어 있어 통신이 가능하다

링크 : 노드 간의 연결. 전송 매체 or 통신 경로. 이더넷 케이블 or Wi-Fi

각각을 연결하는 중간자!

**Connecting device**

네트워크 구성에서 중간자 역할. 데이터 전송과 통신을 관리하는 장치

ex. 라우터(Router), 스위치(Switch), 허브(Hub), 모뎀(Modem), 방화벽, 게이트웨이

**라우터** : 네트워크와 네트워크를 연결하고 데이터가 갈 경로를 결정한다. WAN(wide)

**스위치** : 네트워크 내부를 연결한다 → 라우터보다 작은 규모. LAN(local). 빠른 전송, 효율적 전달

**모뎀** : modulator와 demodulator의 합성어. 디지털 데이터(컴퓨터의 비트 형태)를 회선으로 보낼 아날로그 전기 신호로 변환한다(반대도 가능). 통신사 회선과 라우터 사이의 통신에 사용된다

## Data

데이터는 어느 계층에 해당하느냐에 따라 형태가 달라진다. send, receive의 역할

PC와 PC의 통신은 구축된 네트워크에 데이터를 보내고 받으며 이루어진다

과거 : 장치 간 유선 연결이 있으면 통신

현재 : 장치 수십억 개가 연결되어 있다

host = 끝단의 노드 = 종단 장치(end system)

Packet switch : 복잡한 형태의 네트워크 흐름에서 갈림길을 컨트롤하는 것. 데이터를 어디로 보낼 것인가? 길을 찾아 패킷을 전송한다. 라우터, 스위치

\*패킷 : 네트워크에서 전송하기 위해 데이터를 나눈 단위

## Network Types

LAN, WAN은 네트워크 규모에 따라 구분한다

지역, 넓은 지역

LAN cable = 랜선

Wi-Fi 공유기 : Packet switch. LAN 포트는 PC와 랜선으로 직접 연결하고, Wi-Fi로 무선 기기를 연결한다. WAN 포트는 모뎀(외부 인터넷)과 연결한다

## LAN

좁은 지역. 집, 강의실, 교정 등 집단

과거에는 PC to PC 연결이 많았는데, 현재는 switch, router를 통해서 통신한다

## WAN

국가, 세계, 기업 by 기업

인터넷(수많은 라우터로 구성됨)

## Network criteria

네트워크 기준 - performance 성능, reliability 신뢰, security 보안

성능 : 속도. 전송 시간, 응답 시간, 처리량. 송신부터 응답을 받을 때까지 걸리는 시간(RTT)이 적게 걸릴수록 좋은 퍼포먼스를 보인다

신뢰 : 통신 시 에러가 발생하지 않도록 네트워크가 보장해야 한다. 장애 빈도, 장애 복구 시간

보안 : 외부 침입자의 공격을 차단한다. 패턴, 규칙으로 보호해야 한다

## 물리적 토폴로지

PC to PC 노드 구성을 어떻게 하는지

### Mesh topology

모든 노드가 서로 직접 연결된 형태. PC와 PC가 point to point 형식

**물리적 링크 개수** : n(n-1). n은 PC 수, n-1은 PC 1개에 필요한 in/out 포트 수(연결된 edges)

ex. n = 5 → in/out 포트 : 4 → physical links : 5 \* 4 = 20

양방향(duplex) 통신이 가능한 링크라면 중복을 빼 1/2 → n(n-1)/2 = 10

### Star topology

Switch 또는 Hub에 point to point로 연결되어 있다. 중앙 허브를 통해 통신이 이루어진다

스위치와 허브가 connecting device 역할을 한다

출발 PC는 스위치·허브와의 직접 연결로 데이터를 전송한다. 스위치는 목적지를 파악해 해당 PC로만 전달하고, 허브는 연결된 모든 PC에 전달한다

### Bus topology

multipoint. 1대다. 백본. 하나의 긴 구리선 케이블이 PC를 연결하는 중추 네트워크 역할. 물리적 연결. 케이블과 PC를 연결하는 부분은 탭(Tap) → connector

### Ring topology

원 모양의 물리적 경로. Bus와 비슷하게 긴 구리선 케이블로 연결되어 있지만, cable end가 존재하지 않고 순환적으로 연결되어 있다

PC를 추가할 때는 와이어를 끊고 연결해서 추가한다

물리적 거리 때문에 선의 저항으로 전기 신호가 약해진다. 이를 방지하기 위해 옆 PC에게 비트 형태의 데이터를 전달하면, 받은 PC는 자신에게 온 데이터인지 확인하고 아니라면 데이터를 재생성해 다음 PC에게 전달한다

**Repeater 중계기 :** 통신 시스템의 중간에서 약해진 신호를 받아 증폭하고 재송신하거나, 찌그러진 신호의 파형을 정형하고 타이밍을 조정 또는 재구성해 송신하는 장치

참고 : [네트워크 기초 (2) - Topology](https://m.blog.naver.com/joohee5079/221630909344)

## Protocol Layering

프로토콜 : 컴퓨터 네트워크의 데이터 흐름 제어를 위한 규칙들의 집합. 매 통신 단계마다 필요한 과정

통신 프로세스를 조정하고 통신 상호작용을 가능하게 하는 규격

데이터를 패킷으로 분할하고 전송, 수신, 오류 수정, 보안 및 다른 통신 작업을 조절한다

프로토콜 레이어링 : 프로토콜을 규칙에 따라 나누어 계층화한 것. TCP/IP 5계층, OSI 7계층

통신이 단순하면 → 간단하게

통신이 복잡하면 → 하나로 규정하기엔 복잡해서 layering으로 단계를 구분해 정의한다

데이터에 대한 구성 규칙도 필요 → 비트를 구분하는 패턴 규칙이 필요하다

## 규칙

Human protocols : 대화의 규칙. 사회적 상호작용, 일상적인 커뮤니케이션. 상대가 말할 때 듣고 있다가 의도에 맞게 답한다

Network protocols : 아주 상세히 규칙을 정해야 한다. 인터넷의 모든 통신 활동은 프로토콜에 의해 관리된다

## Protocol

두 통신 장치가 송수신하는 규칙

프로토콜은 네트워크 entity 간에 송수신하는 메시지의 형식과 순서, 취해지는 조치를 정의한다

network entity : 네트워크에서 데이터를 송수신하는 주체 (ex. PC, 라우터, 스위치, 방화벽, 서버)

ex. 클라이언트 GET request → 서버 response → file 전달

## Single layer protocol

단층 프로토콜. face to face, 1대1 대화

## Protocol layering 하는 이유

복잡한 네트워크, 레이어를 관리하기 위해

1.  구분했을 때 이해가 더 잘 된다. 레이어 간의 (필요 데이터) 관계, 장치 작동 방식
2.  모듈화한다 → 유지보수의 편리성
3.  계층 단위 표준 규격화 → 한 계층을 변경해도 다른 계층에 영향이 적다

## TCP/IP Protocol Suite

응(표세)전네데(물) → OSI 7계층에서 표현·세션 계층을 뺀 5개의 layer (데이터 링크·물리를 하나로 묶어 4계층으로 보기도 한다)

TCP : Transmission Control Protocol. 전송 계층 프로토콜

IP : Internet Protocol. 네트워크 계층 프로토콜

네트워크 계층(IP) → 전송 계층(TCP)은 한 set로 동작하고, 전송 계층 → 응용 계층에 영향을 준다

### 레이어 아키텍처

![TCP/IP 레이어 아키텍처](/posts/network-tcp-ip-protocol/tcp-ip-layer-architecture.png)

데이터 단위. 송신 측은 응용 계층 → 물리 계층으로 내려가며 각 계층의 헤더를 붙이고, 수신 측은 반대로 올라가며 헤더를 뗀다

네트워크 계층에서 라우터를 통한 인터넷망 송수신이 이루어진다

## ISO model

ISO(국제표준화기구)에서 네트워크 통신을 표준화함. 물건, 단위, 네트워크 기준 통일

OSI 7계층 생성

Open Systems Interconnection model : 프로토콜 X. 네트워크 아키텍처를 디자인하기 위한 모델

## OSI 7 Layer

응Application 표Presentation 세Session 전Transport 네Network 데Datalink 물Physical

7계층. 전송 계층부터 물리 계층까지는 TCP/IP와 동일하다. TCP/IP의 응용 계층 = OSI의 응용·표현·세션 계층

## OSI VS TCP/IP

TCP/IP가 먼저 만들어졌고 더 많이 쓰이고 있다

OSI 모델은 경제성이 적다. 이미 보급된 TCP/IP를 OSI로 변경하는 건 비효율적이라 완전 대체 불가

### 응용 계층

실제 프로그램. 통신 프로토콜

FTP 파일, SMTP 메일, HTTP 웹사이트

메시지

### 전송 계층

프로세스 간의 데이터 송수신 제어. 신뢰성 보장(TCP), 빠른 전송(UDP)

TCP, UDP

세그먼트 = H/메시지

### 네트워크 계층

인터넷 규모의 데이터 흐름 제어. 호스트 간 경로 결정(routing)

IP(Internet Protocol), routing protocol

패킷(데이터그램) = H/세그먼트

### 데이터 링크 계층

로컬 네트워크. 소규모 통신 네트워크 제어

이더넷(Ethernet, 유선 LAN), 802.11 Wi-Fi 표준 프로토콜, PPP

프레임 = H/패킷(데이터그램)

### 물리 계층

케이블 신호 전달

wire를 통해 전압 변화 같은 신호로 digital 비트 0과 1을 표현하여 전달한다

비트

## 응전네데물

**상위** 응용 전송 네트워크 데이터링크 물리 **하위**
