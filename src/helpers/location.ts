import { ILocationCoordenates } from 'state/reducers/appReducer';

// Handle Error response from navigator.geolocation
const handleError = (error: PositionError): string => {
  const errorMsg: string =
    error.message !== ''
      ? error.message
      : 'Unfortunately we were unable to get your current location';
  return errorMsg;
};

// Get Geo Position with a promise so we can wait for it's resolve
const getGeoPosition = () => {
  return new Promise((successResponse: PositionCallback, reject) => {
    navigator.geolocation.getCurrentPosition(successResponse, reject);
  });
};

// Call navigator.geolocation and return latitude and longitude
export async function getCurrentLatLong() {
  return await getGeoPosition()
    // If response is successful
    .then(
      (value: Position): ILocationCoordenates => {
        return { lat: value.coords.latitude, lon: value.coords.longitude };
      }
    )
    .catch((err: PositionError): string => handleError(err));
}
