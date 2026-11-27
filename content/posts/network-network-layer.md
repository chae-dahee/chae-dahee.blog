---
title: "[네트워크] 4. Network Layer"
slug: "network-network-layer"
excerpt: "포워딩과 라우팅, 데이터·컨트롤 플레인과 라우터 구조부터 IPv4 데이터그램과 주소 체계(서브넷·CIDR·DHCP·NAT), IPv6와 라우팅 알고리즘까지 네트워크 4강 내용을 정리한다."
category: "cs"
tags: ["네트워크", "네트워크계층", "IP주소"]
date: "2023-12-08T03:19"
image: "/posts/network-network-layer/subnet.png"
published: true
---

## 네트워크 계층 개요

큰 네트워크 단위를 다룸 WAN. 출발지 호스트에서 목적지 호스트까지(host-to-host) 데이터그램 전달

sender 송신자 : 세그먼트를 Header 데이터그램(패킷 생성)으로 캡슐화하고, Data link 계층으로 전달

receiver 수신자 : 데이터그램에서 세그먼트를 꺼내 transport 계층으로 전달

라우터 대 라우터 통신 → 각 링크 구간은 데이터링크 계층 프레임으로 감싼 상태로 전달

### forwarding, routing 구분

**forwarding 포워딩** : 패킷을 라우터 입력 링크에서 적절한 라우터 출력 링크로 이동

- 1대의 라우터로 input, output 제어.
- 패킷이 라우터 내에서 어떻게 이동할지 결정

**routing 라우팅** : 소스에서 목적지까지 패킷이 따르는 경로 결정

- 여러 대 라우터.
- 전체 네트워크 상에서 패킷의 이동 경로

### Data plane VS Control plane

네트워크 장치가 패킷을 처리하는 두 가지 주요 방식

**Data plane 전송부** : 라우터에 들어온 데이터를 여러 output 중에서 어디로 데이터그램을 보내야 하는지 결정

- 라우터마다 스위치로 **포워딩** 개념 사용
- 패킷의 헤더에 IP address 확인

![Data plane 포워딩](/posts/network-network-layer/data-plane-forwarding.png)

**Control plane 제어부** : 네트워크의 전체적인 동작을 제어하고 관리하는 역할. 장비를 제어하는 뇌

- 소스 호스트에서 목적지 호스트까지 경로를 따라 데이터그램이 어떻게 **라우팅**되는지를 결정
- **WAN**, 라우팅, 라우터끼리 output 통신

**Per-router control plane** : 개별 라우터(1개)가 독립적으로 컨트롤 플레인 기능 수행

- 분산 라우팅 알고리즘
- 변화에 유연, 최적의 경로 찾기에는 복잡

**Software Defined Networking (SDN) control plane**

- Control, Data plane 제어부와 전송부 분리
- 중앙 집중화된 원격 컨트롤러에서 라우터에 포워딩 테이블을 계산하고 설치
- remote controller : 수많은 라우터를 전체 관리하는 역할
- control agent : 각 라우터 내부 장비. remote controller에 패킷 및 상태 정보 보고

## Router architecture

### switching fabric

input, output 매칭, 연결, 매핑. 물리적 중간 역할. 빠른 속도로 forwarding을 결정함

- star topology 구조 중간자
- 속도 NR = R (bps) X N (input port)
- NR은 라인 속도(R)의 N배가 바람직

종류 : memory, bus, interconnection network

### input port

패킷을 비트 프레임으로 받아와 데이터그램화하여 받아옴. 헤더 필드로 output port 조회

- input 데이터 받아오는(들어오는) 속도 a
- switch fabric을 통해 output 포트로 전달하는 속도 b

**input port queuing(버퍼)**

- 처리 속도 b가 들어오는 속도 a보다 빠르면 ok
- 처리 속도가 느리면, 임시 패킷 저장소 Queue 큐에 저장하고 FIFO로 전달
- 한 개의 output port에 2개의 input이 들어온다면 동시에 처리가 불가능하기 때문에 input Queue에 delay 시킴. 큐 맨 앞 패킷이 막혀 뒤 패킷까지 대기하는 현상 = HOL(Head-of-Line) blocking
- output에도 Queue가 있을 수도, 없을 수도

