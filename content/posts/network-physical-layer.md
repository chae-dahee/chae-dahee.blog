---
title: "[네트워크] 2. Physical Layer"
slug: "network-physical-layer"
excerpt: "아날로그·디지털 신호와 bit rate, 유선·무선 전송 매체와 감쇠·증폭부터 simplex·duplex 통신 방식, 패킷 전송 지연과 NIC까지 네트워크 2강 내용을 정리한다."
category: "CS"
tags: ["네트워크", "물리계층", "전송매체"]
date: "2023-12-06T18:55"
image: "/posts/network-physical-layer/analog-digital-signal.png"
published: true
---

## 통신방법

물리적 연결 구축 → 통신 가능. 0, 1 bit 전기적 신호 또는 waveform 송수신 전달

네모 박스 switch, 동그란 엑스 router 내부 LAN에서 ISP(Internet Service Provider : SKT, KT, LG)의 라우터로 모인, 물리적 선으로 연결된 외부 LAN으로 전송.

ISP ↔ ISP 물리적 연결로 송수신 가능

ISP 거치지 않으면 통신 불가능. ISP 안에서는 WAN switch를 이용해 보다 넓게 통신

ISP 외부 LAN 라우터 → 내부 LAN 스위치 point-to-point WAN으로 연결된 케이블로 통신해 데이터 전달

LAN과 LAN끼리

## underlying LAN and WAN technology

데이터링크가 물리계층에게 bit 정보를 넘기고, 물리계층은 이를 전기적 신호로 바꾼다. 물리계층은 전기적 신호를 제어한다

## Transmission media 전송 매체

물리계층보다 더 하위 개념. 물리계층으로부터 제어를 받음. 신호 송수신 방법 정의

원래 비트였던 신호를 sender → receiver 전달하는 물체

receiver는 신호를 비트로 변환해 정보를 처리한다

ex. 유선 케이블, 무선 공기

## signals

전달 신호 타입

![아날로그·디지털 신호](/posts/network-physical-layer/analog-digital-signal.png)

**아날로그** : f(t) = cos 2πt

- t에 따라 전기적 세기가 변한다. period 주기 : 1sec, frequency 주파수 : 1Hz (2π는 각주파수 rad/s)
- 넓은 범위, 다양한 값, 연속성 continuous value

**디지털** : 비주기적인 aperiodic. 사전에 정의되어 있는 값. 0, 1

- 100% 디지털 속성이 아닌, 아날로그이지만 디지털과 유사하게 변환한 함수 그래프
- time과 수평하게 지나갈 때 아날로그 형태를 지님.
- 푸리에 분석 : 디지털 신호 = 무수히 많은 아날로그 정현파(sin, cos)의 합성. 그래서 실제 전송 매체에서는 아날로그 파형으로 전달됨

## Digital signals 전기신호

주기가 없는 신호. no cycle. 주기와 주파수를 고려하지 않는다.

주기, 주파수 대신 bit rate, bit interval(1비트 전송 시간 = 1 / bit rate)로 표현

time이 아닌 주파수에 따른 함수 그리기 푸리에 변환

bit rate : # of bits in 1sec = 1초 동안 몇 개의 비트가 전송되었는지. bits per second = bps 단위

비트 수 높음 → 속도 높음 → bps 높음

![bit rate와 signal level](/posts/network-physical-layer/digital-signal-level.png)

- 1초에 8bits를 전송하면, bit rate = 8bps. level은 0, 1 비트를 가지는 2개로 구성
- 1초에 16bits를 전송하면, bit rate = 16bps. level은 00, 01, 10, 11 비트를 가지는 4개로 구성
- 1초에 32bit를 전송하면, bit rate = 32bps, level은 0000,… 16개로 구성

8bit → 신호 비트 한 자리, 2배~

level 하나당 비트 수 = log₂L. 2 level → 1bit, 4 level → 2bit, 16 level → 4bit

## Wired transmission media 유선 전송 매체

선을 꼰 이유는 전기적 신호가 다른 선의 간섭을 최소화하기 위해서!

외부 간섭 방지. 8 cables → 4 pair 쌍으로 꼼

### UTP

Unshielded twisted pair. 보호층(metal shield) 없음. 이더넷 네트워크, 전화 회선, 비용 저렴, 일반적 사용

### STP

shielded twisted pair. 보호층(metal shield) 있음. 고요구사항 환경. 의료 시설, 제조업

### 감쇠기, 증폭기

dB(Decibel 데시벨) : 감쇠, 증폭을 표시하기 위한 수치적 표현.

