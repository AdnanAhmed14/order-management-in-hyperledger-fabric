"use strict";

const { Contract } = require("fabric-contract-api");

class Order extends Contract {
    async init(ctx){
        console.info("Chaincode Instantiated");
    }
    async createOrder(
        ctx,
        order_id,
        qty,
        prod_id,
        expectedDate,
        completionDate,
        price,
        owner
    ) {
        let order = {
            order_id,
            qty,
            prod_id,
            order_date: Date(Date.now()),
            expectedDate: Date(expectedDate),
            completionDate: Date(completionDate),
            status: "New",
            price,
            owner,
            docType: "order"
        };
        console.info(order);
        try {
            await ctx.stub.putState(
                order.order_id,
                Buffer.from(JSON.stringify(order))
            );
            console.log("The order is created");
            return(JSON.stringify({response:"The order is created successfully!!!"}));
        } catch (error) {
            throw new Error(
                "Order is not created this the error faced in creating: " +
                    error
            );
        }
    }

    async viewOrder(ctx, order_id) {
        try {
            const orderAsBytes = await ctx.stub.getState(order_id); // get the car from chaincode state
            if (!orderAsBytes || orderAsBytes.length === 0) {
                throw new Error(`${order_id} does not exist`);
            }
            console.log(orderAsBytes.toString());
            return orderAsBytes.toString();
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }

    async updateOrder(ctx, order_id, status) {
        try {
            const orderAsBytes = await ctx.stub.getState(order_id); // get the car from chaincode state
            if (!orderAsBytes || orderAsBytes.length === 0) {
                throw new Error(`${order_id} does not exist`);
            }
            console.log(orderAsBytes.toString());
            let order = JSON.parse(orderAsBytes.toString());
            order.status = status;
            try {
                await ctx.stub.putState(
                    order.order_id,
                    Buffer.from(JSON.stringify(order))
                );
                console.log("The order is updated");
                return(JSON.stringify({response:"The order is updated successfully!!!"}));
            } catch (error) {
                throw new Error(
                    "Order is not updated this the error faced in creating: " +
                        error
                );
            }
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }
}

module.exports = Order;
