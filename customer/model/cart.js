function Cart(){
    this.arr =[];
    this.themSP=function(cartItem){
        this.arr.push(cartItem);
    };
    this.viTri=function(id){
        var index=-1;
        for (var i=0;this.arr.length;i++){
            var cartItem=this.arr[i];
            if(cartItem.id===id){
                index=i;
                break;
            }
        }
        return index;
    };
    this.capNhatSoLuong=function(id,soLuong){
        

    }
   


}