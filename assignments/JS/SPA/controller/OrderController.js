$('#addItemBtn').click( function () {
    let qtyOnHand = parseInt($('#orderQtyOnHand').val());
    let orderQty = parseInt($('#orderQty').val());

    if($('#orderQty').val() != ""){
        if(qtyOnHand < orderQty) {
            Swal.fire('Out of Stock!');
        } else {
            updateItemQty();
        }
    } else {
        Swal.fire('Enter quantity...');
    }
});

function addItem() {
    let oId = $('#orderID').val();
    let itemCode = $('#orderItemOpt').val();
    let itemName = $('#orderItemName').val();
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

$('#orderID').attr('disabled',true);
$('#currentOrderDate').val(currentDate());

generateOrderId();

function generateOrderId() {
    if (orders.length === 0){
        $('#orderID').val('P00-001');
    } else {
        let split = orders[orders.length-1].code.split('-');
        let no = (+split[1])+1;
        $('#orderID').val('P00-'+(String(no).padStart(3,'0')));
    }
}
