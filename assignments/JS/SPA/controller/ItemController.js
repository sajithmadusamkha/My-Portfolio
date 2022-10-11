$("#itemCode").focus();
$("#update-itemCode").focus();

$("#saveItem").click(function () {
    let itemCode = $("#itemCode").val();
    let itemName = $("#itemName").val();
    let quantity = $("#quantity").val();
    let price = $("#itemPrice").val();

    var itemObject = item(itemCode,itemName,quantity,price)

    items.push(itemObject);

    loadAllItems();
    bindRowClick();
    loadAllCustomerForOption();
    clearTextFields("","","","")
});

function loadAllItems() {
    $("#tblItems").empty();

    for (let item of items) {
        console.log(item);

        var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`;

        $("#tblItems").append(row);
    }
}

function bindRowClick() {
    $("#tblItems>tr").click(function () {
        let code = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let qtyOnHand = $(this).children(":eq(2)").text();
        let price = $(this).children(":eq(3)").text();

        $('#update-itemCode').val(code);
        $('#update-itemName').val(name);
        $('#update-quantity').val(qtyOnHand);
        $('#update-itemPrice').val(price);
    });
}

$("#update-itemCode").on('keyup', function (event) {
   if(event.code == "Enter"){
       let typeCode = $("#update-itemCode").val();
       let item = searchItem(typeCode);
       if(item != null){
           setTextFieldValues(item.code, item.name, item.quantity, item.price);
       } else {
           alert("There is no Item available for that " + typeCode);
           setTextFieldValues("", "", "", "");
       }
   }
});

$("#updateItemSearchBtn").click(function () {
    let code = $("#updateItemSearch").val();
    let item = searchItem(code);
    if(item != null){
        setTextFieldValues(item.code, item.name, item.quantity, item.price);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There is no Item available for that ' + code,
        });
    }
});

function setTextFieldValues(code, name, qtyOnHand, price) {
    $("#update-itemCode").val(code);
    $("#update-itemName").val(name);
    $("#update-quantity").val(qtyOnHand);
    $("#update-itemPrice").val(price);
}

function clearTextFields(code, name, qtyOnHand, price){
    $("#itemCode").val(code);
    $("#itemName").val(name);
    $("#quantity").val(qtyOnHand);
    $("#itemPrice").val(price);
}

function searchItem(itemCode) {
    for (const item of items) {
        if(item.code == itemCode){
            return item;
        }
    }
    return null;
}

function loadAllCustomerForOption() {
    $("#selectCodeForUpdate").empty();
        for (let item of items) {
            $("#selectCodeForUpdate").append(`<option>${item.code}</option>`);
        }
}

const itemCode = /^(I00-)[0-9]{1,3}$/;