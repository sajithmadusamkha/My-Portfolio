$("#cusId").focus();

$("#saveCustomer").click(function () {
    let customerId = $("#cusId").val();
    let customerName = $("#cusName").val();
    let customerAddress = $("#address").val();
    let customerEmail = $("#email").val();

    let customerObject = Customer(customerId,customerName,customerAddress,customerEmail);

    customers.push(customerObject);

});

