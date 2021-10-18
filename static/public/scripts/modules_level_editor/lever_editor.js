var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "react", "./components/main_interface"], function (require, exports, React, main_interface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelEditor = void 0;
    var LevelEditor = (function (_super) {
        __extends(LevelEditor, _super);
        function LevelEditor(props) {
            var _this = _super.call(this, props) || this;
            _this.changeStateInterface = function (ev) {
                _this.setState({
                    is_open: !_this.state.is_open
                });
            };
            _this.state = {
                is_open: true
            };
            return _this;
        }
        LevelEditor.prototype.render = function () {
            return React.createElement("div", { className: "lever_editor_container" }, this.state.is_open ?
                React.createElement("img", { className: "lever_editor_container__image_build", onClick: this.changeStateInterface, src: './static/src/images/build.png' }) : React.createElement(main_interface_1.LEvelEditorInterface, null));
        };
        return LevelEditor;
    }(React.Component));
    exports.LevelEditor = LevelEditor;
});
