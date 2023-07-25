function Service() {
    this.getListProductApi = function(){
        var promise = axios({
            url: "https://64b78d6021b9aa6eb07853c6.mockapi.io/Products",
            method: "GET",
        });
        return promise
    }
     this.delProductApi = function(id){
        var promise = axios({
            url:` https://64b78d6021b9aa6eb07853c6.mockapi.io/Products${id}` ,
            method: "DELETE",
        });
        return promise
     };
     this.addProductApi = function(product){
        var promise = axios({
            url: "https://64b78d6021b9aa6eb07853c6.mockapi.io/Products" ,
            method: "POST",
            data: product
        });
        return promise;
     };
     this.getListProductById = function(id){
        var promise = axios({
            url:`https://64b78d6021b9aa6eb07853c6.mockapi.io/Products/${id}` ,
            method: "GET",
        });
        return promise
     }
     this.updateProductApi = function(product){
        var promise = axios({
            url: `https://64b78d6021b9aa6eb07853c6.mockapi.io/Products/${product.id}` ,
            method: "PUT",
            data: product,
        });
        return promise;
     }
}