const errorHandler = error => {
  console.error(error);
};

const successHandler = response => response;

const requestInterceptor = config => {
  return config;
}

const client = myAxios.create({
  // some options
});
client.interceptors.response.use(
  successHandler,
  errorHandler,
)
client.interceptors.request.use(requestInterceptor);

export default client;
