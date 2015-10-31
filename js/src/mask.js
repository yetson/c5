var Mask = {
    wrapper: function(id, maskShape){
        return `<mask id='${id}' maskUnits="objectBoundingBox" x='0' y='0' width='1' height='1' maskContentUnits='objectBoundingBox'>
                ${maskShape}
            </g>
        </mask>`;
    },
    blinds: function(id, type){
        var SLICE = 6;
        var cnt = 0, g = "", px = 0, py = 0, delt = 1/SLICE;
        if(type==="horizontal"){
            while(cnt++ < SLICE){
                py = (cnt-1) * delt;
                g += `<g><rect x='${px}' y='${py}' width='1' height='${delt}' fill='#ffffff'></rect></g>`
            }
        }else{
            while(cnt++ < SLICE){
                px = (cnt-1) * delt;
                g += `<g><rect x='${px}' y='${py}' width='${delt}' height='1' fill='#ffffff'></rect></g>`
            }
        }
        return this.wrapper(id, g);
    },
    box: function(id, type){
        var g = type==="in" ? 
        `<g><rect x='0' y='0' width='1' height='1' fill="#ffffff"></rect></g>
         <g class="black"><rect x='0' y='0' width='1' height='1' fill="#000000"></rect></g>`
         : 
        `<g><rect x='0' y='0' width='1' height='1' fill="#ffffff"></rect></g>`;
        return this.wrapper(id, g);
    },
    checkerboard: function(id, type){
        var SLICE = 4;
        var i = 0, j = 0, g = "", delt = 1/SLICE;
        if(type==="across"){
            for(;i<SLICE;i++){
                if(i%2){
                    for(j=-1;j<SLICE;j++){
                        g += `<g><rect row='${i}' col='${j}' x='${(j+0.5)*delt}' y='${i*delt}' width='${delt}' height='${delt}' fill='#ffffff'></rect></g>`
                    }
                }else{
                    for(j=0;j<SLICE;j++){
                        g += `<g><rect row='${i}' col='${j}' x='${j*delt}' y='${i*delt}' width='${delt}' height='${delt}' fill='#ffffff'></rect></g>`
                    }
                }
            }
        }else{
            for(;i<SLICE;i++){
                if(i%2){
                    for(j=-1;j<SLICE;j++){
                        g += `<g><rect row='${j}' col='${i}' x='${i*delt}' y='${(j+0.5)*delt}' width='${delt}' height='${delt}' fill='#ffffff'></rect></g>`
                    }
                }else{
                    for(j=0;j<SLICE;j++){
                        g += `<g><rect row='${j}' col='${i}' x='${i*delt}' y='${j*delt}' width='${delt}' height='${delt}' fill='#ffffff'></rect></g>`
                    }
                }
            }
        }
        return this.wrapper(id, g);
    },
    circle: function(id, type){
        var g = type==="in" ? 
        `<g><ellipse cx="0.5" cy="0.5" rx="0.71" ry="0.71" fill="#ffffff"></ellipse></g>
         <g class="black"><ellipse cx="0.5" cy="0.5" rx="0.71" ry="0.71" fill="#000000"></ellipse></g>`
         : 
        `<g><ellipse cx="0.5" cy="0.5" rx="0.71" ry="0.71" fill="#ffffff"></ellipse>;</g>`;
        return this.wrapper(id, g);
    },
    diamond: function(id, type){
        var g = type==="in" ? 
        `<g><rect x="0" y="0" width="1" height="1" fill="#ffffff"></rect></g>
         <g class="black"><path d="M0.5,0 L1,0.5 L0.5,1 L0,0.5 L0.5,0 z" fill="#000000"></g>`
         : 
        `<g><path d="M0.5,0 L1,0.5 L0.5,1 L0,0.5 L0.5,0 z" fill="#ffffff"></g>`;
        return this.wrapper(id, g);
    },
    fade: function(id){
        var g = `<g><rect x='0' y='0' width='1' height='1' fill="#ffffff"></rect></g>`;
        return this.wrapper(id, g);
    },
    slide: function(id){
        var g = `<g><rect x='0' y='0' width='1' height='1' fill="#ffffff"></rect></g>`;
        return this.wrapper(id, g);
    },
    plus: function(id, type){
        var g = type==="in" ? 
        `<g ><rect x='0' y='0' width='1' height='1' fill="#ffffff"></rect></g>
         <g class="black horizontal"><rect x='0' y='0' width='1' height='1' fill="#000000"></rect></g>
         <g class="black vertical"><rect x='0' y='0' width='1' height='1' fill="#000000"></rect></g>`
         : 
        `<g class="horizontal"><rect x='0' y='0' width='1' height='1' fill="#ffffff"></rect></g>
         <g class="vertical"><rect x='0' y='0' width='1' height='1' fill="#ffffff"></rect></g>`;
        return this.wrapper(id, g);
    },
    barn: function(id, type){
        var g = /in/.test(type) ? 
        `<g><rect x='0' y='0' width='1' height='1' fill="#ffffff"></rect></g>
         <g class="black"><rect x='0' y='0' width='1' height='1' fill="#000000"></rect></g>`
         :
         `<g><rect x='0' y='0' width='1' height='1' fill="#ffffff"></rect></g>`;
        return this.wrapper(id, g);
    },
    randomBars: function(id, type) {},

    /**********************
     ** option type: downLeft | upLeft | downRight | upRight
     ***********************/
    strips: function(id, type) {},

    wedge: function(id, type) {},

    /**********************
     ** option slice: 1 ,2,3,4,8,
     ***********************/
    wheel: function(id, type) {},

    /**********************
     ** option type: left | down | up
     ***********************/
    wipe: function(id, type) {
        var g =
        `<g><rect x='0' y='0' width='1' height='1' fill="#ffffff"></rect></g>
         <g class="black"><rect x='0' y='0' width='1' height='1' fill="#000000"></rect></g>`;
        return this.wrapper(id, g);
    }
};