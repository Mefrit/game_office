define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Person1 = void 0;
    var Person1 = (function () {
        function Person1(person) {
            this.person = person;
            this.x = person.x;
            this.y = person.y;
            this.moveAction = false;
            this.domPerson = undefined;
            this.animation = [];
            this.coordPrevPoint = {};
            this.image = undefined;
            this.interval_animation;
        }
        Person1.prototype.initDomPerson = function (domPerson) {
            this.domPerson = domPerson;
        };
        Person1.prototype.randomInteger = function (min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        };
        Person1.prototype.getDoomObj = function () {
            return this.domPerson;
        };
        Person1.prototype.setAnimation = function (name, animation) {
            this.animation[name] = animation;
        };
        Person1.prototype.getAnimation = function (name) {
            return this.animation[name];
        };
        Person1.prototype.playAnimation = function (name) {
            this.animation[name].play();
        };
        Person1.prototype.stopAnimation = function (name) {
            this.animation[name].stop();
        };
        Person1.prototype.initImage = function (image) {
            this.image = image;
        };
        Person1.prototype.setHealth = function (value) {
            this.person.health = parseInt(value);
        };
        Person1.prototype.isArchers = function (unit) {
            return this.person.class == "archer";
        };
        Person1.prototype.getHealth = function () {
            return parseInt(this.person.health);
        };
        Person1.prototype.getUrl = function () {
            return this.person.url;
        };
        Person1.prototype.isNotDied = function () {
            return this.person.health <= 12;
        };
        Person1.prototype.getId = function () {
            return this.person.id;
        };
        Person1.prototype.getKind = function () {
            return this.person.evil;
        };
        Person1.prototype.removePrevPoint = function () {
            this.coordPrevPoint = {};
        };
        Person1.prototype.setCoord = function (x, y) {
            this.person.x = x;
            this.person.y = y;
            this.x = x;
            this.y = y;
            this.moveAction = true;
            this.coordPrevPoint = { x: x, y: y };
        };
        Person1.prototype.getX = function () {
            return parseFloat(this.x);
        };
        Person1.prototype.getY = function () {
            return parseFloat(this.y);
        };
        Person1.prototype.getHeight = function () {
            return parseFloat(this.person.height);
        };
        Person1.prototype.getWidth = function () {
            return parseFloat(this.person.width);
        };
        Person1.prototype.getMoveAction = function () {
            return this.moveAction;
        };
        Person1.prototype.setMoveAction = function (value) {
            this.moveAction = value;
        };
        return Person1;
    }());
    exports.Person1 = Person1;
});
