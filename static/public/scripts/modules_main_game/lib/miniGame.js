define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MiniGame = void 0;
    var MiniGame = (function () {
        function MiniGame() {
            var _this = this;
            this.again = function () {
                _this.initDom();
            };
            this.cancel = function () {
                var container = document.getElementById("minigame");
                container.innerHTML = "";
            };
            this.choseTd = function (ev) {
                if (_this.next_round) {
                    ev.target.classList.add("game__block-round");
                }
                else {
                    ev.target.classList.add("game__block-cross");
                }
                _this.next_round = !_this.next_round;
            };
            this.initDom();
            this.next_round = false;
        }
        MiniGame.prototype.initDom = function () {
            var table = document.createElement("table"), container = document.getElementById("minigame"), td, tr, input_again = document.createElement("input"), input_cancel = document.createElement("input");
            input_again.type = "button";
            input_again.value = "Заного";
            input_again.classList.add("game__again");
            input_again.addEventListener("click", this.again);
            input_cancel.type = "button";
            input_cancel.value = "Отмена";
            input_cancel.classList.add("game__again");
            input_cancel.addEventListener("click", this.cancel);
            container.innerHTML = "";
            for (var i = 0; i < 3; i++) {
                tr = document.createElement("tr");
                for (var j = 0; j < 3; j++) {
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
        };
        return MiniGame;
    }());
    exports.MiniGame = MiniGame;
});
