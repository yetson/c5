;(function(){
    var SVG_NS = "http://www.w3.org/2000/svg",
        shape_form = document.getElementById("svg-shape"),
        style_form = document.getElementById("svg-style"),
        color_form = document.getElementById("svg-color"),
        transform_form = document.getElementById("svg-transform"),
        canvas = document.querySelector("#canvas"),
        color_fill = document.getElementById("color-fill"),
        color_stroke = document.getElementById("color-stroke"),
        remove = document.getElementById("remove"),
        run = document.getElementById("run"),
        curShape = null;

    var shapeInfo = {
        "line": {x1: "200", y1: "300", x2: "400", y2: "300"},
        "rect": {x: "200", y: "250", width: "200", height: "100"},
        "circle": {cx: "300", cy: "300", r: "50"},
        "ellipse": {cx: "300", cy: "300", rx: "100", ry: "50"},
        "path": {x: "100", y: "100", d: "M171,145 L118,251 L186,167 L221,331 L185,365 L171,145z"}
    };

    var defaultAttr = {
        stroke: "#000000",
        fill: "#0000ff"
    };

    var animateInfo = {
        blinds:{name: "百叶窗", type: ["horizontal", "vertical"]},
        box:{name: "盒状", type: ["in", "out"]},
        checkerboard:{name: "棋盘", type: ["across", "down"]},
        circle:{name: "圆形扩展", type: ["in", "out"]},
        diamond:{name: "菱形", type: ["in", "out"]},
        dissolve:{name: "向内溶解", type: []},
        fade:{name: "淡出", type: []},
        slide:{name: "飞入", type: ["fromTop", "fromBottom", "fromLeft", "fromRight"]},
        plus:{name: "十字形扩展", type: ["in", "out"]},
        barn:{name: "劈裂", type: ["inVertical", "inHorizontal", "outVertical", "outHorizontal"]},
        randomBars:{name: "随机线条", type: []},
        strips:{name: "阶梯状", type: ["downLeft", "upLeft", "downRight", "upRight"]},
        wedge:{name: "楔入", type: []},
        wheel:{name: "轮子", type: [1,2,3,4,8]},
        wipe:{name: "擦除", type: ["right", "left", "down", "up"]}
    };

    var svg = createSVG();
    createAnimate();

    shape_form.addEventListener('click', function(e){
        if(e.target.tagName.toLowerCase() == "button"){
            createShape(e.target.value);
        }
        e.preventDefault();
    });

    [style_form, color_form, transform_form].forEach(function(f){
        f.addEventListener('input', function(e){
            if(e.target.tagName.toLowerCase() == "input"){
                e.target.nextSibling.textContent = e.target.value;
                if(!curShape) return;
                if(f == transform_form){
                    curShape.setAttribute('transform', getTransform());
                }else{
                    curShape.setAttribute(e.target.getAttribute('name'), e.target.value);
                }
            }
            e.preventDefault();
        });
    });

    svg.addEventListener('click', function(e){
        if(e.target.tagName.toLowerCase() in shapeInfo){
            select(e.target);
        }
    });
    remove.addEventListener('click', function(e){
        curShape.parentNode.remove();
        e.preventDefault();
    });
    run.addEventListener('click', function(e){
        if(curShape){
            var eff = document.getElementById("animateEffect").value;
            var type = document.getElementById("animateType").value;
            var dur = document.getElementById("duration").value;
            Animate[eff](curShape, {type: type, duration: dur});
        }
        e.preventDefault();
    });

    function createStyleForm(shapeName){
        style_form.innerHTML = "<h2>样式</h2>";
        for (var a in shapeInfo[shapeName]){
            var p = document.createElement('p');
            p.innerHTML = "<label for=''>"+a+"&nbsp;</label><input name='"+a+"' type='range' min='0' max='600'><label name='result'></label>";
            style_form.appendChild(p);
        }
    }

    function createSVG(){
        var svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        //svg.setAttribute("viewBox", "0 0 600 600");
        //svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        canvas.appendChild(svg);
        svg.addEventListener("click", function(e){
            if(e.target.tagName.toLowerCase() in shapeInfo){
                select(e.target);
            }
        });
        return svg;
    }

    function createAnimate(){
        var effect = document.querySelector("#animateEffect");
        var type = document.querySelector("#animateType");
        var options = "", i;
        for(i in animateInfo){
             options += `<option value="${i}">${animateInfo[i].name}</option>`;
        }
        effect.innerHTML = options;
        type.innerHTML = animateInfo[effect[0].value].type.map(function(t){
            return `<option value="${t}">${t}</option>`;
        }).join("");
        effect.addEventListener("input", function(e){
            var opts = "", i;
            animateInfo[effect.value].type.forEach(function(t){
                opts += `<option value="${t}">${t}</option>`;
            });
            type.innerHTML = opts;
            run.click();
        });
        type.addEventListener("input", function(e){
            run.click();
        });
    }

    function createShape(shapeName){
        var sp = document.createElementNS(SVG_NS, shapeName);
        var svgEl = document.createElementNS(SVG_NS, 'g');
        // svgEl.setAttribute("width", "100%");
        // svgEl.setAttribute("height", "100%");
        for(var attr in shapeInfo[shapeName]){
            sp.setAttribute(attr, shapeInfo[shapeName][attr]);
        }
        sp.setAttribute("fill", defaultAttr.fill);
        sp.setAttribute("stroke", defaultAttr.stroke);
        svgEl.appendChild(sp);
        svg.appendChild(svgEl);
        createStyleForm(shapeName);
        select(sp);
    }
    function select(shape){
        curShape = shape;
        createStyleForm(shape.tagName);
        updateSet(shape);
    }
    function updateSet(shape){
        [].map.call(document.querySelector(".left-nav").getElementsByTagName("input"), function(i){
            var name = i.getAttribute('name');
            i.value = shape.getAttribute(name) || decodeTransform(shape)[name];
            i.nextSibling.textContent = shape.getAttribute(name) || decodeTransform(shape)[name];
        });
    }
    function getTransform(){
        var tx = transform_form.querySelector("[name='translateX']").value;
        var ty = transform_form.querySelector("[name='translateY']").value;
        var rotate = transform_form.querySelector("[name='rotate']").value;
        var scale = transform_form.querySelector("[name='scale']").value;
        return "translate(" + tx + "," + ty + ")" + " rotate(" + rotate + ") " + "scale(" + scale + ")";
    }
    function decodeTransform(shape){
        var trf = shape.getAttribute("transform") || "translate(0,0) rotate(0) scale(1)";
        var match = trf.match(/^translate\((\d+),(\d+)\)\srotate\((\d+)\)\sscale\((\d+)\)$/);
        return {
            translateX: match[1],
            translateY: match[2],
            rotate: match[3],
            scale: match[4]
        }
    }
})();