**패킷 처리 방법**

destination-based forwarding(기본 방식) : 패킷의 헤더의 많은 정보 중에 dest 목적지 주소만 보고 전달

- forwarding table
- 1번 칸 : 200.23.16.0 through 200.23.23.255 범위의 dest address 패킷을 0번 포트로 보낸다
- 주소 범위는 prefix로 표현하고, 여러 prefix에 해당하면 가장 길게 일치하는 항목을 고름 = longest prefix matching

![destination-based forwarding table](/posts/network-network-layer/forwarding-table.png)

generalized forwarding(SDN에서 추가) : 패킷 헤더의 여러 필드 정보를 보고 종합적으로 고려하여 전달을 결정한다(match + action). source IP address, destination IP address, Port number, protocol type 등

### output port

패킷 처리하고 외부 전송하는 포트

**output port queuing**

switch fabric에서 넘어오는 속도가 링크 속도 R보다 빠르면 버퍼(Queue)가 있어야 delay 발생 시 큐에 저장하고, 다음 time slot 때 큐에 저장한 값 가져와서 처리 FIFO

큐에서 어떤 패킷을 먼저 보낼지 = 스케줄링. FIFO, priority, round robin, WFQ(Weighted Fair Queuing)

**망 중립성**

패킷 간의 우선순위 Priority 큐 구조를 따를 경우? 우선순위가 높은 패킷을 사용하는 유저는 빠르게, 낮은 패킷은 속도에 제한을 가짐

망 중립성 : ISP가 콘텐츠, 서비스, 사용자에 따라 트래픽을 차별(차단, 속도 제한, 유료 우선 처리)하지 않아야 한다는 원칙

법적 규제. 국가마다 규제 수준이 다름

## IPv4

### IP Datagram format

헤더 한 줄 = 32bit = 4byte

TCP → 세그먼트 헤더 20byte + IP 헤더 20byte = 최소 40byte의 헤더 오버헤드

1. ver : IP protocol version number
   - 0100 → IPv4 : 사용 중 dotted decimal(192.168.1.1)
   - 0110 → IPv6 바뀌면 전체 헤더 구조가 바뀌어야 한다
2. header length : 4bit 필드. 헤더 길이를 32bit(4byte) 단위로 표시. 옵션이 없으면 20byte
3. ~~type of service~~
4. length : 전체 패킷(데이터그램) 길이 16bit 구성 → 최대 2^16-1 = 65,535byte. 실제로는 이더넷 MTU 때문에 보통 1500byte 이하
5. 16-bit identifier, flags, fragment offset : IP fragment 단편화. 쪼개서 전송하고 다시 재조합하는 정보
6. time to live : TTL 패킷의 수명. 라우팅 될 때마다 TTL을 1씩 감소, 0이 되면 버려짐. 잘못된 라우팅으로 생기는 무한 루프를 방지 → 버퍼, 트래픽 문제점 발생
7. upper layer : dest에 도착하면 사용됨. dest의 전송 계층의 특정 프로토콜 명시(ex. TCP 6, UDP 17)
8. header checksum : 헤더 필드 에러 감지. TTL이 홉마다 바뀌므로 라우터마다 다시 계산
9. source IP address(IPv4:32bits, IPv6:128bits)
10. destination IP address
11. ~~options~~
12. payload data(variable length, typically a TCP or UDP segment)

### IPv4 주소 : 32 bit, 점으로 구성된 주소 체계

0~255 = 2^8-1 = 11111111 = 255

인터페이스 : 호스트, 라우터와 물리적 링크 사이의 경계

라우터 : 여러 개의 인터페이스

호스트 : 하나 또는 2개의 인터페이스(ex. 유선 이더넷, 무선 802.11)

PC → LAN → router → WAN

### Subnet 서브넷

앞부분 같은 패턴. 라우터를 거치지 않고 서로 직접 통신할 수 있는 장치(인터페이스)들의 묶음

![서브넷](/posts/network-network-layer/subnet.png)

그림의 파란색 영역 하나가 서브넷 하나

