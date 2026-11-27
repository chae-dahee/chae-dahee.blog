---
title: "[네트워크] 5. Transport Layer"
slug: "network-transport-layer"
excerpt: "TCP와 UDP의 차이, 소켓·포트와 다중화부터 세그먼트 구조, TCP 헤더 필드와 3-way handshake까지 네트워크 5강 내용을 정리한다."
category: "CS"
tags: ["네트워크", "전송계층", "TCP"]
date: "2023-12-08T17:22"
image: "/posts/network-transport-layer/tcp-demultiplexing.png"
published: true
---

## Transport services and protocols

**프로세스(실행되는 프로그램)와 프로세스 간의 통신**

sender 송신자는 애플리케이션 레이어에서 받은 메시지를 세그먼트로 분할하고 네트워크 계층에 전달

receiver 수신자는 받은 세그먼트를 메시지로 재조립하고 애플리케이션 계층에 전달

네트워크 레이어 : host 간의 통신

## TCP / UDP

차이점? sender와 receiver 사이의 통신을 할 때

- TCP : 양측에서 사전에 통신을 하겠다고 **약속을 하고** 통신
- UDP : 약속(연결 설정) 없이 **바로** 송신

### Socket, Port, Multiplexing

**소켓 socket** : 애플리케이션 프로세스와 전송 계층 사이의 출입구(인터페이스). IP 주소와 포트 번호로 식별. 세그먼트화된 데이터를 소켓을 통과하여 프로세스에 전달.

**Port #** : 하나의 PC에서 각 프로세스를 구별하는 방법.

- 16 bit, 0~2^16-1(65,535), 6만 5천여 개
- 프로세스마다 포트를 지정
- 세그먼트의 포트 넘버를 구분해서 전송

**다중화 Multiplexing 멀티플렉싱** : 송신 측에서 여러 소켓의 데이터를 모아 포트 정보가 든 헤더를 붙여 세그먼트를 만들고 네트워크 계층으로 전달 ⇒ 합치기

**역다중화 Demultiplexing 디멀티플렉싱** : 수신 측에서 받은 세그먼트의 헤더 포트 번호를 보고 알맞은 소켓으로 나눠 전달 ⇒ 쪼개기

### segment format

![segment format](/posts/network-transport-layer/segment-format.png)

1. **source port #** : sender port # 정보를 가지고 있음. 16 bit
2. **dest port #** : receiver port # 정보를 가지고 있음. 16 bit

응답 시 둘 정보가 교체됨

TCP 소켓은 source IP address, dest IP address까지 사용해 식별. IP 주소는 세그먼트 헤더가 아니라 IP 헤더에 있음

#### example (UDP → dest port #)

![UDP demultiplexing 예시](/posts/network-transport-layer/udp-demultiplexing.png)

UDP는 dest IP address, dest port #만으로 소켓 식별

### TCP = 연결지향형 connection oriented

소켓 간의 1대1 통신. 복잡하지만, 신뢰성이 높음

통신이 실제로 진행되기 전, 송신자가 수신자에게 확인 메시지를 날리고, 응답하고, 미리 통신을 약속함 → handshaking

**소켓 식별 정보 4가지**

1. source IP address
2. source port number
3. dest IP address
4. dest port number

receiver는 4가지 정보를 가지고 세그먼트를 적절한 소켓에 전송. 포트 넘버도 사용해 정확한 프로세스를 식별함

**기능**

**혼잡 제어 congestion control** : 네트워크(라우터)에 패킷이 많이 몰리면 혼잡도가 크다고 판단, ACK 없이 보낼 수 있는 전송량 한도(congestion window)를 줄인다.

**flow control 흐름 제어** : 수신자의 버퍼가 넘치지 않도록, 송신 속도를 수신 측 여유 공간(receive window)에 맞춰 조절함

#### example (TCP)

![TCP demultiplexing 예시](/posts/network-transport-layer/tcp-demultiplexing.png)

### UDP = 연결 없음 Connectionless

하나의 소켓으로 모두 통신. UDP 소켓은 dest IP, dest port # 2가지로 식별되기 때문에 여러 클라이언트의 세그먼트가 같은 소켓으로 들어옴

no handshaking, 과정 간단 단순, header 필드 작음(8byte, TCP에 비해), 신뢰성 다소 떨어짐

사용 예 : DNS, 스트리밍, QUIC(HTTP/3)

과정

**sender : 캡슐화 Encapsulation**

1. application에서 transport layer가 메시지를 받음. UDP는 메시지 하나를 세그먼트 하나로 만듦(여러 세그먼트로 쪼개는 것은 TCP). 소켓을 통과해 전송계층으로 전달하는 과정 multiplexing
2. UDP 헤더를 추가해 세그먼트 만듦
3. 네트워크 레이어로 전달

**receiver : 역캡슐화 Decapsulation**

