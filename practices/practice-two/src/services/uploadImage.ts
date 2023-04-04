class ImageBB {
  private endpoint: string;

  constructor() {
    this.endpoint = `${process.env.VITE_UPLOAD_URL}?key=${process.env.VITE_UPLOAD_KEY}`;
  }

  post(image: FormData, callBack: (_response: { [key: string]: any }) => void) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', this.endpoint, true);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status >= 200 && xhttp.status < 300) {
          callBack(JSON.parse(xhttp.responseText));
        } else {
          callBack({
            status: false,
          });
        }
      }
    };

    xhttp.send(image);

    return this;
  }
}

export default ImageBB;
