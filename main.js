/**
 * Базовый класс предмета
 */
class Item {
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
     * Получение информации о предмете
     * @returns строковое значение с информацией о предмете
     */
    getInfo() {
        return `${this.name}, ${this.weight}kg, ${this.rarity}`;
    }

    /**
     * Устанавливает новое значение веса предмета
     * @param {float} newWeight 
     */
    setWeight(newWeight) {
        this.weight = newWeight;
    }

}


/**
 * Класс оружия, расширяет класс предмета
 */
class Weapon extends Item {
    #damage;
    #durability;

    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.#damage = damage;
        this.#durability = durability;
    }

    /**
     * Использует предмет, стоит отметить что уменьшается "качество" предмета
     */
    use() {
        if (this.#durability > 0) {
            this.#durability -= 10;
        }
    }

    /**
     * Восстанавливает "качество" предмета 
     */
    repair() { 
        this.#durability = 100;
    }

    getDurability() {
        return this.#durability;
    }

    /**
     * Получение информации об оружии (перегружено)
     * @returns строковое значение с информацией об оружии, включая поля родительского класса
     */
    getInfo() {
        return `${super.getInfo()}, ${this.#damage} dmg, ${this.#durability}% durability`;
    }
}


function Item_fc(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;

    /**
     * Получение информации о предмете
     * @returns строковое значение с информацией о предмете
     */
    this.getInfo = function() {
        return `fc: ${this.name}, ${this.weight}kg, ${this.rarity}`;
    }
    
    /**
     * Устанавливает новое значение веса предмета
     * @param {float} newWeight 
     */
    this.setWeight = function(newWeight) {
        this.weight = newWeight;
    }

    return this;
}


function Weapon_fc(name, weight, rarity, damage, durability) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
    this.damage = damage;
    this.durability = durability;
    
    /**
     * Устанавливает новое значение веса предмета
     * @param {float} newWeight 
     */
    this.setWeight = function(newWeight) {
        this.weight = newWeight;
    }

    /**
     * Использует предмет, стоит отметить что уменьшается "качество" предмета
     */
    this.use = function() {
        if (this.durability > 0) {
            this.durability -= 10;
        }
    }

    /**
     * Восстанавливает "качество" предмета 
     */
    this.repair = function()  { 
        this.durability = 100;
    }

    /**
     * Получение информации об оружии (перегружено)
     * @returns строковое значение с информацией об оружии, включая поля родительского класса
     */
    this.getInfo = function() {
        return `fc: ${this.name}, ${this.weight}kg, ${this.rarity}, ${this.damage} dmg, ${this.durability}% durability`;
    }

    return this;
}


const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);

const sword0 = Item_fc("Steel Sword", 3.5, "rare");
console.log(sword0.getInfo());
sword0.setWeight(4.0);

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use(); // должно уменьшиться
console.log(bow.durability); // вернет undefined
console.log(bow.getDurability()); 
bow.repair();

const bow0 = Weapon_fc("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow0.getInfo());
bow0.use(); // должно уменьшиться
console.log(bow0.durability); 
bow0.repair();


/**
 * Проверка опциональной цепочки
 * @param {*} tempObj объект класса Item
 */
function checkObj(tempObj) {
    if(tempObj?.weight == null)
        console.log("tempObj have a null value. can not access to member \"weight\"");
    else
        console.log(`tempObj have not a null value. member \"weight\" is equal to ${tempObj.weight}`);
}


let tempObj = null;
checkObj(tempObj);
tempObj = new Item("Hren kakayato", (12.0/10.0), "oochen rare")
checkObj(tempObj);