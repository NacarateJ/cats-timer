const fixtures = {
  catImage: {
    url: "https://cdn2.thecatapi.com/images/MTUyMzExNg.jpg",
  },
};
  
  
const axios = {
  get: jest.fn((url) => {
    if (url === "https://api.thecatapi.com/v1/images/search") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: [fixtures.catImage],
      });
    }
  }),
};

export default axios;
