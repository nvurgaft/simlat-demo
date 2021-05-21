
let client = axios.create({
    baseURL: 'api/',
    timeout: 4000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

export default client;