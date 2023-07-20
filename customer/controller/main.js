var api = new Service();

var cart = new Cart();
// var validation = new Validation();

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
    for(var i=0;i<cart.arr.length;i++){
        var cartItem=cart.arr[i];
        content += `
                <tr>
                    <td scope="row"><img class="gioHang-img"
                                    src="${cartItem.img}"
                                    alt=""></td>
                    <td>${cartItem.name}</td>
                    <td>${cartItem.price}</td>
                    <td>
                    <button onclick="giam">-</button>
                    <span>${cartItem.soLuong}</span>
                    <button onclick="tang">+</button></td>
                    <td>
                        <button onclick="thanhToan()">Thanh toan</button>
                        <button onclick="xoaSanPham()">Xóa</button>
                    </td>
                </tr>      
    `

    }
    

    document.getElementById("hienThiGioHang").innerHTML = content;
}

function thanhToan() {
    console.log(123);
}
