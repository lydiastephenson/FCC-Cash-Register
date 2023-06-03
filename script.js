function checkCashRegister(price, cash, cid) {
    const UNIT_AMOUNT = [0.01, 0.05, 0.10, 0.25, 1, 5, 10, 20, 100];
    let change = cash - price;
    let total_cid = cid.map(n => n[1]).reduce((i, n) => i + n).toFixed(2);

    if (total_cid < change) return {status: "INSUFFICIENT_FUNDS", change: []}
    if (total_cid == change) return {status: "CLOSED", change: cid}

    let arr = [];

    for (let i = cid.length - 1; i >= 0; i--) {
        let temp = [cid[i][0], 0];
        while (UNIT_AMOUNT[i] <= change && cid[i][1] > 0) {
            temp[1] += UNIT_AMOUNT[i];
            cid[i][1] -= UNIT_AMOUNT[i];
            change -= UNIT_AMOUNT[i];
            change = change.toFixed(2);
        }

        if (temp[1] != 0) arr.push(temp);
    }

    if (change != 0) return {status: "INSUFFICIENT_FUNDS", change: []}

    return {status: "OPEN", change: arr}
}