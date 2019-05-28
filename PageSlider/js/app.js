(function() {

    let completed = true;
    let slides = document.getElementsByClassName("slide");

    for(let i=0, count=slides.length; i<count; i++) {
        if(i%2 === 0) slides[i].style.background = '#8F91CC';
    }

    TweenLite.to(slides[0], 0, {top: 0});

    $(document).on('touchmove',function(e){
        e.preventDefault();
    });

    document.addEventListener('touchmove',function(e){ e.preventDefault(); });
    document.addEventListener('touchend', onClick, false);
    document.addEventListener('click', onClick, false);

    function onClick(event) {

        if(!completed) return;
        completed = false;

        let element = event.target;
        //console.log('current');
        //console.log(element);
        nextSlide(element);

//        if(element !== null && element.className === 'slide')
//        else nextSlide(slides[0]);

        /*
        console.log('CLICK');
        console.log('current');
        console.log(event.target);
        console.log(event.target.nextElementSibling);
        if(event.target.nextElementSibling !== null && event.target.nextElementSibling.className === 'slide') {

            nextSlide(event.target);

            console.log('here');
            event.target.style.zIndex = '10';
            nextSlide(event.target.nextElementSibling);
        }
        else {
            event.target.style.zIndex = '10';
            nextSlide(slides[0]);
        }*/
    }

    function nextSlide(eCurrent) {

        let eNext = eCurrent.nextElementSibling;
        eNext = (eNext !== null && eNext.className === 'slide') ? eNext : slides[0];

        eCurrent.style.zIndex = '10';
        eNext.style.zIndex = '100';

        console.log(eNext.style);

        if(eNext.offsetTop < 0) {
            TweenLite.to(eCurrent, 2.0, {ease: Power3.easeOut, top: '100%'});
            TweenLite.to(eNext, 1.0, {ease: Power3.easeOut, top: 0, onComplete: ()=>{ completed = true; }});
        } else {
            TweenLite.to(eCurrent, 2.0, {ease: Power3.easeOut, top: '-100%'});
            TweenLite.to(eNext, 1.0, {ease: Power3.easeOut, top: 0, onComplete: ()=>{ completed = true; }});
        }
    }

return;
    console.log(slides);

//var pages = [].slice.call(slides);

//console.log(pages);
    let pages = {};
    let isFirst = true;
    let gt = null;

    for (let slide of slides) {

        let t = TweenLite.to(slide, 0.5, {top: '90%'});

        if (isFirst) {
            gt = t;
            isFirst = false;
        }


        slide.addEventListener('click', function (event) {
            console.log(event.target);
            animateSlide(t);
        }, false);

        /*pages[slide.id] = {
            t: TweenLite.to(slide, 0.5, { top: 0, paused: true, reversed: true }),


        console.log(slide);*/
    }


//document.body.addEventListener('click', function(event) { console.log(event.target); animateSlide(gt); return false; }, false);

    /*

    slides.forEach( function() {
      console.log('zzzz');
        pages.push(TweenLite.to(slide, 0.5, { top: 0, paused: true, reversed: true } ));
        document.addEventListener('click', function() { animateSlide(); }, false);
    });
    */
    function animateSlide(t) {

        console.log('CLICK');

        if (!t.reversed()) {

            t.play();

        } else {

            t.reverse();

        }
    }

    //console.log(el.nodeName);
    //el = el.nextElementSibling;
}());