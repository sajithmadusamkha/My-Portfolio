/**** Buttons ****/
$('#orderID').attr('disabled',true);
$('#addItemBtn').attr('disabled',true);
$('#placeOrder').attr('disabled',true);
$('#balance').attr('disabled',true);

/**** Current Date ****/
$('#currentOrderDate').val(currentDate());

/**** Order Id auto increment method ****/
generateOrderId();

$('#addItemBtn').click( function () {
    let qtyOnHand = parseInt($('#orderQtyOnHand').val());
    let orderQty = parseInt($('#orderQty').val());

    if($('#orderQty').val() != ""){
        if(qtyOnHand < orderQty) {
            Swal.fire('Out of Stock!');
        } else {
            updateItemQty();
            addItem();
        }
    } else {
        Swal.fire('Enter quantity...');
    }
    $('#placeOrder').attr('disabled',false);
});

function addItem() {
    let oId = $('#orderID').val();
    let itemCode = $('#orderItemOpt').val();
    let itemName = $('#orderItemName').val();
    let price =  $('#orderUPrice').val();
    let qty =  $('#orderQty').val();
    let totalPrice = price * qty;

    for (const c of itemsCart) {
        if(c.orderCItemCode == itemCode) {
            var updateQty = +c.orderCQty + +qty;
            let updateTotal = price * updateQty;
            c.orderCQty = updateQty;
            c.orderCTotal = updateTotal;
            return;
        }
    }

    let itemCart = orderCart(oId,itemCode,itemName,price,qty,totalPrice);
    itemsCart.push(itemCart);
    $("#balance,#cash,#discount").val("");
    $('#addItemBtn').attr('disable',true);
}

function updateItemQty(){
    let qtyOnHand = $('#orderQtyOnHand').val();
    let qty = $('#orderQty').val();
    let updatedQty = qtyOnHand-qty;

    for (let item of items) {
        if($('#orderItemOpt').val() === item.code) {
            item.quantity = updatedQty;
            $('#orderQtyOnHand').val(item.quantity);
            loadAllItems();
        }
    }
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
