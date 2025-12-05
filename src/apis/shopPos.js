import axios from "axios"

const { kakao } = window

export const shopPos = async (shopPost) => {
  return (
    <div>shopPos</div>
  )
}
export const apiSearchKakaoFn = (tShop) => {


  // alert(tShop)
  if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
    console.error('카카오 API가 아직 준비되지 않았습니다.')
    return
  }

  const searchVal = `${tShop}그린컴퓨터학원`;
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  var mapContainer = document.getElementById('map'),
    mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 5
    };
  var map = new kakao.maps.Map(mapContainer, mapOption);
  var ps = new kakao.maps.services.Places();
  ps.keywordSearch(searchVal, placesSearchCB);

  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      var bounds = new kakao.maps.LatLngBounds()

      for (var i = 0; i < data.length; i++) {
        displayMarker(data[i])
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))

      }
      map.setBounds(bounds)
    }
  }
  function displayMarker(place) {
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x)
    })

    kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent('<div>' + place.place_name + '<div>')
      infowindow.open(map, marker)
    })
  }
}
