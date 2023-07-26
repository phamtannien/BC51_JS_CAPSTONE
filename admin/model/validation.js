function Validation(){
    this.checkHollow = function(value, errorId, mess){
        
        if(value === ""){
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return  true;
    }
    this.checkType = function(idSelect, errorId, mess){
       var typePhone = document.getElementById("type")
       if(typePhone.selectedIndex !== 0){
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return  true;
       }
       getEle(errorId).innerHTML = mess;
       getEle(errorId).style.display = "block";
       return false;
    }
    this.checkNumber = function(value, errorId, mess){
        var letter = /^[0-9]+$/;
        if(value.match(letter)){
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return  true;
        }
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    }
}