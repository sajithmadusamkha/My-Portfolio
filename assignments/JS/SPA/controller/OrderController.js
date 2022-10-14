$('#orderID').attr('disabled',true);

generateOrderId();

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
    if (orders.length===0){
        $('#orderID').val('P00-001');
    } else {
        let split = orders[orders.length-1].code.split('-');
        let no = (+split[1])+1;
        $('#orderID').val('P00-'+(String(no).padStart(3,'0')));
    }
}
