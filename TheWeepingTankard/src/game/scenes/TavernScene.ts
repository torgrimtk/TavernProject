import Phaser from "phaser";
import { createCustomer, type Customer, type CustomerEntity, placeOrder, serveDrink } from "../objects/Customer";

export class TavernScene extends Phaser.Scene {
    customers: CustomerEntity[] = [];

    constructor() {
        super("TavernScene");
    }

    preload() {
        this.load.image(
            "tavern-background",
            "/assets/tavern/tavern-background.png"
        );
        this.load.image(
            "pixel-ghost2",
            "/assets/tavern/pixelghost2.png"
        );
    }

    create() {
        this.add.image(640, 360, "tavern-background");

        const ghostCustomer: Customer = {
            id: "customer-1",
            name: "JohnGhost",
            race: "Spirit",
            patience: 100,
            happiness: 100,
            canStartDialogue: true,
            order: "Spooky Rum",
            state: "waiting-for-drink"
        };

        this.customers.push(
            createCustomer(
                this,
                ghostCustomer,
                "pixel-ghost2",
                240,
                160
            )
        );

        const ghost = this.customers[0];

        placeOrder(ghost);
        console.log(ghost.data.state);
        // console.log(ghost.waitingTime);

        serveDrink(ghost);
        console.log(ghost.data.state)

    }; //end of create()

    update(time: number, delta: number) {
        for (const customer of this.customers) {
            if (customer.data.state === "waiting-for-drink") {
                customer.waitingTime += delta;

                if (customer.waitingTime >= 10000) {
                    customer.data.patience -= 1;
                    customer.waitingTime = 0;

                    console.log(
                        `${customer.data.name} patience: ${customer.data.patience}`
                    );
                }
            }
        }
    }
}