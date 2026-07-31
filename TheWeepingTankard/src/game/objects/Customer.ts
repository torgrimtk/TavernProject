import Phaser from "phaser";

// Blueprint of what our customers data looks like
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

// What type of action is the customer going to do? 
export type CustomerState = 
| "entering"
| "waiting-for-drink"
| "drinking"
| "leaving";

export type CustomerEntity = {
    data: Customer;
    sprite: Phaser.GameObjects.Sprite;
    waitingTime: number; 
}

export function createCustomer(
    scene: Phaser.Scene,
    customerData: Customer,
    spriteKey: string, 
    x: number, 
    y: number
): CustomerEntity {
    const sprite = scene.add.sprite(x, y, spriteKey);

    return {
        data: customerData,
        sprite: sprite,
        waitingTime: 0
    };
}