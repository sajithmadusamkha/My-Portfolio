
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
