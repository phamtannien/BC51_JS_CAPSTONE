var api = new Service();
var listproduct = new ListProduct();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
};
function getInfoProduct(id){
  
  var name = getEle("name").value
  var price = getEle("price").value
  var img = getEle("img").value
  var desc = getEle("desc").value
  var screen = getEle("screen").value
  var backCam = getEle("backCam").value
  var frontCam = getEle("frontCam").value
  var type = getEle("type").value
   /**
   * validation
   */
  
  var flag = true;
  //name
  flag &= validation.checkHollow(name, "tbname", "(*)Vui lòng nhập tên sản phẩm")
  //price
  flag &= validation.checkHollow(price, "tbprice", "(*)Vui lòng nhập giá sản phẩm")
  && validation.checkNumber(price, "tbprice", "(*)Vui lòng nhập kí tự số")
  //screen
  flag &= validation.checkHollow(screen, "tbscreen", "(*)Vui lòng nhập thông số màn hình")
  //backcam
  flag &= validation.checkHollow(backCam, "tbbackCam", "(*)Vui lòng nhập thông số cam sau")
  //frontcam
  flag &= validation.checkHollow(frontCam, "tbfrontCam", "(*)Vui lòng nhập thông số cam trước")
  //img
  flag &= validation.checkHollow(img, "tbimg", "(*)Vui lòng nhập hình ảnh")
  //des
  flag &= validation.checkHollow(desc, "tbdesc", "(*)Vui lòng nhập mô tả")
  //type
  flag &= validation.checkType("type", "tbtype", "(*)Vui lòng chọn loại")

  
  
  if (flag) {
    //tạo đối tượng product từ lớp đối tượng Product
    if(id===""){
      var product = new Product("", name, price, img, desc, screen, backCam, frontCam, type)
    }else{
      var product = new Product(id, name, price, img, desc, screen, backCam, frontCam, type)
    }
  return product
}
  return null
}

function getListProduct() {
  //pending
  getEle("loader").style.display = "block";
  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      renderUI(result.data)
      listproduct.addProduct(result.data)

      getEle("loader").style.display = "none";
    })
    .catch(function (error) {
      console.log(error);
    })
}
getListProduct();

function renderUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];

    content += `
            <tr>
                <td>${i + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <img src="${product.img}" width="30%" />                
                </td>
                <td>${product.desc}</td>
                
                <td>
                    <button style="background-color: #007bff;" class="btn btn-info"  data-toggle="modal" data-target="#exampleModal" onclick="editProduct(${product.id})">Sửa</button>
                    <button style="background-color: #dc3545;"  class="btn btn-danger" onclick="delProduct(${product.id})" >Xóa</button>
                </td>
            </tr>
        `
  }
  getEle("tablePhone").innerHTML = content;
}
/**
 * tìm kiếm
 */

function searchProduct() {
  var txtSearch = getEle("txtSearch").value;
  var arraySearch = listproduct.findProduct(txtSearch);

  renderUI(arraySearch);

}
getEle("txtSearch").addEventListener("keyup", searchProduct)

/**
 * xóa
 */
function delProduct(id) {
  var promise = api.delProductApi(id);
  
  promise
    .then(function (result) {
      alert('bạn muốn xóa sản phẩm')
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
/**
 * thêm
 */
getEle("btnThemSP").onclick = function () {
  getEle("header-title").innerHTML = "Thêm sản phẩm"
  var buttonAdd = `<button style="background-color:#ffc107 ;" onclick="addPhone()"> Add Phone</button>`
  getEle("modal-footer").innerHTML = buttonAdd;
}

function resetForm() {
  document.getElementById('formPhone').reset()
}

function addPhone() {
  // dom tới các thẻ input

 var product = getInfoProduct();
if(product){
  var promise = api.addProductApi(product)
  promise
    .then(function () {
      getListProduct();
      //close modal
      document.getElementsByClassName("close")[0].click();
      // if(product){
      //   listproduct.addProduct(product)
      // }

    })
    .catch(function (error) {
      console.log(error);
    })
}
}
 





/**
 * sửa
 */
function editProduct(id) {


  getEle("header-title").innerHTML = "Sửa sản phẩm"
  var buttonUpdate = `<button class="btn btn-success" onclick="updatePhone(${id})">Update Phone</button>`
  getEle("modal-footer").innerHTML = buttonUpdate;

  api.getListProductById(id)
    .then(function (result) {
      //console.log(result.data);
      //show data ra thẻ input
      getEle("name").value = result.data.name
      getEle("price").value = result.data.price
      getEle("img").value = result.data.img
      getEle("desc").value = result.data.desc
      getEle("screen").value = result.data.screen
      getEle("backCam").value = result.data.backCamera
      getEle("frontCam").value = result.data.frontCamera
      getEle("type").value = result.data.type
    })
    .catch(function (error) {
      console.log(error);
    })




};
/**
 * cập nhật
 */
function updatePhone(id) {
  var product = getInfoProduct(id);
  if (product){
    api.updateProductApi(product)
    .then(function () {
      getListProduct();
      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch();
  }



 
}
/**
 * sắp xếp theo giá tiền
 */
getEle("slcArrange").onchange = function () {
  var type = getEle("slcArrange").value
  var oder = listproduct.orderByPrice(type);
  renderUI(oder);
}

