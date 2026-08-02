# Here is some code-logic for people who wanna understand the code a bit more 
# For now its more or less a log to how the code works, see the newest date for the newest logic

## 31.07 - How does the customer file work?
Customer.ts
│
├── Customer
│     ↓
│   Defines customer data
│
├── CustomerEntity
│     ↓
│   Defines data + Sprite
│
└── createCustomer()
      ↓
    Creates one

## 31.07 - How does the TavernScene work?
TavernScene.ts
│
├── customers[]
│     ↓
│   Keeps track of all customers
│
├── preload()
│     ↓
│   Loads assets
│
├── create()
│     ↓
│   Creates initial customers
│
└── update()
      ↓
    Updates customers


## 31.07 How JohnGhosts patience meter works currently 
TavernScene
│
├── customers[]
│      │
│      └── JohnGhost
│             ├── data
│             │    ├── patience: 100 → 99 → 98...
│             │    └── ...
│             │
│             └── sprite
│                  └── 👻
│
└── update()
       │
       └── every ~10 seconds
              ↓
          change customer state


## 02.08 Current gameplay loop: 

Click JohnGhost
                     │
                     ▼
          showCustomerDialogue()
                     │
                     ▼
        ┌────────────────────────┐
        │ JohnGhost              │
        │                        │
        │ "I'd like a drink."    │
        │                        │
        │    [ Take Order ]      │
        └────────────────────────┘
                     │
                     │ click
                     ▼
               placeOrder()
                     │
                     ▼
          state = "waiting-for-drink"
                     │
                     ▼
             dialogue closes
                     │
                     ▼
          update() sees the state
                     │
                     ▼
             waitingTime += delta
                     │
                     ▼
             patience decreases