1. network 레이어에서 전송된 데이터그램의 헤더를 제거해 세그먼트화
2. 세그먼트 내부 헤더의 포트 넘버를 보고 적절한 소켓으로 전송
3. 소켓을 통해 application 레이어로 전송. 적당한 소켓으로 전달하는 과정 Demultiplexing

서버 ⇒ 자신의 IP, Port #

클라이언트 ⇒ 서버의 IP, Port #를 알아야 서버에게 접근이 가능함. 자신의 Port #는 OS가 할당

#### UDP segment format

![UDP segment format](/posts/network-transport-layer/udp-segment-format.png)

헤더 8byte = source port #, dest port #, length, checksum 각 16bit

## ⭐TCP : Transmission Control Protocol

**point to point**

- 소켓끼리 point-to-point ⇒ ~~물리적으로 point-to-point~~ 아님, multicasting 불가능
- src IP, src port, dest IP, dest port
- 한 PC 다른 프로세스 구분 → 소켓이 다르기 때문
- 신뢰성. 순서가 보장되는 byte stream(reliable, in-order)
- **양방향 통신** full duplex
- flow control, congestion control

### TCP segment format

헤더의 길이 최소(5줄) 20byte ~ 최대(5줄 + options) 60byte

1. src port #(16bit), dest port #(16bit)
2. **sequence number** : 세그먼트에 담긴 데이터 첫 바이트의 번호 필드. 재조립 시 사용. 초기값(ISN)은 랜덤 숫자 부여, 이후 데이터 길이만큼 연속적으로 증가
3. **acknowledgement number** : 확인용 응답 번호 필드, **시퀀스 넘버 + 데이터 길이 누적**. 다음 받게 될 시퀀스 넘버(cumulative ACK)
4. **header length(data offset)** : head len 길이. option을 포함한 가변 헤더 길이 표현함. 4bit 값 × 4byte. 0101(5) ~ 1111(15) ⇒ 20 ~ 60byte
5. **Flag** : 1bit 크기로 세그먼트 연결 상태 파악, 활성화 1 없으면 0
   - C, E : **CWR, ECE**. 혼잡 알림(ECN, Explicit Congestion Notification)에 사용
   - U : **Urgent**. 긴급 데이터 표시(거의 사용 안 함)
   - A : **ACK**. acknowledgement number 필드가 유효하다. 성공적으로 도착한 데이터에 대한 확인 응답
   - P : **Push**. 받은 데이터를 버퍼에 쌓지 않고 바로 상위 계층으로 전달
   - R : **Reset**. TCP 연결을 강제로 초기화
   - S : **Synchronize**. 이 플래그로 sender와 receiver는 sequence number를 동기화함
   - F : **Finish**. 연결의 종료. 연결을 종료하고 싶은 클라이언트가 **F 플래그=1** 송신하면 받은 서버는 ACK를 반환하고, 서버도 남은 데이터를 보낸 뒤 FIN을 보내면 클라이언트가 ACK로 응답해 연결 종료를 확인한다. FIN → ACK → FIN → ACK = 4-way handshake
6. **receive window** : 수신 측이 더 받을 수 있는 버퍼 크기. flow control에 사용
7. checksum : 오류 검출
8. **Urg data pointer** : U 플래그가 1일 때 긴급 데이터의 끝 위치. 거의 사용 안 함
9. options : 헤더의 가변적 길이. 0~40byte.

![TCP segment format](/posts/network-transport-layer/tcp-segment-format.png)

### 3-way handshake : connection-oriented

connection 확인하는 과정. 데이터 교환 전에 송수신자의 상태를 초기화한다.

handshaking이 완료되면, 데이터를 송수신한다.

lost ACK 발생할 경우 → timeout을 설정해 응답을 일정 시간만큼 기다리고, ACK 응답이 오지 않으면, 패킷이 손실되었다고 판단하고 데이터를 재전송한다.

**송신자와 수신자 사이에 논리적인 연결을 설정하는 것**

1. **SYN 동기화 단계** : 클라이언트가 서버에 **SYN Flag = 1**을 보내 연결을 요청. 클라이언트의 **초기 시퀀스 Seq 번호 x**가 포함됨
2. **SYN-ACK 동기화 확인 단계** : 서버는 SYN 패킷을 받고, 클라이언트에게 **SYN Flag = 1**과 **ACK(확인) Flag = 1**을 동시에 보낸다. **서버의 초기 시퀀스 번호 y**, **ACK 번호 x+1**
3. **ACK 확인 단계** : SYN-ACK 메시지 잘 받았다고 서버에 알려줌. 클라이언트는 서버의 SYN-ACK 패킷을 받고, 서버에 **ACK Flag = 1** 패킷을 보낸다. **ACK 번호 y+1**. 이 단계부터 데이터를 함께 실어 보낼 수 있음

#### Example scenario

![3-way handshake 시나리오](/posts/network-transport-layer/tcp-3way-handshake.png)
