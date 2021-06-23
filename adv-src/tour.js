document.addEventListener('DOMContentLoaded', function(event) {

    let tourConfig = [{
            "tourTipe": "modal",
            "tourSelector": ".modal-append",
            "tourText": "Что бы тебе было проще во всем разобраться, предлягаем пройти небольшой тур по твоему личному кабинету",
            "tourTitle": 'Добро пожаловать в личный кабинет',
            "tourImg": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/djV11Xbc914\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
        },
        {
            "tourTipe": "tip",
            "tourSelector": "body > div.main-page > div.sidebar > div > div.sidebar__topside > div.sidebar__list > a:nth-child(1)",
            "mobileSelector": 'body > div.main-page > div.page > div.top--mobile > div.top__wrapper > div.top__rightside',
            "mobPose": "top-right",
            "imgSrc": "../adv-src/user.svg",
            "tourText": "Профиль пользователя с личными настройками - пароль, имя, e-mail, фото",
            "tourTitle": "Моя страница"
        },
        {
            "tourTipe": "tip",
            "tourSelector": "body > div.main-page > div.sidebar > div > div.sidebar__topside > div.sidebar__list > a:nth-child(2)",
            "mobPose": "bottom-Left-50",
            "mobileSelector": "body > div.sidebar_menu__list > a:nth-child(3)",
            "imgSrc": "../adv-src/clipboard.svg",
            "tourText": "Профиль пользователя с личными настройками - пароль, имя, e-mail, фото",
            "tourTitle": "Анкета"
        },
        {
            "tourTipe": "tip",
            "tourSelector": "body > div.main-page > div.sidebar > div > div.sidebar__topside > div.sidebar__list > a:nth-child(3)",
            "mobPose": "bottom-Left",
            "mobileSelector": "body > div.sidebar_menu__list > a.sidebar__link__mobile.sidebar__link__mobile--active",
            "imgSrc": "../adv-src/course.svg",
            "tourText": "Профиль пользователя с личными настройками - пароль, имя, e-mail, фото",
            "tourTitle": "Моя курсы"
        },
        {
            "tourTipe": "tip",
            "tourSelector": "body > div.main-page > div.sidebar > div > div.sidebar__topside > div.sidebar__list > a:nth-child(4)",
            "mobPose": "bottom-Left-10",
            "mobileSelector": "body > div.sidebar_menu__list > a:nth-child(2)",
            "imgSrc": "../adv-src/pie-chart.svg",
            "tourText": "Профиль пользователя с личными настройками - пароль, имя, e-mail, фото",
            "tourTitle": "Статистика"
        },
        {
            "tourTipe": "tip",
            "tourSelector": "body > div.main-page > div.sidebar > div > div.sidebar__topside > div.sidebar__list > a:nth-child(5)",
            "mobPose": "bottom-right-10",
            "mobileSelector": "body > div.sidebar_menu__list > a:nth-child(4)",
            "imgSrc": "../adv-src/food.svg",
            "tourText": "Профиль пользователя с личными настройками - пароль, имя, e-mail, фото",
            "tourTitle": "План питания"
        },
        {
            "tourTipe": "tip",
            "tourSelector": ".telegram__name",
            "mobileSelector": "body > div.sidebar_menu__list > a:nth-child(5)",
            "mobPose": "bottom-right",
            "imgSrc": "../adv-src/telegram.svg",
            "tourText": "Профиль пользователя с личными настройками - пароль, имя, e-mail, фото",
            "tourTitle": "Telegram"
        },
        {
            "tourTipe": "tip",
            "tourSelector": ".instagram__name",
            "mobileSelector": false,
            "imgSrc": "../adv-src/instagram.svg",
            "tourText": "Профиль пользователя с личными настройками - пароль, имя, e-mail, фото",
            "tourTitle": "#VOZNAYA_OLESYA"
        }

    ];

    let body = document.querySelector('body');
    var startIndex = 0;
    let delay = 1000;
    let lifetime = 0.1;
    let refreshTime = 1800;
    let tabletSize = "(max-width:1220px)";
    let mobSizeMin = "(min-width:768px)";
    let mobSizeMax = "(max-width:767px)";



    function setCookie(name, value) {
        var expires = "";
        expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }


    function tourComplite() {
        setCookie('tour-skeep', true)
        body.classList.remove('no-select')
    }


    function restartTour() {
        setCookie('timeshow', addMinutes(new Date(), lifetime));
        setCookie('first-show', 'show')
        removeTour(document.querySelector(tourConfig[startIndex].tourSelector), startIndex);
        body.classList.remove('no-select')
    }

    function addMinutes(dt, minutes) {
        return new Date(dt.getTime() + minutes * 60000);
    }

    function createRestart(elem) {
        let restarthtml = document.createElement('div');
        restarthtml.className = 'restart-tour';
        restarthtml.innerHTML = '<div class="restart-tour-inner"> <div class="restart-tour-img c-c"> <picture> <source srcset="../adv-src/restart-mob.jpg" media="(max-width: 767px)"> <img src="../adv-src/restart.jpg"> </picture></div> <div class="restart-tour-content"> <h3 class="tour-title">Продолжить тур?</h3> <p class="tour-descr">Завершите тур, чтобы узнать больше о лк Ovslim</p> <div class="tour-buttons c-s"> <button class="tour-button tour-sec tour-close">Закрыть</button> <button class="tour-button tour-main tour-restart">Продолжить</button> </div> </div> </div>';
        elem.appendChild(restarthtml)
        setTimeout(function() {
            restarthtml.classList.add('restart-open')
        }, 10)
    }


    function removeRestart() {
        let elem = document.querySelector('.restart-tour');
        elem.classList.remove('restart-open');
        console.log(elem)
        setTimeout(function() {
            elem.remove()
        }, 300)
    }


    function sidebarShow() {
        document.querySelector('.sidebar').classList.add('sidebar--active')
        body.classList.add('body--active')
    }

    function sidebarHide() {
        document.querySelector('.sidebar').classList.remove('sidebar--active')
        body.classList.remove('body--active')
    }


    function createTour(elem) {
        console.log(tourConfig[startIndex].mobileSelector)

        if ((window.matchMedia(tabletSize).matches) && tourConfig[startIndex].tourTipe != 'modal' && (window.matchMedia(mobSizeMin).matches)) {
            sidebarShow()
        } else if ((window.matchMedia(tabletSize).matches) && tourConfig[startIndex].tourTipe == 'modal' && (window.matchMedia(mobSizeMin).matches)) {
            sidebarHide()
        }


        if (tourConfig[startIndex].tourTipe == 'modal') {
            elem.innerHTML += '<div class="modal tour-modal"> <div class="modal-dialog"> <div class="modal-body"> <div class="modal-content"> <div class="tour-img">' + tourConfig[startIndex].tourImg + '</div> <div class="tour-content"> <h3 class="tour-title">' + tourConfig[startIndex].tourTitle + '</h3> <p class="tour-descr">' + tourConfig[startIndex].tourText + '</p> <div class="tour-buttons c-c"> <button class="prew-tour tour-button tour-sec">Позже</button> <button class="next-tour tour-button tour-main">Начать</button> </div> </div> </div> </div> </div></div>';
            setTimeout(function() {
                document.querySelector('.modal').classList.add('modal-open')
            }, 200)

        } else {
            if ((window.matchMedia(mobSizeMax).matches) && (tourConfig[startIndex].mobileSelector)) {
                elem = document.querySelector(tourConfig[startIndex].mobileSelector);
            }
            let pose;
            if (tourConfig[startIndex].mobPose) {
                pose = tourConfig[startIndex].mobPose;
            }
            elem.classList.add('tour-el-active')
            let nextText;
            let totalTor = 0;
            if (window.matchMedia(mobSizeMax).matches) {
                totalTor = totalTor + JSON.stringify(tourConfig).match(/"mobileSelector":false/g).length;
                if (!tourConfig[startIndex + 1] || !(tourConfig[startIndex + (1 + totalTor)])) {
                    nextText = 'Финиш';
                } else {
                    nextText = 'Далее';
                }
            } else {


                console.log(!tourConfig[startIndex + 1])
                if (!tourConfig[startIndex + 1]) {

                    nextText = 'Финиш';
                } else {
                    nextText = 'Далее';
                }
            }

            console.log(totalTor, nextText, !(tourConfig[startIndex + (1 + totalTor)]))
            let tourhtml = document.createElement('div');
            tourhtml.className = (tourConfig[startIndex].tourTipe + ' ' + pose);
            tourhtml.innerHTML = '<div class="tip-inner"><div class="tip-content"><div class="tip-icon c-c icon"><img src="' + tourConfig[startIndex].imgSrc + '" alt=""></div><h3 class="tip-title">' + tourConfig[startIndex].tourTitle + '</h3><p class="tip-descr">' + tourConfig[startIndex].tourText + '</p><div class="tip-buttons c-s"><button class="prew-tour tour-button tour-sec">Назад</button><button class="next-tour tour-button tour-main">' + nextText + '</button></div></div></div>';
            elem.appendChild(tourhtml)
            setTimeout(function() {
                tourhtml.classList.add('tip-show')
            }, 10)
        }
    }

    function nextStepShow(event) {
        if (!event.target.matches('.next-tour')) return
        removeTour(document.querySelector(tourConfig[startIndex].tourSelector));
        event.preventDefault();
        event.stopPropagation();
        startIndex++;
        if (tourConfig[startIndex].mobileSelector == false && window.matchMedia(mobSizeMax).matches) {
            startIndex++;
        }
        console.log(startIndex)
        if (tourConfig.length == startIndex) {
            tourComplite();
            if (window.matchMedia(tabletSize).matches && window.matchMedia(mobSizeMin).matches) {
                sidebarHide()
            }
        } else {


            createTour(document.querySelector(tourConfig[startIndex].tourSelector), startIndex);
        }
    }

    function stepStepBack(event) {
        if (!event.target.matches('.prew-tour')) return
        event.preventDefault();
        event.stopPropagation();
        if (startIndex == 0) {
            restartTour()
            if (window.matchMedia(tabletSize).matches && window.matchMedia(mobSizeMin).matches) {
                sidebarHide()
            }
        } else {
            removeTour(document.querySelector(tourConfig[startIndex].tourSelector), startIndex);
            startIndex--;
            if (tourConfig[startIndex].mobileSelector == false && window.matchMedia(mobSizeMax).matches) {
                startIndex--;

            }
            createTour(document.querySelector(tourConfig[startIndex].tourSelector), startIndex);
        }

    }


    function removeTour(elem) {
        if ((window.matchMedia(mobSizeMax).matches) && (tourConfig[startIndex].mobileSelector)) {
            elem = document.querySelector(tourConfig[startIndex].mobileSelector);
        }
        let tourElem = elem.querySelector('.' + tourConfig[startIndex].tourTipe);
        elem.classList.remove('tour-el-active');
        tourElem.classList.add('prepare-removing')
        setTimeout(function() {
            let forRemoves = document.querySelectorAll('.prepare-removing');
            forRemoves.forEach(function(forRemove) {
                forRemove.remove();
            })
        }, 300);
    }

    function startTour() {
        if (!(getCookie('first-show'))) {
            body.classList.add('no-select')

            createTour(document.querySelector(tourConfig[startIndex].tourSelector), startIndex);
            setCookie('first-show', 'show')
        } else {
            checkShow()
        }
        console.log(new Date(), new Date(getCookie('timeshow')))
        console.log(getCookie('user'))
        console.log(getCookie('user') == 'viewed')
        console.log(new Date() > new Date(getCookie('timeshow')))

    }
    setTimeout(function() {
        startTour();

    }, delay)

    body.addEventListener('click', nextStepShow);
    body.addEventListener('click', stepStepBack);
    body.addEventListener('click', restartHide);
    body.addEventListener('click', restartStart);

    function restartHide(event) {
        if (!event.target.matches('.tour-close')) return
        event.preventDefault();
        setCookie('tour-skeep', true)
        document.querySelector('.restart-tour').classList.add('restart-procesing')
            // removeRestart()
    }

    function restartStart(event) {
        if (!event.target.matches('.tour-restart')) return
        event.preventDefault();
        body.classList.add('no-select')
        removeRestart();
        createTour(document.querySelector(tourConfig[startIndex].tourSelector))

    }

    function checkShow() {
        setInterval(function() {
            if (!(getCookie('tour-skeep'))) {
                if (!document.querySelector('.restart-tour') && !document.querySelector('.modal') && !document.querySelector('.tip')) {
                    if (new Date() > new Date(getCookie('timeshow'))) {
                        createRestart(body);
                    }
                }
            }
        }, refreshTime);
    }
});