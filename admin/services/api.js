function Service() {
    this.getListProductApi = function(){
        var promise = axios({
            url: "https://64b78f6821b9aa6eb0785fd7.mockapi.io/product",
            method: "GET",
        });
        return promise
    }
     this.delProductApi = function(id){
        var promise = axios({
            url:` https://64b78f6821b9aa6eb0785fd7.mockapi.io/product/${id}` ,
            method: "DELETE",
        });
        return promise
     };
     this.addProductApi = function(product){
        var promise = axios({
            url: "https://64b78f6821b9aa6eb0785fd7.mockapi.io/product" ,
            method: "POST",
            data: product
        });
        return promise;
     };
     this.getListProductById = function(id){
        var promise = axios({
            url:` https://64b78f6821b9aa6eb0785fd7.mockapi.io/product/${id}` ,
            method: "GET",
        });
        return promise
     }
     this.updateProductApi = function(product){
        var promise = axios({
            url: ` https://64b78f6821b9aa6eb0785fd7.mockapi.io/product/${product.id}` ,
            method: "PUT",
            data: product,
        });
        return promise;
     }
}