dB = 10log10(p2/p1). p2는 비교 시점, p1은 기준치 original

**Attenuation 감쇠기** : 신호가 전송 매체를 통과함에 따라 신호의 세기가 줄어드는 것. 내부 저항, 거리, 외부 간섭, 노이즈로 인한 에너지 손실

p2<p1 ⇒ p2/p1 < 1 ⇒ a < 0dB

**Amplification 증폭기** : 신호의 세기를 증가시킴. 증폭기 전자(회로) 장치를 사용

p2>p1 ⇒ p2/p1 > 1 ⇒ a > 0dB

![감쇠와 증폭](/posts/network-physical-layer/attenuation-amplification.png)

## Wireless transmission media 무선 통신 매체

공기 중 전자기파(전파) 0과 1 비트 정보 송수신

### Microwave

- 공기 중으로 주파수를 송신한다
- frequency : 1~300GHz를 가진다

Wi-Fi : 2.4GHz, 5GHz(최근 6GHz) 대역을 가진다. frequency 도메인 측면에서 주파수 함수를 그려보면, 각 채널의 신호는 채널 중심 주파수(ex. 2.4GHz 대역의 2.412GHz) 주변에 몰린 형태로 그려진다. 시간 도메인 f(t) ↔ 주파수 도메인 F(f)는 푸리에 변환으로 오간다

주파수의 영역대를 아주 잘게 쪼개서 개인에게 할당해서 사용하는 방법 5G, LTE

ex. 전자레인지 주파수 영역대 2.4~2.5GHz, 핸드폰 와이파이 2.4GHz 주파수를 가까이서 사용을 하면, **동시 사용 시 신호 간의 간섭이 발생한다**

파장이 길수록 1초당 주기 수는 적고(주기 김) 주파수 값은 낮고, 파장이 짧을수록 주기는 빈번하고(주기 짧음) 주파수 값은 높다. λ = c / f

전자기파는 비트를 어떻게 전송하는가? 시간에 따라 신호의 세기가 달라진다. 세기가 클 때는 bit = 1, 약할 때는 bit = 0. 0과 1을 구분하여 전자기파 세기를 측정

세기(진폭)로 구분 = ASK. 주파수로 구분 = FSK, 위상으로 구분 = PSK

## Dataflow 컨트롤

### simplex

단방향 일방향 통신. 브로드캐스트(일대다 전송)와는 다른 개념이지만 TV, 라디오는 둘 다 해당

TV 송신, 라디오

### Half duplex

반(만)양방향 통신, 동시X 순차적O time1, 2가 존재. 번갈아서 전송 수신 역할을 수행

무전기

### Full duplex

양방향 통신. 동시O all time.

전화, 채팅

- Time division **시간 분할 방식** TDD : 같은 주파수 대역을 시간으로 나눠 사용. 전체 시간을 작은 타임슬롯으로 나누고, 전송과 수신을 할당해 교대로 처리한다. 송수신 시간 비율을 유연하게 조정 가능. 실제로는 half duplex를 빠르게 전환해 full duplex처럼 동작
- Frequency division **주파수 분할 방식** FDD : 서로 다른 주파수 대역을 사용하여 동시에 수행한다.

## 패킷 전송 과정

패킷 : 데이터를 전송하는 작은 단위. 데이터 세트는 패킷으로 분할되어 전송되고, 목적지로 라우팅 되어 다시 재형성해 원래의 데이터로 복원. 출발지, 목적지 주소가 포함되어 있음

**패킷의 길이 / 속도 bps(bit rate) = 패킷 전송 딜레이 지연 계산**

전체 지연 = 처리 지연 + 큐잉 지연 + 전송 지연(L/R) + 전파 지연

패킷의 길이가 길면, 속도의 한계가 존재한다

링크 전송 속도 link transmission rate = 링크 대역폭 link bandwidth = 링크 용량 link capacity

## NIC : network interface card 네트워크 인터페이스

신호를 비트로 변환 == LAN 카드 → 통신 성능 좌지우지

물리계층에서 데이터링크 계층으로 이동하기 위한.

물리계층 + 데이터링크 계층(MAC 주소, 프레임 처리) 담당

![NIC 신호 변환 과정](/posts/network-physical-layer/nic-signal-conversion.png)

sender의 연산을 하는 CPU에서 데이터를 송신할 비트가 NIC에 들어가면, 신호 signal로 변환해서 transmission media 전송 매체를 타고 receiver의 NIC에 들어간다. NIC는 신호를 비트로 변환해서 receiver의 CPU에 데이터를 전달한다
