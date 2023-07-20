function Service() {
  this.getListProductApi = function () {
    var promise = axios({
      url: "https://64b78f6821b9aa6eb0785fd7.mockapi.io/product",
      method: "GET",
    });
    return promise;
  };
  this.getProductById = function (id) {
    var promise = axios({
      url: `https://64b78f6821b9aa6eb0785fd7.mockapi.io/product/${id}`,
      method: "GET",
    });
    return promise;
  };

}