223.1.1.\*인 세 호스트들의 인터페이스 + 하나의 라우터 인터페이스 : 서브넷 구성

223.1.1.0/24 주소 할당 → /24(서브넷 마스크) → 32비트 주소의 왼쪽 24비트가 서브넷 주소 → 나머지 비트는 호스트 부분

| IP address | network(subnet) | host   |
| ---------- | --------------- | ------ |
| A class    | 8 bit           | 24 bit |
| B class    | 16 bit          | 16 bit |
| C class    | 24 bit          | 8 bit  |

호스트 부분이 모두 0(C class라면 00000000)은 서브넷(네트워크) 주소, 모두 1(11111111)은 broadcast에 사용되고, 일반 사용자는 사용하지 않는다. 모든 서브넷에 같은 규칙 적용

(ex. 서브넷이 192.168.1.0/24인 경우 브로드캐스트 주소는 192.168.1.255가 된다. 이 주소로 보내진 패킷은 해당 서브넷에 있는 모든 기기에 전달)

참고 영상 : [YouTube](https://www.youtube.com/watch?v=rOnpOtO3-D4)

### CIDR

**CIDR** : Classless InterDomain Routing 서브넷 파트 가변 길이.

주소 뒤에 /를 붙여서 사용함(a.b.c.d/x). 8로 나누어떨어지지 않아도 됨

서브넷 파트와 호스트 파트를 가변 길이로 구분하는 이유 → 클래스 단위(8, 16, 24bit)로만 할당하면 주소 낭비가 큼 → 필요한 크기만큼 유연하게 할당. 32bit 약 43억 개 주소는 무한 제공 불가능

클래스는 주소 앞자리 비트로 정해짐(A 0…, B 10…, C 110…). 같은 주소가 A class와 C class에 동시에 속할 수 없음

### DHCP

**DHCP** : Dynamic Host Configuration Protocol 동적 호스트 설정 프로토콜

- 장치가 네트워크에 유무선으로 연결될 때(MAC) 자동으로 IP 주소를 할당
- 사용 가능한 IP 주소 풀(pool)에서 IP 주소를 선택하여 해당 장치에게 할당
- 정해진 기간 동안만 주소를 빌려 쓰고(리스), 연결이 끊기거나 기간이 끝나면 주소 재사용 가능

DHCP 방식으로 서브넷에 브로드캐스트하면 DHCP 서버가 받아서 response로 새로운 IP 주소를 넘김

1. **DHCP discover** : 클라이언트가 연결되면 IP 주소가 필요하다고 알리는 DHCP 메시지를 브로드캐스트한다
2. **DHCP offer** : 서버는 메시지를 받아서 사용 가능한 IP 주소를 선택하고 클라이언트에 전송(서브넷, 게이트웨이, DNS 서버 주소 정보 포함)
3. **DHCP request** : 클라이언트는 해당 IP 주소를 쓰겠다고 브로드캐스트한다
4. **DHCP ACK** : 서버는 사용을 확정 짓고 주소를 할당한다

ISP는 ICANN → 지역 인터넷 레지스트리(RIR) → ISP 순으로 주소 블록을 할당받아서 IP 주소 제공함. 사용자는 사용료를 제공하여 공간을 할당받음

특정 구분 패턴(prefix)에 맞게 라우터를 나눠 가짐. 계층적 주소 지정 → 여러 서브넷을 하나의 prefix로 묶어 광고 = route aggregation

### NAT

**NAT** Network Address Translation : 네트워크 주소 변환 기술. 공유기가 사용하는 기술.

LAN 사설 IP 주소와 WAN 공인 IP 주소를 서로 변환하는 과정

NAT router : WAN과 LAN을 연결하고 control. 1차적 방화벽을 생성한다. 공인 IP 한 개를 여러 대의 호스트가 공유할 수 있다.

컴퓨터가 데이터를 보낼 때 과정

1. sender 컴퓨터 사설 IP가 라우터에 도착하고, NAT에서 dest(Internet)로 나가는 과정에서 **사설 source IP 주소를 라우터 공인 IP 주소**로, source 포트 번호를 새 포트 번호로 변경. **(사설 IP, 포트 번호) ↔ (공인 IP, 새 포트 번호)** 를 NAT 테이블로 기록함
2. 인터넷 상의 다른 컴퓨터는 이 패킷을 사설 네트워크의 컴퓨터가 아니라 NAT 라우터가 보낸 것으로 인식
3. 회신하면, 이 패킷은 NAT 라우터의 공인 IP 주소가 dest 주소. NAT 라우터는 이 패킷을 받고 통과하는 순간 NAT 테이블을 참조하여 패킷의 목적지 주소와 포트 번호를 원래의 사설 IP 주소, 포트 번호로 변경한다.

외부에서는 LAN 내부의 사설 주소와 구조가 보이지 않음. 내부 장치를 바꿔도 외부에 알릴 필요 없음

![NAT 변환 과정](/posts/network-network-layer/nat-translation.png)

문제점

- NAT 라우터(네트워크 계층)가 port 넘버를 제어하는 것 → transport 전송 계층 관리 ⇒ 레이어 간의 독립성 침해
- 공유기에 연결된 사설 IP를 사용하는 서버? 외부에서 접근 안 됨, 사설 IP 주소 식별 어려움 → 포트포워딩
- 포트포워딩 : 수동으로 NAT 변환 테이블 설정해줌

## IPv6

32bit(약 43억 개) IPv4 주소 공간 다 할당함

40byte 고정 길이 헤더 → 라우터 처리 속도 향상

### datagram format

1. ver : 0110 = IPv6
2. traffic class(priority) : 데이터그램 우선순위
3. flow label : 전달 세그먼트의 연속성을 판단 (ex. 동영상)
4. payload len : 기본 헤더(40byte) 뒤 데이터 길이. 확장 헤더 포함
5. next hdr : 상위 계층 프로토콜(또는 확장 헤더) 명시
6. hop limit : 패킷 수명. 홉마다 1씩 감소 ⇒ IPv4의 TTL(Time To Live)

### IPv4 VS IPv6

| IPv4                                           | IPv6                                                  |
| ---------------------------------------------- | ----------------------------------------------------- |
| checksum 에러 검출                             | NO checksum                                           |
| 라우터 fragmentation / **Receiver** reassemble | **Sender** fragmentation / **Receiver** reassemble    |
| options                                        | No options (확장 헤더로 처리)                         |

에러 검출을 Data-link, transport 레이어에서 하기 때문에 v6에서는 할 필요가 없다고 판단 → 불필요한 연산 생략

MTU Maximum Transmission Unit : 링크 계층 프레임이 실을 수 있는 최대 데이터 크기. v4는 라우터가 MTU에 맞게 쪼개고 목적지 호스트가 재조합한다. v6에서는 라우터가 쪼개지 않고 sender가 쪼개고, receiver가 재조합한다. 패킷이 MTU보다 크면 라우터는 버리고 ICMPv6 "Packet Too Big" 메시지를 보냄

### IPv4 → IPv6 ?

v4에서 v6로 넘어가기 어려움. v4로 모두 설정되어 있는 네트워크를 한순간에 v6로 변경하기 어려움

IPv4 : IPv6 = 99 : 1 정도의 체감 비율. IPv6 설치율이 아직 낮다는 의미

tunneling : mixed IPv4 + IPv6. v6 데이터그램을 v4 데이터그램에 encapsulate함. v4 헤더에 v6 정보 있음. packet within a packet

dual stack : 장비가 IPv4, IPv6를 둘 다 지원해 상대에 맞춰 사용

## Routing 알고리즘

최적 경로 전송 → 그래프에서 비용(cost)이 가장 작은 경로 찾기

link-state 알고리즘 : 모든 라우터가 전체 네트워크 정보를 알고 계산. Dijkstra 다익스트라. ex. OSPF

distance-vector 알고리즘 : 이웃 라우터와 거리 정보만 주고받으며 반복 계산. Bellman-Ford. ex. RIP

![Dijkstra 알고리즘 단계](/posts/network-network-layer/dijkstra-steps.png)

![Dijkstra 결과 u의 forwarding table](/posts/network-network-layer/dijkstra-forwarding-table.png)

표의 마지막 행 목적지 x는 z의 오기
