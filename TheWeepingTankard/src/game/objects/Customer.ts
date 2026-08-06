import Phaser from "phaser";

// Customer data 
export type Customer = {
    id: string;
    name: string;
    race: string;
    patience: number;
    happiness: number;
    canStartDialogue: boolean;
    order: string;
    state: CustomerState;
};

// Different types of states for the customer 
export type CustomerState =
    | "entering"
    | "waiting-to-order"
    | "waiting-for-drink"
    | "drinking"
    | "leaving";

// Whats a customer inside our game?
export type CustomerEntity = {
    data: Customer;
    sprite: Phaser.GameObjects.Sprite;
    waitingTime: number;
}

// How do we create a customer?
export function createCustomer(
    scene: Phaser.Scene,
    customerData: Customer,
    spriteKey: string,
    x: number,
    y: number
): CustomerEntity {
    const sprite = scene.add.sprite(x, y, spriteKey);
    sprite.setInteractive();

    return {
        data: customerData,
        sprite: sprite,
        waitingTime: 0
    };
} //end of createCustomer function

// function to change the customers state when they place an order <-- This must eventually be randomized as the user isnt playing as the customer.
export function placeOrder(customer: CustomerEntity) {
    customer.data.state = "waiting-for-drink";
    customer.waitingTime = 0;
}

export function serveDrink(customer: CustomerEntity) {
    customer.data.state = "drinking";
    customer.waitingTime = 0;
}