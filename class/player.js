const { Food } = require('./food');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        this.currentRoom.items.forEach((item, index) => {
            if (item.name === itemName) {
                console.log(`You took the ${item.name}.`);
                this.items.push(item);
                this.currentRoom.items.splice(index, 1);
            }
        });
    }

    dropItem(itemName) {
        this.items.forEach((item, index) => {
            if (item.name === itemName) {
                console.log(`You dropped the ${item.name}`);
                this.currentRoom.items.push(item);
                this.items.splice(index, 1);
            }
        });
    }

    eatItem(itemName) {
        this.items.forEach((item, index) => {
            if (item.name === itemName && item instanceof Food) {
                console.log(`You ate the ${item.name}.`);
                this.items.splice(index, 1);
            } else if (item.name === itemName && !(item instanceof Food)) {
                console.log(`You can't eat the ${item.name}! That's not food!`);
            }
        })

    }

    getItemByName(name) {
        for (let item of this.items) {
            if (item.name === name) {
                return item;
            }
        }
    }
}

module.exports = {
  Player,
};
