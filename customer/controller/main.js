var api = new Service();

var cart = new Cart();

var product = new Product();
getLocalStorage();
function getListProduct() {
    var promise = api.getListProductApi();

    promise.then(function (result) {
        dssp = result.data;
        var dataJson = JSON.parse(JSON.stringify(dssp));
        
        dssp.arr = dataJson;
        
        renderProduct(dssp.arr);
    })
        .catch(function (error) {
            console.log(error);
        });
}
getListProduct();

function renderProduct(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var product = data[i];


        content += `
        <div class="content-item">
        <div class="content-top">
            <h4>${product.name} </h4>
            <img class="img" src="${product.img} " alt="">
        </div>
        <div class="content-bottom">
            <p class="p-left">Loại: ${product.type} </p>
            <p class="p-right">Giá: ${product.price} </p>
            <p>Camera sau: ${product.backCamera} </p>
            <p>Camera trước: ${product.frontCamera} </p>
            <p>Giải thích: ${product.desc} </p>
        </div>
        <button onclick="themSanPham(${product.id})" class="buyItem">Chọn</button>
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
    renderProduct(selectType);
}
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
    var money=0;

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
                money:soLuong*price,
            }
            cart.themSP(cartItem);
        }
    }

    return cartItem;
}
function themSanPham(id) {
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
                    <td scope="row"><img class="gioHang-img"
                                    src="${cartItem.img}"
                                    alt=""></td>
                    <td>${cartItem.name}</td>
                    <td>${cartItem.price}</td>
                    <td>
                    <button onclick="giam(${cartItem.id})">-</button>
                    <span>${cartItem.soLuong}</span>
                    <button onclick="tang(${cartItem.id})">+</button></td>
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
    cartItem.money = money(cartItem.soLuong,cartItem.price);
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
    cartItem.money = money(cartItem.soLuong,cartItem.price);
    renderCart(cart.arr);
    setLocalStorage();
}
function money(soLuong,price){
    var money=soLuong*price;
    return money;
}

function thanhToan() {
    var total = 0;
    for (var i = 0; i < cart.arr.length; i++) {
        var cartItem = cart.arr[i];
        total += cartItem.price * cartItem.soLuong;

    }
    console.log(total);
    var input="Số tiền quý khách cần thanh toán là: "+ total +"$";
    getEle("hienThiThanhToan").innerHTML=input;
    cart.arr=[];
    console.log(cart.arr);
    renderCart(cart.arr);
    setLocalStorage();
}


function xoaSanPham(id) {
    cart.xoaSanPham(id);
    renderCart(cart.arr);
    setLocalStorage();
}

function renderThanhToan() {
    


}