var api = new Service();

var cart = new Cart();

var product = new Product();

getLocalStorage();


function getListProduct() {
    getEle("loader").style.display = "block";
    var promise = api.getListProductApi();

    promise.then(function (result) {
        dssp = result.data;

        var dataJson = JSON.parse(JSON.stringify(dssp));
        dssp.arr = dataJson;

        getEle("loader").style.display = "none";
        renderSanPham(dssp.arr);
    })
        .catch(function (error) {
            getEle("loader").style.display = "none";
            console.log(error);
        });
}
getListProduct();

function renderSanPham(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var product = data[i];


        content += `
        <div class="item col-12 col-md-6 col-lg-4">
                    <div class="card-group">
                        <div class="card">
                            <h4 class="card-head">${product.name}</h4>
                            <img src="${product.img}" alt="">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <p class="card-text">Loại: ${product.type} </p>
                                    <p class="card-text">Giá: ${product.price}</p>
                                </div>
                                <p class="card-text">screen: ${product.screen}</p>
                                <p class="card-text">backCamera: ${product.backCamera}</p>
                                <p class="card-text">frontCamera: ${product.frontCamera}</p>
                                <p class="card-text">Desc:  ${product.desc}</p>
                                <div class="d-flex justify-content-center">
                                    <button onclick="themSanPham(${product.id})" class="buyItem">Chọn</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }
    document.getElementById("hienThiSanPham").innerHTML = content;
}
function getEle(id) {
    return document.getElementById(id);
}

function selectTypeProduct() {
    var select = getEle("select").value;
    var selectType = [];
    for (var i = 0; i < dssp.length; i++) {
        var product = dssp[i];
        // convert chữ
        var selectLowerCase = select.toLowerCase();
        var typeLowerCase = product.type.toLowerCase();

        if (selectLowerCase == typeLowerCase) {
            selectType.push(product);

        } if (select == "") {
            selectType = dssp;
        }
    }
    renderSanPham(selectType);
}
function searchProducts() {
    var timKiemSanPham = getEle("searchProduct").value;
    var mangTimKiem = [];
    for (var i = 0; i < dssp.length; i++) {
        var product = dssp[i];

        // convert chữ
        var searchLowerCase = timKiemSanPham.toLowerCase();
        var nameLowerCase = product.name.toLowerCase();

        if (nameLowerCase.indexOf(searchLowerCase) !== -1) {
            mangTimKiem.push(product);

        }

    }
    renderSanPham(mangTimKiem);
}
getEle("searchProduct").addEventListener("keyup", searchProducts);

function thongTinSanPham(id) {
    for (var i = 0; i < dssp.arr.length; i++) {
        var product = dssp.arr[i];
        if (product.id == id) {
            break;
        }
    }
    return product;
}
function thongTinGioHang(id, isVali) {
    var product = thongTinSanPham(id);
    var id = product.id;
    var name = product.name;
    var price = product.price;
    var img = product.img;
    var soLuong = 1;
    var money = 0;

    if (isVali) {
        var flag = false;
        for (var i = 0; i < cart.arr.length; i++) {
            var cartItem = cart.arr[i];
            if (cartItem.id == id) {
                flag = true;
            }
        }
        if (flag) {
            cartItem.soLuong += soLuong;
        } else {
            var cartItem = {
                id: id,
                name: name,
                price: price,
                img: img,
                soLuong: soLuong,
                money: soLuong * price,
            }
            cart.themSP(cartItem);
        }
    }

    return cartItem;
}
function themSanPham(id) {
    getEle("btnGioHang").style.color = "yellow";
    getEle("hienthi").style.display = "block";
    var cartItem = thongTinGioHang(id, true);
    if (cartItem) {
        // console.log(cartItem);
        renderCart(cartItem);
        setLocalStorage();

    }

}

function setLocalStorage() {
    var dataString = JSON.stringify(cart.arr);
    localStorage.setItem("cart", dataString);
}
function getLocalStorage() {
    if (localStorage.getItem("cart")) {
        var dataString = localStorage.getItem("cart");
        var dataJson = JSON.parse(dataString);
        cart.arr = dataJson;
        renderCart(cart.arr);
    }
}

function renderCart() {
    var content = '';
    for (var i = 0; i < cart.arr.length; i++) {
        var cartItem = cart.arr[i];
        content += `
        <tr>
        <td scope="row">
            <img class="gioHang-img" src="${cartItem.img}" alt="">
        </td>
        <td>${cartItem.name}</td>
        <td>${cartItem.price}</td>
        <td>
            <button onclick="giam(${cartItem.id})">-</button>
            <span>${cartItem.soLuong}</span>
            <button onclick="tang(${cartItem.id})">+</button>
        </td>
        </td>
        <td>
            <button onclick="xoaSanPham(${cartItem.id})">Xóa</button>
        </td>
        <td>${cartItem.money}$</td>
    </tr>
                         
    `
    }
    document.getElementById("hienThiGioHang").innerHTML = content;
}
function giam(id) {
    for (var i = 0; i < cart.arr.length; i++) {
        var cartItem = cart.arr[i];
        if (cartItem.id == id) {
            break;
        }
    }
    var soLuong = cartItem.soLuong - 1;
    cartItem.soLuong = soLuong;
    if (cartItem.soLuong === 0) {
        cart.xoaSanPham(id);
    }
    cartItem.soLuong = soLuong;
    cartItem.money = money(cartItem.soLuong, cartItem.price);
    renderCart(cart.arr);
    setLocalStorage();
}
function tang(id) {
    for (var i = 0; i < cart.arr.length; i++) {
        var cartItem = cart.arr[i];
        if (cartItem.id == id) {
            break;
        }
    }
    var soLuong = cartItem.soLuong + 1;
    cartItem.soLuong = soLuong;
    cartItem.money = money(cartItem.soLuong, cartItem.price);
    renderCart(cart.arr);
    setLocalStorage();
}
function money(soLuong, price) {
    var money = soLuong * price;
    return money;
}

function thanhToan() {
    var total = 0;
    for (var i = 0; i < cart.arr.length; i++) {
        var cartItem = cart.arr[i];
        total += cartItem.price * cartItem.soLuong;

    }
    getEle("hienthi").style.display = "none";
    getEle("btnGioHang").style.color = "black";
    getEle("gioHang").style.display = "none";
    getEle("hienThiThanhToan").style.display = "block";
    var input = "Số tiền quý khách cần thanh toán là: " + total + "$";
    getEle("hienThiThanhToan").innerHTML = input;
    cart.arr = [];
    renderCart(cart.arr);
    setLocalStorage();
}


function xoaSanPham(id) {
    cart.xoaSanPham(id);
    renderCart(cart.arr);
    setLocalStorage();
}

getEle("btnGioHang").onclick = function () {
    getEle("gioHang").style.display = "block";
    getEle("hienThiThanhToan").style.display = "none";
}




