npm install 
gulp

tips:
1.目前除了百叶窗外，其他动画还没有加边缘模糊效果，因为gradient方案实现有很多局限，后续考虑用filter是否会更好？
2.circle和diamond加入了in和out选项
3.slide飞入，因为gsap纪录了transform的值，上一次的transform影响到下一次，暂时用改变元素位置x，y改变位置。
