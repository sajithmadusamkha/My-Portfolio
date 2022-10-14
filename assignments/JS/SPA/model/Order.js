function purchaseOrder(oId,itemCode,itemName,quantity,price,total) {
    return {
        orderId: oId,
        code:itemCode,
        iName: itemName,
        orderQty: quantity,
        unitPrice: price,
        totalPrice: total
    }
}