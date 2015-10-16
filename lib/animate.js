var DURATION = 2;
var SLICE = 6;
var SVG_NS = "http://www.w3.org/2000/svg";

var Animate = {
    /**********************
    ** svgEl can be a svg element or its child element, like rect, circle etc.
    ** option is object contains direction and duration, maybe some properties later on.
    ***********************/
    blinds: function(svgEl, option){
        var opt = option || {};
        var direction = opt.direction ? opt.direction : "horizontal";
        var duration = opt.duration ? opt.duration : DURATION;
        var mask_id_flag = "mask_blinds_";
        if(/\[object\sSVG/.test(Object.prototype.toString.call(svgEl))){
            var svgHeight = svgEl.getBBox().height;
            var svgWidth = svgEl.getBBox().width;
            var maskId = mask_id_flag + Math.random().toFixed(10).slice(-10),
                mx = svgEl.getBBox().x,
                my = svgEl.getBBox().y,
                mask = "<mask id='"+ maskId +"' width='"+svgWidth+"' height='"+svgHeight+"'>",
                maskDefs = document.createElementNS(SVG_NS, 'defs'),
                cnt = 0, 
                dx, dy, px, py;
            if(direction == "horizontal"){
                dy = svgHeight / SLICE;
                while(cnt++<SLICE){
                    py = (cnt-1) * dy;
                    mask += "<rect x='"+mx+"' y='"+(my+py)+"' width='"+svgWidth+"' height='0' style='stroke: #ffffff;fill:#ffffff'></rect>";
                }
            }else{
                dx = svgWidth / SLICE;
                while(cnt++<SLICE){
                    px = (cnt-1) * dx;
                    mask += "<rect x='"+(mx+px)+"' y='"+my+"' width='0' height='"+svgHeight+"' style='stroke: #ffffff;fill:#ffffff'></rect>";
                }
            }
            mask += "</mask>";
            maskDefs.innerHTML = mask;
            [].forEach.call(svgEl.parentNode.querySelectorAll("[id*='"+mask_id_flag+"']"), function(m){
                m.parentNode.remove();
            });
            svgEl.parentNode.insertBefore(maskDefs, svgEl);
            svgEl.setAttribute("mask", "url(#"+maskId+")");
            direction == "horizontal" ? TweenMax.to("#" + maskId + " rect", duration, {height: dy}) : TweenMax.to("#" + maskId + " rect", duration, {width: dx});
        }
    }
}