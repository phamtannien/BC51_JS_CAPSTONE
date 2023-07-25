function Service() {
  this.getListProductApi = function () {
    var promise = axios({
      url: "https://64b78d6021b9aa6eb07853c6.mockapi.io/Products",
      method: "GET",
    });
    return promise;
  };
  

}