$("#cusId").focus();

$("#saveCustomer").click(function () {
    let customerId = $("#cusId").val();
    let customerName = $("#cusName").val();
    let customerAddress = $("#address").val();
    let customerSalary = $("#salary").val();

    let customerObject = Customer(customerId,customerName,customerSalary,customerAddress);

    customers.push(customerObject);
    loadAllCustomers();
    bindCusRowClick();
    loadAllCustomerForOption();
});

function loadAllCustomers() {
    $("#tblCustomer").empty();

    for (var customer of customers) {
        console.log(customer);

        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.salary}</td><td>${customer.address}</td></tr>`

        $("#tblCustomer").append(row);
    }
}

function bindCusRowClick() {
    $("#tblCustomer>tr").click(function () {
       let id = $(this).children(":eq(0)").text();
       let name = $(this).children(":eq(1)").text();
       let salary = $(this).children(":eq(2)").text();
       let address = $(this).children(":eq(3)").text();

        $('#update-cusId').val(id);
        $('#update-cusName').val(name);
        $('#update-salary').val(salary);
        $('#update-address').val(address);
    });
}

function loadAllCustomerForOption() {
    $("#selectCustomerName").empty();
    for (let customer of customers) {
        $("#selectCustomerName").append(`<option>${customer.name}</option>`)
    }
}

$('#customerSearchBtn').click(function () {
   let id = $('#customerSearch').val();
   let customer = searchCustomer(id);
   if (customer != null) {
       setCusTextField(customer.id,customer.name,customer.salary,customer.address);
   } else {
       Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'There is no Customer available for that ID ' + id,
       });
   }
});

function searchCustomer(id){
    for (const customer of customers) {
        if(customer.id == id){
            return customer;
        }
    }
    return null;
}

function setCusTextField(id,name,salary,address){
    $('#update-cusId').val(id);
    $('#update-cusName').val(name);
    $('#update-salary').val(salary);
    $('#update-address').val(address);
}
