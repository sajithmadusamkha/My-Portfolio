function orderCart(ocICode,ocItemName,ocQty,ocPrice,ocTotal){
    return {
        orderCItemCode: ocICode,
        orderCItemName: ocItemName,
        orderCQty: ocQty,
        orderCPrice: ocPrice,
        orderCTotal: ocTotal
    }
}