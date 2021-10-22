
export class MiniGame {
    next_round: boolean;
    constructor() {
        this.next_round = false;
    }
    
    initDom() {
        let game = document.getElementById('minigame');
        if (!game?.classList.contains('container_game_start')) {
            game?.classList.toggle('container_game_start');
        }
    }

    again = () => {
        this.initDom();
    };

    cancel = () => {
        let container: any = document.getElementById("minigame");
        container.classList.toggle('container_game_start');
        container.innerHTML = "";
    };

    createCanvas() {
        let canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 450;
        canvas.id = "canvas";
        canvas.style.cssText = "width: 300px; height: 450px;";
        return canvas;
    }

    createButton(element, name, event) {
        element.type = "button";
        element.value = name;
        element.classList.add("game__again");
        element.addEventListener("click", event);
    }

    choseTd = (ev) => {
        if (this.next_round) {
            ev.target.classList.add("game__block-round");
        } else {
            ev.target.classList.add("game__block-cross");
        }
        this.next_round = !this.next_round;
    };
}
