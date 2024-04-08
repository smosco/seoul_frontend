import React, { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const { kakao } = window;

function App() {
  useEffect(() => {
    const container = document.getElementById('map');
    const option = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const map = new kakao.maps.Map(container, option);
  }, []);

  return (
    <div className="App">
      <div id="map" style={{ width: '500px', height: '500px' }} />
    </div>
  );
}

export default App;
