/**
 * Created by Shahnawaz on 8/18/14.
 */

var AppModule = {

    data:{},

    selectedItems:[],

    tabChange : function(id){
        // first remove the previous tab 'nav-active' class
        var previousTab = document.querySelectorAll('li.nav-active');
        if(previousTab.length>0){
            previousTab[0].className = "nav-tab";
        }
        // now add 'nav-active' class to the clicked tab
        var tabClick = document.getElementById(id);
        tabClick.className += " nav-active";

        this.makeHTML(id);
    },

    makeHTML : function(id){
        var mainBody = document.getElementById("main-body");
        mainBody.innerHTML = "";
        var dataToAdd;
        switch (id){
            case "nav-appliances":
                dataToAdd = AppModule.data.appliances;
                break;
            case "nav-cell-phones":
                dataToAdd = AppModule.data.cellPhones;
                break;
            case "nav-cameras":
                dataToAdd = AppModule.data.cameras;
                break;
            case "nav-video-games":
                dataToAdd = AppModule.data.videoGames;
                break;
            case "nav-wearable-tech":
                dataToAdd = AppModule.data.wearableTech;
                break;
        }
        dataToAdd.forEach(function(item){
            mainBody.innerHTML += "<div class='img' id="+item.id+" onclick='AppModule.addOrRemoveItem(this.id)'>" +
                "<img src="+ item.imgUrl +" alt="+ item.name +" width='100' height='100'/>" +
                "<div class='desc'>"+ item.name + "</div>" +
                "</div>";

            if(AppModule.selectedItems.indexOf(item.id)!=-1){
                document.getElementById(item.id).className+=" item-selected";
            }
        });
    },

    addOrRemoveItem : function(itemId){
        var itemClicked = document.getElementById(itemId);

        if(AppModule.selectedItems.indexOf(itemId)>=0){
            //remove
            AppModule.selectedItems.splice(AppModule.selectedItems.indexOf(itemId),1);
            itemClicked.className = "img";
        }
        else{
            //add
            AppModule.selectedItems.push(itemId);
            itemClicked.className += " item-selected"
        }
        this.updateCart("cart-items");
        this.updatePrice("cart-price");
        console.log(AppModule.selectedItems);
    },

    updateCart : function(itemCartId){
        var selectedItemsHtml = "";
        for(obj in AppModule.data){
            AppModule.data[obj].forEach(function(item){
                AppModule.selectedItems.forEach(function(id){
                    if(item.id == id){
                        selectedItemsHtml += "<li class='cartItems'>"+item.name+"</li>";
                    }
                })
            })
        }
        var cart = document.getElementById(itemCartId);

        cart.innerHTML = selectedItemsHtml;

    },

    updatePrice : function(priceCartId){
        var totalPrice = 0;
        for(obj in AppModule.data){
            AppModule.data[obj].forEach(function(item){
                AppModule.selectedItems.forEach(function(id){
                    if(item.id == id){
                        totalPrice += item.price;
                    }
                })
            })
        }

        var cart = document.getElementById(priceCartId);
        cart.innerHTML = "<h3>Your Cart!</h3><strong>total items:</strong> "+this.selectedItems.length+"<br><strong>total price:</strong> "+totalPrice;
    }

};