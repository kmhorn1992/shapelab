let dieArray: Array<IDie> = [];
let dieContainer: HTMLElement;

document.addEventListener('DOMContentLoaded', () => {
    dieContainer = document.getElementById('dice-container');

    const ADD_BUTTON: HTMLButtonElement = document.createElement('button');
    const SUM_BUTTON: HTMLButtonElement = document.createElement('button');
    const ROLL_ALL_BUTTON: HTMLButtonElement = document.createElement('button');

    ADD_BUTTON.innerText = 'Generate Die';
    SUM_BUTTON.innerText = 'Sum Die';
    ROLL_ALL_BUTTON.innerText = 'Roll All';

    ADD_BUTTON.addEventListener('click', () => {
        dieArray.push(new Die());
    });

    ROLL_ALL_BUTTON.addEventListener('click', rollAll);
    SUM_BUTTON.addEventListener('click', sum);

    document.body.insertBefore(ADD_BUTTON, dieContainer);
    document.body.insertBefore(SUM_BUTTON, dieContainer);
    document.body.insertBefore(ROLL_ALL_BUTTON, dieContainer);
});

interface IDie {
    value: number;
    div: HTMLDivElement;
    roll(): void;
    remove(): void;
}

class Die implements IDie {
    div: HTMLDivElement;
    value: number;

    constructor() {
        this.div = document.createElement('div');
        this.div.addEventListener('click', () => {
            this.roll();
        });
        this.div.addEventListener('dblclick', () => {
            this.remove();
        });
        this.roll();
        dieContainer.appendChild(this.div);
    }

    roll(): void {
        let randomNum: number = Math.floor(Math.random() * 6 + 1);
        this.value = randomNum;
        this.div.className = `dice dice-${randomNum}`;
    }

    remove(): void {
        dieArray.splice(dieArray.indexOf(this), 1);
        this.div.remove();
    }
}

const rollAll = (): void => {
    dieArray.forEach((die: IDie) => {
        die.roll();
    });
}

const sum = (): void => {
    let total = dieArray.reduce((acc: number, curr: IDie): Number => {
        return acc + curr.value;
    }, 0);

    alert(`the sum of all die values is ${total}`);
}

