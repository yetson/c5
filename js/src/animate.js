var DURATION = 2;
var SVG_NS = "http://www.w3.org/2000/svg";

var Animate = {
    /**********************
     ** svgEl can be a svg element or its child element, like rect, circle etc.
     ** option is object contains direction and duration, maybe some properties later on.
     ***********************/
    blinds: function(svgEl, option) {
        var opt = option || {};
        var SLICE = 6;
        var direction = opt.type ? opt.type : "horizontal";
        var duration = opt.duration ? opt.duration : DURATION;
        var mask_id_flag = "mask_blinds_";
        var defs_id_flag = "defs_blinds_";
        if (/\[object\sSVG/.test(Object.prototype.toString.call(svgEl))) {
            var svgHeight = svgEl.getBBox().height,
                svgWidth = svgEl.getBBox().width,
                id = Math.random().toFixed(10).slice(-10),
                maskId = mask_id_flag + id,
                mask = `<mask id='${maskId}' width='${svgWidth}' height='${svgHeight}'>`,
                maskDefs = document.createElementNS(SVG_NS, 'defs'),
                isH = direction == "horizontal",
                mx = svgEl.getBBox().x,
                my = svgEl.getBBox().y,
                dy = svgHeight / SLICE,
                dx = svgWidth / SLICE,
                cnt = 0,
                px, py;
            mask += `<linearGradient id="gradient_${id}" ${isH ? 'x1="0%" y1="0%" x2="0%" y2="100%"' : 'x1="0%" y1="0%" x2="100%" y2="0%"'} spreadMethod="pad">
                <stop offset="0%"   stop-color="#ffffff" stop-opacity="1"/>
                <stop offset="90%"  stop-color="#ffffff" stop-opacity="1"/>
                <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
              </linearGradient>`
            if (isH) {
                while (cnt++ < SLICE) {
                    py = (cnt - 1) * dy;
                    mask += `<rect x='${mx}' y='${my+py}' width='${svgWidth}' height='0' style='stroke: #none;fill:url(#gradient_${id})'></rect>`;
                }
            } else {
                while (cnt++ < SLICE) {
                    px = (cnt - 1) * dx;
                    mask += `<rect x='${mx+px}' y='${my}' width='0' height='${svgHeight}' style='stroke: #none;fill:url(#gradient_${id})'></rect>`;
                }
            }
            mask += "</mask>";
            maskDefs.setAttribute("id", defs_id_flag + id);
            maskDefs.innerHTML = mask;
            svgEl.parentNode.insertBefore(maskDefs, svgEl);
            svgEl.setAttribute("mask", `url(#${maskId})`);

            isH ? TweenMax.fromTo(`#${maskId} rect`, duration, {
                height: dy*1.2,
                scaleY: 0
            }, {
                scaleY: 1,
                transformOrigin: "0% 0%",
                onComplete: function(){
                    svgEl.parentNode.querySelector("#"+defs_id_flag + id).remove();
                }
            }) : TweenMax.fromTo(`#${maskId} rect`, duration, {
                width: dx*1.2,
                scaleX: 0
            }, {
                scaleX: 1,
                transformOrigin: "0% 0%",
                onComplete: function(){
                    svgEl.parentNode.querySelector("#"+defs_id_flag + id).remove();
                }
            });
        }
    },
    /**********************
     ** option direction: in|out
     ***********************/
    box: function(svgEl, option) {
        var opt = option || {};
        var direction = opt.direction ? opt.direction : "in";
        var duration = opt.duration ? opt.duration : DURATION;
        var mask_id_flag = "mask_box_";
        var defs_id_flag = "defs_box_";
        if (/\[object\sSVG/.test(Object.prototype.toString.call(svgEl))) {
            var svgHeight = svgEl.getBBox().height,
                svgWidth = svgEl.getBBox().width,
                id = Math.random().toFixed(10).slice(-10),
                maskId = mask_id_flag + id,
                mask = `<mask id='${maskId}' width='${svgWidth}' height='${svgHeight}'>`,
                maskDefs = document.createElementNS(SVG_NS, 'defs'),
                isH = direction == "horizontal",
                mx = svgEl.getBBox().x + svgWidth / 2,
                my = svgEl.getBBox().y + svgHeight / 2,
                px, py;
            mask += `<linearGradient id="gradient_${id}" ${isH ? 'x1="0%" y1="0%" x2="0%" y2="100%"' : 'x1="0%" y1="0%" x2="100%" y2="0%"'} spreadMethod="pad">
                <stop offset="0%"   stop-color="#ffffff" stop-opacity="1"/>
                <stop offset="90%"  stop-color="#ffffff" stop-opacity="1"/>
                <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
              </linearGradient>`
            if (isH) {
                mask += `<rect x='${mx}' y='${my}' width='${svgWidth}' height='${svgHeight}' style='stroke: #none;fill:url(#gradient_${id})'></rect>`;
            } else {
                mask += `<rect x='${mx}' y='${my}' width='${svgWidth}' height='${svgHeight}' style='stroke: #none;fill:url(#gradient_${id})'></rect>`;
            }
            mask += "</mask>";
            maskDefs.setAttribute("id", defs_id_flag + id);
            maskDefs.innerHTML = mask;
            svgEl.parentNode.insertBefore(maskDefs, svgEl);
            svgEl.setAttribute("mask", `url(#${maskId})`);

            isH ? TweenMax.fromTo(`#${maskId} rect`, duration, {
                height: dy*1.2,
                scaleY: 0
            }, {
                scaleY: 1,
                transformOrigin: "50% 50%",
                onComplete: function(){
                    svgEl.parentNode.querySelector("#"+defs_id_flag + id).remove();
                }
            }) : TweenMax.fromTo(`#${maskId} rect`, duration, {
                width: dx*1.2,
                scaleX: 0
            }, {
                scaleX: 1,
                transformOrigin: "50% 50%",
                onComplete: function(){
                    svgEl.parentNode.querySelector("#"+defs_id_flag + id).remove();
                }
            });
        }
    },

    /**********************
     ** option direction: across|down
     ***********************/
    checkerboard: function(svgEl, option) {},

    circle: function(svgEl, option) {},

    diamond: function(svgEl, option) {},

    //fulfill delay
    diamond: function(svgEl, option) {},

    fade: function(svgEl, option) {},

    /**********************
     ** option direction: fromTop | fromBottom | fromLeft | fromRight
     ***********************/
    slide: function(svgEl, option) {},

    /**********************
     ** option direction: in|out
     ***********************/
    plus: function(svgEl, option) {},

    /**********************
     ** option direction: inVertical | inHorizontal | outVertical | outHorizontal
     ***********************/
    barn: function(svgEl, option) {},

    /********************** fulfill delay
     ** option direction: horizontal | vertical
     ***********************/
    randomBars: function(svgEl, option) {},

    /**********************
     ** option direction: downLeft | upLeft | downRight | upRight
     ***********************/
    strips: function(svgEl, option) {},

    wedge: function(svgEl, option) {},

    /**********************
     ** option slice: 1 ,2,3,4,8,
     ***********************/
    wheel: function(svgEl, option) {},

    /**********************
     ** option direction: left | down | up
     ***********************/
    wipe: function(svgEl, option) {}
}