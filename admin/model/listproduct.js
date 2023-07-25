function ListProduct (){
this.arr = [];
this.addProduct = function(listProduct){
    this.arr = listProduct
}
this.highToLow = function (a, b) {
    return b.price - a.price;
};
this.lowToHigh = function (a, b) {
    return a.price - b.price;
};
}
ListProduct.prototype.findProduct = function(keyword){
   
var arraySearch = [];
for(var i = 0; i < this.arr.length; i++){
    var product = this.arr[i];
  
// => convert
var keywordLowerCase = keyword.toLowerCase();
var nameLowerCase = product.name.toLowerCase();

    if(nameLowerCase.indexOf(keywordLowerCase) !== -1 ){
        arraySearch.push(product);
       
    }
}
 return arraySearch
};

ListProduct.prototype.orderByPrice = function(value){
 if (value === "DESC") {
    // DESC tu cao xuong thap
  return  this.arr.sort(this.highToLow)

 } else {
   return this.arr.sort(this.lowToHigh)
 }
 }
