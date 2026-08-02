import Phaser from "phaser";
import { createCustomer, type Customer, type CustomerEntity, placeOrder, serveDrink } from "../objects/Customer";

export class TavernScene extends Phaser.Scene {
    customers: CustomerEntity[] = [];
    dialoguePanel: Phaser.GameObjects.Container | null = null;
    notificationText: Phaser.GameObjects.Text | null = null;

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
    }; //end of preload()

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
            state: "entering"
        };

        const ghost = createCustomer(
            this,
            ghostCustomer,
            "pixel-ghost2",
            240,
            160
        );

        ghost.sprite.setScale(0.3);

        this.customers.push(ghost);

        ghost.sprite.on("pointerdown", () => {
            this.showCustomerDialogue(ghost);
        });

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
    } //end of update()

    showCustomerDialogue(customer: CustomerEntity) {
        if (this.dialoguePanel) {
            this.dialoguePanel.destroy()
        }

        const panel = this.add.rectangle(
            640,
            600,
            500,
            180,
            0x222222
        );

        const nameText = this.add.text(
            410,
            530,
            customer.data.name,
            {
                fontSize: "24px",
                color: "#ffffff"
            }
        );

        const orderText = this.add.text(
            410,
            570,
            `"I'd like a ${customer.data.order}"`,
            {
                fontSize: "18px",
                color: "#ffffff"
            }
        );

        const orderButton = this.add.rectangle(
            700,
            650,
            160,
            50,
            0x444444
        );

        const orderButtonText = this.add.text(
            650,
            635,
            "Take order",
            {
                fontSize: "18px",
                color: "#ffffff"
            }
        );

        orderButton.setInteractive();

        orderButton.on("pointerdown", () => {
            placeOrder(customer);

            this.dialoguePanel?.destroy();
            this.dialoguePanel = null;

            this.showNotification(
                `${customer.data.name} is waiting for his ${customer.data.order}`
            );

        });

        this.dialoguePanel = this.add.container(
            0,
            0,
            [
                panel,
                nameText,
                orderText,
                orderButton,
                orderButtonText
            ]
        );

    }; //end of showCustomerDialogue()

    showNotification(message: string) {
        if (this.notificationText) {
            this.notificationText.destroy();
        }

        this.notificationText = this.add.text(
            640,
            100,
            message,
            {
                fontSize: "22px",
                color: "#ffffff",
                backgroundColor: "#222222",
                padding: {
                    x: 15,
                    y: 10
                }
            }
        ).setOrigin(0.5);

    }; // end of showNotification()





} // end of TavernScene