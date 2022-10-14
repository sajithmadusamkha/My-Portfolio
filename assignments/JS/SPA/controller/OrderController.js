/**** Buttons ****/
$('#orderID').attr('disabled',true);
$('#placeOrder').attr('disabled',true);
$('#balance').attr('disabled',true);

/**** Current Date ****/
$('#currentOrderDate').val(currentDate());

/**** Order Id auto increment method ****/
generateOrderId();

$('#addItemBtn').click( function () {
    addToCart();
});

function addToCart() {
    let oId = $('#orderID').val();
    let itemCode = $('#orderItemOpt').val();
    let itemName = $('#orderItemName').val();
    let price =  $('#orderUPrice').val();
    let qtyOnHand = $('#orderQtyOnHand').val();
    let qty =  $('#orderQty').val();
    let cartItem = searchCartItem(itemCode);

    if(parseInt(qtyOnHand) < qty) {
        Swal.fire('Out of Stock!');
        return false;
    } else if(cartItem == null) {
        var cart = {
            itemCode:itemCode,
            itemName:itemName,
            qtyOnHand:qtyOnHand,
            price:price,
            qty:qty,
            totalPrice: parseFloat(price) * parseInt(qty)
        }
        carts.push(cart);
    } else {
        cartItem.qtyOnHand = cartItem.qtyOnHand - parseInt($('#orderQty').val());
        cartItem.qty = parseInt(cartItem.qty) + parseInt($('#orderQty').val());
    }
    loadTable();
    $('#placeOrder').attr('disabled',false);
}

function loadTable(){
    $('#tblOrder').empty();
    for(let cart of carts){
        $('#tblOrder').append(
            `<tr><td>${cart.itemCode}</td><td>${cart.itemName}</td><td>${cart.qty}</td><td>${cart.price}</td><td>${cart.totalPrice}</td></tr>`
        );
    }
    setTotal();
}

function setTotal() {
    let tot = 0;
    for (let cart of carts) {
        tot += parseFloat(cart.totalPrice);
    }
    $('#total').text(tot+".00");
}

function searchCartItem(code) {
    for (let cartItem of carts) {
        if(cartItem.code == code) {
            return cartItem;
        }
    }
    return null;
}


$('#orderItemOpt').change(function () {
    let code = $('#orderItemOpt').val();
    let item = searchItem(code);
    if(item != null) {
        $('#orderItemName').val(item.name);
        $('#orderUPrice').val(item.price);
        $('#orderQtyOnHand').val(item.quantity);
    }
});

$('#orderCusOpt').change(function () {
   let id = $('#orderCusOpt').val();
   let customer = searchCustomer(id);
   if(customer != null) {
       $('#orderCusName').val(customer.name);
       $('#orderSalary').val(customer.salary);
       $('#orderAddress').val(customer.address);
   }
   console.log(id);
});

function currentDate() {
    function twoDigit(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date = new Date()) {
        return [
            date.getFullYear(),
            twoDigit(date.getMonth() + 1),
            twoDigit(date.getDate()),
        ].join('-');
    }
    return formatDate();
}

function loadAllCusForOrderOpt() {
    $("#orderCusOpt").empty();
    for (let cus of customers) {
        $("#orderCusOpt").append(`<option>${cus.id}</option>`);
    }
}

function loadAllItemForOrderOpt() {
    $("#orderItemOpt").empty();
    for (let item of items) {
        $("#orderItemOpt").append(`<option>${item.code}</option>`);
    }
}

function generateOrderId() {
    if (orders.length === 0){
        $('#orderID').val('P00-001');
    } else {
        let split = orders[orders.length-1].code.split('-');
        let no = (+split[1])+1;
        $('#orderID').val('P00-'+(String(no).padStart(3,'0')));
    }
}
