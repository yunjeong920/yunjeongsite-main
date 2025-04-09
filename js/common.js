$(function (){
    $('.animate').scrolla({
        moblie:true,
        once:false,
    })
})

$(function (){Splitting();})

$(function () {
    gsap.registerPlugin(ScrollTrigger)

    gsap.timeline({
        scrollTrigger: {
            trigger: '.visual',
            start: 'top top',
            end: "bottom",
            scrub: 1,
            pin: true,
            markers: false,
        }
    })
        .to('.visual h1',{'opacity':'1','ease':'none','dutation':'25'})
        // .to('.visual video',{'scale':'1', 'ease':'none','dutation':'6', 'opacity':'0.8'})
});

$(function () {
    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray('section').forEach((section, i)=>{
        ScrollTrigger.create({
            trigger:section,
            start:'top top',
            pin: true,
            pinSpacing:false,
            markers:false,
        })
    })
    ScrollTrigger.create({
        snap: 1 / (section.length - 1)
    })
});