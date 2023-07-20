var api = new Service();


function getEle(id){
    return document.getElementById(id);
};

function getListProduct(){
  var promise =  api.getListProductApi();
  promise
  .then(function(result){
    renderUI(result.data)
  })
  .catch(function(error){
    console.log(error);
  })
}
getListProduct();

function renderUI(data){
    var content = "";
    for(var i = 0; i < data.length; i++){
        var product = data[i];

        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <img src="${product.img}" width="20%" />                
                </td>
                <td>${product.desc}</td>
                <td>
                    <button class="btn btn-info" >Sửa</button>
                    <button class="btn btn-danger" onclick="delProduct(${product.id})" >Xóa</button>
                </td>
            </tr>
        `
    }
    getEle("tablePhone").innerHTML = content;
}

/**
 * xóa
 */
function delProduct(id){
    var promise =  api.delProductApi(id);
    promise
    .then(function(result){
        alert('xóa muốn xóa sản phẩm')
      getListProduct();
    })
    .catch(function(error){
      console.log(error);
    });
}
/**
 * thêm
 */
getEle("btnThemSP").onclick = function(){
    getEle("header-title").innerHTML = "Thêm sản phẩm"
}

getEle("btnAddPhone").onclick = function(){
    // dom tới các thẻ input
var name = getEle("name").value
var price = getEle("price").value
var img = getEle("img").value
var desc = getEle("desc").value


    //tạo đối tượng product từ lớp đối tượng Product
    var product = new Product("", name, price, img, desc)
   
   var promise = api.addProductApi(product)
        promise
        .then(function(){
            getListProduct();
            //close
            getEle("btnClose").click();
          })
          .catch(function(error){
            console.log(error);
          })
}