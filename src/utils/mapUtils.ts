declare global {
    interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      kakao: any;
    }
  }

const { kakao } = window;

export function generateMarker(lat:number, lng:number) {
  const markerPosition = new kakao.maps.LatLng(lat, lng);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  return marker;
}

export function generateInfoWindow(lat:number, lng:number) {
  const iwContent = '<div style="padding:5px;">Hello World!</div>';
  const iwPosition = new kakao.maps.LatLng(lat, lng);
  const infoWindow = new kakao.maps.InfoWindow({
    position: iwPosition,
    content: iwContent,
  });
  return infoWindow;
}

export function generateCircle(lat:number, lng:number) {
  const circle = new kakao.maps.Circle({
    center: new kakao.maps.LatLng(lat, lng),
    radius: 250,
    strokeWeight: 1,
    strokeColor: '#007470',
    strokeStyle: 'solid',
    fillColor: '#007470',
    fillOpacity: 0.15,
  });
  return circle;
}
