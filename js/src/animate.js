var DURATION = 2;
var SVG_NS = "http://www.w3.org/2000/svg";
var isDevelop = true;  // open this, you would watch animate defs including mask

var Animate = {
    onComplete: function(defEl){
        isDevelop ? null : defEl.remove && defEl.remove();
    },

    /**********************
     ** svgEl can be a svg element or its child element, like rect, circle etc.
     ** option is object contains direction and duration, maybe some properties later on.
     ***********************/
    blinds: function(svgEl, option) {
        var opt = option || {};
        var SLICE = 6;
        var type = opt.type ? opt.type : "horizontal";
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
                isH = type == "horizontal",
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
                onComplete: this.onComplete(svgEl.parentNode.querySelector("#"+defs_id_flag + id))
            }) : TweenMax.fromTo(`#${maskId} rect`, duration, {
                width: dx*1.2,
                scaleX: 0
            }, {
                scaleX: 1,
                transformOrigin: "0% 0%",
                onComplete: this.onComplete(svgEl.parentNode.querySelector("#"+defs_id_flag + id))
            });
        }
    },
    /**********************
     ** option direction: in|out
     ***********************/
    box: function(svgEl, option) {
        var opt = option || {};
        var type = opt.type ? opt.type : "in";
        var duration = opt.duration ? opt.duration : DURATION;
        var mask_id_flag = "mask_box_";
        var defs_id_flag = "defs_box_";
        if (/\[object\sSVG/.test(Object.prototype.toString.call(svgEl))) {
            var svgHeight = svgEl.getBBox().height,
                svgWidth = svgEl.getBBox().width,
                id = Math.random().toFixed(10).slice(-10),
                maskId = mask_id_flag + id,
                mask = `<mask id='${maskId}'>`,
                maskDefs = document.createElementNS(SVG_NS, 'defs'),
                isIn = type == "in",
                mx = svgEl.getBBox().x,
                my = svgEl.getBBox().y,
                px, py;
            // mask += `<linearGradient id="gradient_${id}" ${isIn ? 'x1="0%" y1="0%" x2="0%" y2="100%"' : 'x1="0%" y1="0%" x2="100%" y2="0%"'} spreadMethod="pad">
            //     <stop offset="0%"   stop-color="#ffffff" stop-opacity="1"/>
            //     <stop offset="90%"  stop-color="#ffffff" stop-opacity="1"/>
            //     <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
            //   </linearGradient>`;
            //mask += `<rect x='${mx}' y='${my}' width='${svgWidth}' height='${svgHeight}' style='stroke: #none;fill:url(#gradient_${id})'></rect>`;
            mask += `<rect x='${mx}' y='${my}' width='${svgWidth}' height='${svgHeight}' style='stroke: #none;fill:#ffffff'></rect>
                ${isIn ? `<rect class='black' x='${mx}' y='${my}' width='${svgWidth}' height='${svgHeight}' style='stroke: #none;fill:#000000'></rect>` : ""}`;
            mask += "</mask>";
            maskDefs.setAttribute("id", defs_id_flag + id);
            maskDefs.innerHTML = mask;
            svgEl.parentNode.insertBefore(maskDefs, svgEl);
            svgEl.setAttribute("mask", `url(#${maskId})`);

            isIn ? TweenMax.fromTo(`#${maskId} rect.black`, duration, {
                scale: 1,
            }, {
                scale: 0,
                transformOrigin: "50% 50%",
                onComplete: this.onComplete(svgEl.parentNode.querySelector("#"+defs_id_flag + id))
            }) : TweenMax.fromTo(`#${maskId} rect`, duration, {
                scale: 0
            }, {
                scale: 1,
                transformOrigin: "50% 50%",
                onComplete: this.onComplete(svgEl.parentNode.querySelector("#"+defs_id_flag + id))
            });
        }
    },

    /**********************
     ** option direction: across|down
     ***********************/
    checkerboard: function(svgEl, option) {},

    circle: function(svgEl, option) {
        var opt = option || {};
        var type = opt.type ? opt.type : "out";
        var duration = opt.duration ? opt.duration : DURATION;
        var mask_id_flag = "mask_circle_";
        var defs_id_flag = "defs_circle_";
        if (/\[object\sSVG/.test(Object.prototype.toString.call(svgEl))) {
            var svgHeight = svgEl.getBBox().height,
                svgWidth = svgEl.getBBox().width,
                id = Math.random().toFixed(10).slice(-10),
                maskId = mask_id_flag + id,
                mask = `<mask id='${maskId}'>`,
                maskDefs = document.createElementNS(SVG_NS, 'defs'),
                mx = svgEl.getBBox().x + svgWidth / 2,
                my = svgEl.getBBox().y + svgHeight / 2,
                r = Math.hypot(svgHeight / 2, svgWidth / 2),
                isIn = type == "in",
                px, py;
            // mask += `<linearGradient id="gradient_${id}" ${isIn ? 'x1="0%" y1="0%" x2="0%" y2="100%"' : 'x1="0%" y1="0%" x2="100%" y2="0%"'} spreadMethod="pad">
            //     <stop offset="0%"   stop-color="#ffffff" stop-opacity="1"/>
            //     <stop offset="90%"  stop-color="#ffffff" stop-opacity="1"/>
            //     <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
            //   </linearGradient>`;
            //mask += `<rect x='${mx}' y='${my}' width='${svgWidth}' height='${svgHeight}' style='stroke: #none;fill:url(#gradient_${id})'></rect>`;
            mask += `<ellipse cx='${mx}' cy='${my}' rx='${Math.sqrt(2) * svgWidth/2}' ry='${Math.sqrt(2)*svgHeight/2}' fill="#ffffff"></ellipse>
            ${isIn ? `<ellipse class='black' cx='${mx}' cy='${my}' rx='${Math.sqrt(2) * svgWidth/2}' ry='${Math.sqrt(2)*svgHeight/2}' fill="#000000"></ellipse>` : ""}`;
            mask += "</mask>";
            maskDefs.setAttribute("id", defs_id_flag + id);
            maskDefs.innerHTML = mask;
            svgEl.parentNode.insertBefore(maskDefs, svgEl);
            svgEl.setAttribute("mask", `url(#${maskId})`);

            isIn ? TweenMax.fromTo(`#${maskId} ellipse.black`, duration, {
                scale: 1
            }, {
                scale: 0,
                transformOrigin: "50% 50%",
                onComplete: this.onComplete(svgEl.parentNode.querySelector("#"+defs_id_flag + id))
            }) : TweenMax.fromTo(`#${maskId} ellipse`, duration, {
                scale: 0
            }, {
                scale: 1,
                transformOrigin: "50% 50%",
                onComplete: this.onComplete(svgEl.parentNode.querySelector("#"+defs_id_flag + id))
            });
        }
    },

    diamond: function(svgEl, option) {
        var opt = option || {};
        var type = opt.type ? opt.type : "in";
        var duration = opt.duration ? opt.duration : DURATION;
        var mask_id_flag = "mask_diamond_";
        var defs_id_flag = "defs_diamond_";
        if (/\[object\sSVG/.test(Object.prototype.toString.call(svgEl))) {
            var svgHeight = svgEl.getBBox().height,
                svgWidth = svgEl.getBBox().width,
                id = Math.random().toFixed(10).slice(-10),
                maskId = mask_id_flag + id,
                mask = `<mask id='${maskId}'>`,
                maskDefs = document.createElementNS(SVG_NS, 'defs'),
                mx = svgEl.getBBox().x + svgWidth / 2,
                my = svgEl.getBBox().y + svgHeight / 2,
                r = Math.hypot(svgHeight / 2, svgWidth / 2),
                isIn = type == "in",
                px, py;
            // mask += `<linearGradient id="gradient_${id}" ${isIn ? 'x1="0%" y1="0%" x2="0%" y2="100%"' : 'x1="0%" y1="0%" x2="100%" y2="0%"'} spreadMethod="pad">
            //     <stop offset="0%"   stop-color="#ffffff" stop-opacity="1"/>
            //     <stop offset="90%"  stop-color="#ffffff" stop-opacity="1"/>
            //     <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
            //   </linearGradient>`;
            //mask += `<rect x='${mx}' y='${my}' width='${svgWidth}' height='${svgHeight}' style='stroke: #none;fill:url(#gradient_${id})'></rect>`;
            mask += `<path d="M${mx},${my} l0,${0-svgHeight} l${svgWidth},${svgHeight} l${0-svgWidth},${svgHeight} l${0-svgWidth},${0-svgHeight} l${svgWidth},${0-svgHeight}z" fill="#ffffff"></path>
            ${isIn ? `<path class="black" d="M${mx},${my-svgHeight} l${svgWidth},${svgHeight} l${0-svgWidth},${svgHeight} l${0-svgWidth},${0-svgHeight} l${svgWidth},${0-svgHeight}z" fill="#000000"></path>` : ""}`;
            mask += "</mask>";
            maskDefs.setAttribute("id", defs_id_flag + id);
            maskDefs.innerHTML = mask;
            svgEl.parentNode.insertBefore(maskDefs, svgEl);
            svgEl.setAttribute("mask", `url(#${maskId})`);

            isIn ? TweenMax.fromTo(`#${maskId} path.black`, duration, {
                scale: 1
            }, {
                scale: 0,
                transformOrigin: "50% 50%",
                onComplete: this.onComplete(svgEl.parentNode.querySelector("#"+defs_id_flag + id))
            }) : TweenMax.fromTo(`#${maskId} path`, duration, {
                scale: 0
            }, {
                scale: 1,
                transformOrigin: "50% 50%",
                onComplete: this.onComplete(svgEl.parentNode.querySelector("#"+defs_id_flag + id))
            });
        }
    },

    //fulfill delay
    dissolve: function(svgEl, option) {},

    fade: function(svgEl, option) {
        var opt = option || {};
        var mask_id_flag = "mask_fade_";
        var defs_id_flag = "defs_fade_";
        if (/\[object\sSVG/.test(Object.prototype.toString.call(svgEl))) {
            var svgHeight = svgEl.getBBox().height,
                svgWidth = svgEl.getBBox().width,
                id = Math.random().toFixed(10).slice(-10),
                maskId = mask_id_flag + id,
                mask = `<mask id='${maskId}'>`,
                maskDefs = document.createElementNS(SVG_NS, 'defs'),
                mx = svgEl.getBBox().x,
                my = svgEl.getBBox().y;

            mask += `<rect x='${mx}' y='${my}' width='${svgWidth}' height='${svgHeight}' style='stroke: #none;fill:#ffffff'></rect>`;
            mask += "</mask>";
            maskDefs.setAttribute("id", defs_id_flag + id);
            maskDefs.innerHTML = mask;
            svgEl.parentNode.insertBefore(maskDefs, svgEl);
            svgEl.setAttribute("mask", `url(#${maskId})`);

            TweenMax.fromTo(`#${maskId} rect`, duration, {
                opacity: 0
            }, {
                opacity: 1,
                onComplete: this.onComplete(svgEl.parentNode.querySelector("#"+defs_id_flag + id))
            });
        }
    },

    /**********************
     ** option direction: fromTop | fromBottom | fromLeft | fromRight
     ***********************/
    slide: function(svgEl, option) {
        var opt = option || {};
        var duration = opt.duration ? opt.duration : DURATION;
        var type = opt.type ? opt.type : "fromTop";
        if (/\[object\sSVG/.test(Object.prototype.toString.call(svgEl))) {
            var svgHeight = svgEl.getBBox().height,
                svgWidth = svgEl.getBBox().width,
                mx = svgEl.getBBox().x,
                my = svgEl.getBBox().y,
                bc = svgEl.getBoundingClientRect(),
                fx, fy;
            switch(type){
                case "fromTop":
                    fx = mx;
                    fy = 0 - svgHeight;
                    break;
                case "fromBottom": 
                    fx = mx;
                    fy = bc.bottom + svgHeight;
                    break;
                case "fromLeft":
                    fx = 0 - svgWidth;
                    fy = my;
                    break;
                case "fromRight": 
                    fx = bc.right + svgWidth;
                    fy = my;
                    break;
            }
            
            TweenMax.fromTo(svgEl, duration, { 
                attr: {
                    x: fx,
                    y: fy
                }, 

            }, {
                attr:{
                    x: mx,
                    y: my
                }
            });
        }
    },

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