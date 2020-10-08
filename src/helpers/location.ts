import { ILocationCoordenates } from 'state/reducers/appReducer';

// Handle Error response from navigator.geolocation
function handleError(err: any) {
  console.log(console.warn(`ERROR(${err.code}): ${err.message}`));
}

// Get Geo Position with a promise so we can wait for it's resolve
function getGeoPosition() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, handleError);
  });
}

// Call navigator.geolocation and return latitude and longitude
export async function getCurrentLatLong() {
  return await getGeoPosition().then(
    (value: any): ILocationCoordenates => {
      return { lat: value.coords.latitude, lon: value.coords.longitude };
    }
  );
}
