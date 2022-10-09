$("#saveItem").click(function () {
    let itemCode = $("#itemCode").val();
    let itemName = $("#itemName").val();
    let quantity = $("#quantity").val();
    let price = $("#itemPrice").val();

    var itemObject = {
        code: itemCode,
        name: itemName,
        itemQuantity: quantity,
        itemPrice: price
    }

    items.push(itemObject);
    console.log(items);

    loadAllItems();
    bindRowClick();
});

function loadAllItems() {
    $("#tblItems").empty();

    for (var item of items) {
        console.log(item);

        var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.itemQuantity}</td><td>${item.itemPrice}</td></tr>`;

        $("#tblItems").append(row);
    }
}

function bindRowClick() {
    $("#tblItems>tr").click(function () {
        let code = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let qtyOnHand = $(this).children(":eq(2)").text();
        let price = $(this).children(":eq(3)").text();

        $('#itemCode').val(code);
        $('#itemName').val(name);
        $('#quantity').val(qtyOnHand);
        $('#itemPrice').val(price);
    });
}