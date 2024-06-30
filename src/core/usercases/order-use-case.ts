import { OrderGateway } from "../../operation/gateways/order";
import { OrderEntity } from "../entities/order";
import { CartGateway } from '../../operation/gateways/cart';
import { generateRandomString } from "../../common/helpers/generators";

export class OrderUseCase {

    static async receiveOrder(idCart: string, orderGateway: OrderGateway, cartGateway: CartGateway): Promise<OrderEntity | null> {
        const status = "RECEIVED";
        let estimatedDelivery: number = await OrderUseCase.estimatedDelivery(idCart, cartGateway);
        const ordersReceived = (await OrderUseCase.getAllActiveOrders(orderGateway));
        if (ordersReceived) {
            ordersReceived.filter(value =>
                (value.status == "RECEIVED" || value.status == "PREPARING")
                && Date.now().valueOf() >= value.receiveDate.valueOf());
            for (const value of ordersReceived) {
                estimatedDelivery += await OrderUseCase.estimatedDelivery(value.idCart, cartGateway);
            }
        }
        const novoId = generateRandomString();

        const order = new OrderEntity(
            novoId,
            idCart,
            new Date(),
            estimatedDelivery,
            status
        );
        const nOrder = orderGateway.create(order);
        if (nOrder) {
            return nOrder;
        }
        else {
            return null;
        }
    }

    static async prepareOrder(idOrder: string, orderGateway: OrderGateway): Promise<OrderEntity | null> {
        const order = await orderGateway.findOne(idOrder);
        if (order) {
            order.status = "PREPARING";
            return orderGateway.update(idOrder, order);
        }
        else {
            return null
        }
    }

    static async estimateDelivery(idOrder: string, orderGateway: OrderGateway): Promise<string> {
        const order = await orderGateway.findOne(idOrder);
        if (order) {
            let estimatedDelivery = new Date((order.receiveDate.getTime() + order.deliveryTime * 60000));
            return `The estimate time to order is ready is ${estimatedDelivery}`;
        }
        else {
            return "Order não encontrada";
        }
    }

    static async sendNotificationDelivery(idOrder: string, orderGateway: OrderGateway): Promise<string> {
        const order = await orderGateway.findOne(idOrder);
        if (order) {
            return `The order is ready to delivery`;
        }
        else {
            return "Order não encontrada";
        }
    }

    static async updateStatusToReady(idOrder: string, orderGateway: OrderGateway): Promise<string> {
        const order = await orderGateway.findOne(idOrder);
        if (order) {
            order.status = "READY";
            await orderGateway.update(idOrder, order);
            return OrderUseCase.sendNotificationDelivery(idOrder, orderGateway);
        }
        else {
            return "Ordem não encontrada";
        }
    }

    static async updateStatusToDelivered(idOrder: string, orderGateway: OrderGateway): Promise<OrderEntity | null> {
        const order = await orderGateway.findOne(idOrder);
        if (order) {
            order.status = "DELIVERED";
            return orderGateway.update(idOrder, order);
        }
        else {
            return null;
        }
    }

    static async updateStatusToClosed(idOrder: string, orderGateway: OrderGateway): Promise<OrderEntity | null> {
        const order = await orderGateway.findOne(idOrder);
        if (order) {
            order.status = "CLOSED";
            return orderGateway.update(idOrder, order);
        }
        else {
            return null;
        }
    }
    static async getAllActiveOrders(orderGateway: OrderGateway): Promise<OrderEntity[] | null> {
        const result = await orderGateway.getAll();
        if (result) {
            return result.filter((p) => p.status !== "CLOSED" && p.status !== "DELIVERED")
        }
        else {
            return null;
        }

    }

    private static async estimatedDelivery(idCart: string, cartGateway: CartGateway): Promise<number> {
        const cart = Object.assign({}, await cartGateway.getOne(idCart));
        return cart.products.reduce((sum: any, p: { timeToPrepare: any; }) => sum + p.timeToPrepare, 0);
    }
}