function Cart() {
    this.arr = [];
    this.themSP = function (cartItem) {
        this.arr.push(cartItem);
    };
    this.viTri = function (id) {
        var index = -1;
        for (var i = 0; this.arr.length; i++) {
            var cartItem = this.arr[i];
            if (cartItem.id == id) {
                index = i;

                break;
            }
        }
        return index;

    };
    this.xoaSanPham = function (id) {
        var xoaSanPham = this.viTri(id);
        if (xoaSanPham !== -1) {
            this.arr.splice(xoaSanPham, 1);
        }
    };
}