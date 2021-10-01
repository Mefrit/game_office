export class MiniGame {
    next_round: boolean;
    constructor() {
        // переписать потом по нормальному
        this.initDom();
        this.next_round = false;
    }
    initDom() {

        let table = document.createElement("table"),
            container: any = document.getElementById("minigame"),
            td,
            tr,
            input_again = document.createElement("input"),
            input_cancel = document.createElement("input");
        input_again.type = "button";
        input_again.value = "Заного";
        input_again.classList.add("game__again");
        input_again.addEventListener("click", this.again);
        // Fix Me если будет время переписать инициализацию кнопочек, тк непроффесионально
        input_cancel.type = "button";
        input_cancel.value = "Отмена";
        input_cancel.classList.add("game__again");
        input_cancel.addEventListener("click", this.cancel);
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
    again = () => {
        this.initDom();
    };
    cancel = () => {
        let container: any = document.getElementById("minigame");
        container.innerHTML = "";
    };
    choseTd = (ev) => {
        if (this.next_round) {
            ev.target.classList.add("game__block-round");
        } else {
            ev.target.classList.add("game__block-cross");
        }
        this.next_round = !this.next_round;
    };
}
