class Http {
  static instance = new Http();

  get = async (url, body, headers) => {
    try {
      let req = await fetch(url, {
        method: 'GET',
        headers,
        body,
      });

      return await req.json();
    } catch (err) {
      console.log('http get method err', err);

      throw Error(err);
    }
  };

  post = async (url, body, headers) => {
    try {
      console.log(url);
      console.log(body);
      console.log(headers);
      let req = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      return await req.json();
    } catch (err) {
      console.log('http method post err', err);

      throw Error(err);
    }
  };

  put = async (url, body, headers) => {
    try {
      let req = await fetch(url, {
        method: 'PUT',
        headers,
        body,
      });

      return await req.json();
    } catch (err) {
      console.log('http get method err', err);

      throw Error(err);
    }
  };

  delete = async (url, body, headers) => {
    try {
      let req = await fetch(url, {
        method: 'DELETE',
        headers,
        body,
      });

      return await req.json();
    } catch (err) {
      console.log('http method post err', err);

      throw Error(err);
    }
  };
}

export default Http;
