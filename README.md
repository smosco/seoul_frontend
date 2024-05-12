# WE MATE - 위험한 길을 함께 걷는 친구

WE MATE는 **서울시 위험 지역 분석**을 통해 **최적의 순찰 경로 추천**하고 **시민들과 함께 안전한 서울**을 만들어요!

- 최적의 순찰 경로를 추천해요 👮‍♂️
- 각 포인트의 위험 정도를 분석할 수 있는 기술 개발 📊
- 서울 지역의 안전 시설 및 시설물 모니터링 🚨

- [🙋‍♂️ Visit WE MATE](https://wemate-patrol.vercel.app/)

## 기능

### 안전 시설 마커 표시

<img width="300" alt="경로찾기" src="https://github.com/Seoul-Public-Data/seoul_frontend/assets/62870362/b80342aa-4af0-4839-9b12-4ffc11531515">

- 현위치로부터 500m 반경 내의 안전시설을 종류 별로 다른 이미지의 마커로 표시해요

- 원하는 안전시설만 필터링해서 볼 수 있어요

### 순찰 경로 탐색

<img width="300" alt="경로찾기" src="https://github.com/Seoul-Public-Data/seoul_frontend/assets/62870362/d717047f-438e-452e-a771-549a550e6290">

- TMAP API의 키워드 장소 검색을 사용해 출발, 도착지를 입력해요

- 순찰 경로 추천 알고리즘으로 얻은 위험 지역 중 최대 5곳을 경유하는 경로를 탐색해요

- 경로 소요 시간과 거리를 표시해요

### 순찰 경로 위험도 상세 정보

<img width="300" alt="경로상세" src="https://github.com/Seoul-Public-Data/seoul_frontend/assets/62870362/63830849-75e9-4d77-b696-e44c060d2c7c">

- 순찰 경로 추천 알고리즘을 통해 계산된 경로의 평균 위험도 점수를 표시해요

- 경유지 마커 클릭 시 위험도를 한눈에 볼 수 있도록 레이더 차트로 표시해요

- 각 경유지에서 가장 부족한 안전시설 2가지를 텍스트로 표시해요

### 빠르고 간편한 신고 기능

<img width="300" alt="신고" src="https://github.com/Seoul-Public-Data/seoul_frontend/assets/62870362/7d2284c2-b9e3-4780-b72d-dcb7ab462282">

- 신고하기 버튼 클릭 시 현위치로 신고할 수 있어요

- 신고 사유는 직접 입력 또는 빠른 신고를 위해 선택지 클릭 시 바로 입력 가능해요


## 프론트엔드에서 사용한 기술

### TMAP API
- 카카오와 구글 맵 API는 보행자 경로 안내를 지원하지 않아 도보로 순찰하는 WE MATE 유저를 위한 경로를 탐색하기 위해 TMAP API를 사용했습니다.

### React Query 
- TMAP API의 사용량 제한으로 인해 효율적인 API 활용이 필요했습니다. 이에 React Query를 도입해 중복된 API를 호출을 방지하고 캐싱을 통해 API 트래픽을 최소화했습니다.
- 동일한 경로 요쳥에 대해서 로딩 시간을 줄여 사용자 경험을 향상시켰습니다.

### 크로스플랫폼 호환을 위한 PWA
- 순찰대원들의 모바일 접근성을 높이기 위해 PWA 기술을 활용했습니다.
- PWA는 웹 기반이지만 모바일 앱과 동일한 사용자 경험을 제공하며 크로스플랫폼 지원과 신속한 배포가 가능한 이점이 있습니다.
- 이를 통해 순찰업무 전용 모바일 애플리케이션을 웹/앱 동시 지원으로 단기간에 개발할 수 있었고, 향후 유지보수도 수월해질 것으로 기대됩니다.
 
### 더 나은 UI를 위한 라이브러리
- Rechart와 React-Framer 등과 같은 UI 라이브러리를 이요해 사용자에게 더 나은 UI를 보여줄 수 있습니다.

## 백엔드 

### 프론트엔드 - 백엔드 통신

<img width="400" alt="프론트백통신" src="https://github.com/Seoul-Public-Data/seoul_frontend/assets/62870362/527601e6-e596-42b6-a132-2a907c18b1b1">

- ec2, rds 등을 이용한 가상 서버와 관계형 데이터베이스를 관리 및 운영

### 프론트엔드 - 서버리스 통신

<img width="400" alt="프론트서버리스통신" src="https://github.com/Seoul-Public-Data/seoul_frontend/assets/62870362/2f649bdd-f75d-41d7-b3f7-a80a13a10e66">

- Lambda와 api gateway를 통한 서버리스 통신
  
## IA(Information Architecture)

<img width="400" alt="IA" src="https://github.com/Seoul-Public-Data/seoul_frontend/assets/62870362/9a248428-2133-454b-b2e9-cbd8360f9d09">




