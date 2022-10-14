function purchaseOrder(oId,itemCode,itemName,quantity,price,total) {
    return {
        code:itemCode,
        iName: itemName,
        orderQty: quantity,
        unitPrice: price,
        totalPrice: total
    }
}