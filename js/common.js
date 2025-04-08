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
        .to('.visual h1',{'opacity':'1','ease':'none','dutation':'10'})
        .to('.visual video',{'scale':'1', 'ease':'none','dutation':'6', 'opacity':'0.8'})
});