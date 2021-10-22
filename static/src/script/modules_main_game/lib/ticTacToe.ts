import { MiniGame } from "./miniGame";

export class TicTacToe extends MiniGame {
    next_round: boolean;
    constructor() {
        super();
        this.initDom();
        this.next_round = false;
    }

    initDom() {
        super.initDom();
        let table = document.createElement("table"),
            container: any = document.getElementById("minigame"),
            td,
            tr,
            input_again = document.createElement("input"),
            input_cancel = document.createElement("input");
        this.createButton(input_again, "Заного", this.again);
        this.createButton(input_cancel, "Отмена", this.cancel);
        container.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            tr = document.createElement("tr");
            for (let j = 0; j < 3; j++) {
                td = document.createElement("td");
                td.addEventListener("click", this.choseTd);
                td.classList.add("game__block");
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        container.appendChild(table);
        container.appendChild(input_again);
        container.appendChild(input_cancel);
    }
}