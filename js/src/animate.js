var DURATION = 2;
var SVG_NS = "http://www.w3.org/2000/svg";
var isDevelop = true;  // open this, you would watch animate defs including mask

var Animate = {
    onCompleteRemove: function(el){
        isDevelop ? null : el.remove && el.remove();
    },
    renderMask: function(svgEl, animateName, option){
        if (/\[object\sSVG/.test(Object.prototype.toString.call(svgEl))) {
            var opt = option || {},
                id = Math.random().toFixed(10).slice(-10),
                defsId = `defs_${animateName}_${id}`,
                maskId = `mask_${animateName}_${id}`,
                maskDefs = document.createElementNS(SVG_NS, 'defs');

            maskDefs.setAttribute("id", defsId);
            maskDefs.innerHTML = Mask[animateName](maskId, option.type);
            svgEl.parentNode.insertBefore(maskDefs, svgEl);
            svgEl.setAttribute("mask", `url(#${maskId})`);
        }
        return {maskId: maskId, maskDefs: maskDefs};
    },
    /**********************
     ** svgEl can be a svg element or its child element, like rect, circle etc.
     ** option is object contains direction and duration, maybe some properties later on.
     ***********************/
    blinds: function(svgEl, option) {
        var maskObj = this.renderMask(svgEl, 'blinds', option);
        option.type === "horizontal" ? TweenMax.fromTo(`#${maskObj.maskId} g`, option.duration, {
            scaleY: 0,
            transformOrigin: "0% 0%",
        }, {
            scaleY: 1.1,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        }) : TweenMax.fromTo(`#${maskObj.maskId} g`, option.duration, {
            scaleX: 0,
            transformOrigin: "0% 0%",
        }, {
            scaleX: 1.1,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        });
    },
    /**********************
     ** option direction: in|out
     ***********************/
    box: function(svgEl, option) {
        var maskObj = this.renderMask(svgEl, 'box', option);
        option.type === "in" ? TweenMax.fromTo(`#${maskObj.maskId} g.black`, option.duration, {
            scale: 1,
            transformOrigin: "50% 50%",
        }, {
            scale: 0,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        }) : TweenMax.fromTo(`#${maskObj.maskId} g`, option.duration, {
            scale: 0,
            transformOrigin: "50% 50%",
        }, {
            scale: 1,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        });
    },

    /**********************
     ** option direction: across|down
     ***********************/
    checkerboard: function(svgEl, option) {
        var maskObj = this.renderMask(svgEl, 'checkerboard', option);
        option.type === "across" ? TweenMax.fromTo(`#${maskObj.maskId} g`, option.duration, {
            scaleX: 0,
            scaleY: 1.001,
            transformOrigin: "0% 0%",
        }, {
            scaleX: 1.1,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        }) : TweenMax.fromTo(`#${maskObj.maskId} g`, option.duration, {
            scaleY: 0,
            scaleX: 1.001,
            transformOrigin: "50% 0%",
        }, {
            scaleY: 1.1,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        });
    },

    circle: function(svgEl, option) {
        var maskObj = this.renderMask(svgEl, 'circle', option);
        option.type === "in" ? TweenMax.fromTo(`#${maskObj.maskId} g.black`, option.duration, {
            scale: 1,
            transformOrigin: "50% 50%",
        }, {
            scale: 0,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        }) : TweenMax.fromTo(`#${maskObj.maskId} g`, option.duration, {
            scale: 0,
            transformOrigin: "50% 50%",
        }, {
            scale: 1,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        });
    },

    diamond: function(svgEl, option) {
        var maskObj = this.renderMask(svgEl, 'diamond', option);
        option.type === "in" ? TweenMax.fromTo(`#${maskObj.maskId} g.black`, option.duration, {
            scale: 2,
            transformOrigin: "50% 50%",
        }, {
            scale: 0,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        }) : TweenMax.fromTo(`#${maskObj.maskId} g`, option.duration, {
            scale: 0,
            transformOrigin: "50% 50%",
        }, {
            scale: 2,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        });
    },

    //fulfill delay
    dissolve: function(svgEl, option) {},

    fade: function(svgEl, option) {
        var maskObj = this.renderMask(svgEl, 'fade', option);
        TweenMax.fromTo(`#${maskObj.maskId} g`, option.duration, {
            opacity: 0
        }, {
            opacity: 1,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        });
    },

    /**********************
     ** option type: fromTop | fromBottom | fromLeft | fromRight
     ***********************/
    slide: function(svgEl, option) {
        var maskObj = this.renderMask(svgEl, 'slide', option);
        var fromX, toX, fromY, toY;
        switch(option.type){
            case "fromTop":
                fromX = 0, fromY = -1, toX = 0, toY = 0;
                break;
            case "fromBottom":
                fromX = 0, fromY = 1, toX = 0, toY = 0;
                break;
            case "fromLeft":
                fromX = -1, fromY = 0, toX = 0, toY = 0;
                break;
            case "fromRight":
                fromX = 1, fromY = 0, toX = 0, toY = 0;
                break;
            default: 
                fromX = 0, fromY = -1, toX = 0, toY = 0;
                break;
        }
        TweenMax.fromTo(`#${maskObj.maskId} g`, option.duration, {
            x: fromX,
            y: fromY
        }, {
            x: toX,
            y: toY,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        });
    },

    /**********************
     ** option type: in|out
     ***********************/
    plus: function(svgEl, option) {
        var maskObj = this.renderMask(svgEl, 'plus', option);
        option.type === "in" ? TweenMax.fromTo(`#${maskObj.maskId} .black.horizontal`, option.duration, {
            scaleX: 1,
            transformOrigin: "50% 50%",
        }, {
            scaleX: 0,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        }) && TweenMax.fromTo(`#${maskObj.maskId} .black.vertical`, option.duration, {
            scaleY: 1,
            transformOrigin: "50% 50%",
        }, {
            scaleY: 0,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        }) : TweenMax.fromTo(`#${maskObj.maskId} g.horizontal`, option.duration, {
            scaleX: 0,
            transformOrigin: "50% 50%",
        }, {
            scaleX: 1,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        }) && TweenMax.fromTo(`#${maskObj.maskId} g.vertical`, option.duration, {
            scaleY: 0,
            transformOrigin: "50% 50%",
        }, {
            scaleY: 1,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        })
    },

    /**********************
     ** option type: inVertical | inHorizontal | outVertical | outHorizontal
     ***********************/
    barn: function(svgEl, option) {
        var maskObj = this.renderMask(svgEl, 'barn', option);
        var fromX, toX, fromY, toY, g;
        switch(option.type){
            case "inVertical":
                fromX = 1, fromY = 1, toX = 0, toY = 1, g = ".black";
                break;
            case "inHorizontal":
                fromX = 1, fromY = 1, toX = 1, toY = 0, g = ".black";
                break;
            case "outVertical":
                fromX = 0, fromY = 1, toX = 1, toY = 1, g = "g";
                break;
            case "outHorizontal":
                fromX = 1, fromY = 0, toX = 1, toY = 1, g = "g";
                break;
            default: 
                fromX = 1, fromY = 1, toX = 0, toY = 1, g = ".black";
                break;
        }
        TweenMax.fromTo(`#${maskObj.maskId} ${g}`, option.duration, {
            scaleX: fromX,
            scaleY: fromY
        }, {
            scaleX: toX,
            scaleY: toY,
            transformOrigin: "50% 50%",
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        });
    },

    /********************** fulfill delay
     ** option type: horizontal | vertical
     ***********************/
    randomBars: function(svgEl, option) {},

    /**********************
     ** option type: downLeft | upLeft | downRight | upRight
     ***********************/
    strips: function(svgEl, option) {},

    wedge: function(svgEl, option) {},

    /**********************
     ** option slice: 1 ,2,3,4,8,
     ***********************/
    wheel: function(svgEl, option) {},

    /**********************
     ** option type: left | right | down | up
     ***********************/
    wipe: function(svgEl, option) {
        var maskObj = this.renderMask(svgEl, 'wipe', option);
        var fromX, toX, fromY, toY, tr;
        switch(option.type){
            case "left":
                [fromX, fromY, toX, toY, tr] = [1, 1, 0, 1, "0% 50%"];
                break;
            case "right":
                [fromX, fromY, toX, toY, tr] = [1, 1, 0, 1, "100% 50%"];
                break;
            case "down":
                [fromX, fromY, toX, toY, tr] = [1, 1, 1, 0, "50% 100%"];
                break;
            case "up":
                [fromX, fromY, toX, toY, tr] = [1, 1, 1, 0, "50% 0%"];
                break;
            default: 
                [fromX, fromY, toX, toY, tr] = [1, 1, 0, 1, "100% 50%"];
                break;
        }
        console.log(tr);
        TweenMax.fromTo(`#${maskObj.maskId} .black`, option.duration, {
            scaleX: fromX,
            scaleY: fromY
        }, {
            scaleX: toX,
            scaleY: toY,
            transformOrigin: tr,
            onComplete: this.onCompleteRemove(maskObj.maskDefs)
        });
    }
}