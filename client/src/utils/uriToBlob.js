const dataURItoBlob = imgDataURI => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  const byteString = atob(imgDataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = imgDataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

export default dataURItoBlob;
