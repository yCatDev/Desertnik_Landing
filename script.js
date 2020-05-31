if (navigator.userAgent.match('Mobile') == null) {
    particlesJS.load('particles', 'particles.json');
}

/**
 *
 * Created by Borbás Geri on 12/17/13
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
let EPPZScrollTo =
    {
        /**
         * Helpers.
         */
        documentVerticalScrollPosition: function () {
            if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
            if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
            if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
            return 0; // None of the above.
        },

        viewportHeight: function () {
            return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
        },

        documentHeight: function () {
            return (document.height !== undefined) ? document.height : document.body.offsetHeight;
        },

        documentMaximumScrollPosition: function () {
            return this.documentHeight() - this.viewportHeight();
        },

        elementVerticalClientPositionById: function (id) {
            let element = document.getElementById(id);
            let rectangle = element.getBoundingClientRect();
            return rectangle.top;
        },

        /**
         * Animation tick.
         */
        scrollVerticalTickToPosition: function (currentPosition, targetPosition) {
            let filter = 0.2;
            let fps = 60;
            let difference = parseFloat(targetPosition) - parseFloat(currentPosition);

            // Snap, then stop if arrived.
            let arrived = (Math.abs(difference) <= 0.5);
            if (arrived) {
                // Apply target.
                scrollTo(0.0, targetPosition);
                return;
            }

            // Filtered position.
            currentPosition = (parseFloat(currentPosition) * (1.0 - filter)) + (parseFloat(targetPosition) * filter);

            // Apply target.
            scrollTo(0.0, Math.round(currentPosition));

            // Schedule next tick.
            setTimeout("EPPZScrollTo.scrollVerticalTickToPosition(" + currentPosition + ", " + targetPosition + ")", (1000 / fps));
        },

        /**
         * For public use.
         *
         * @param id The id of the element to scroll to.
         * @param padding Top padding to apply above element.
         */
        scrollVerticalToElementById: function (id, padding) {
            let element = document.getElementById(id);
            if (element == null) {
                console.warn('Cannot find element with id \'' + id + '\'.');
                return;
            }

            let targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - padding;
            let currentPosition = this.documentVerticalScrollPosition();

            // Clamp.
            let maximumScrollPosition = this.documentMaximumScrollPosition();
            if (targetPosition > maximumScrollPosition) targetPosition = maximumScrollPosition;

            // Start animation.
            this.scrollVerticalTickToPosition(currentPosition, targetPosition);
        },

        /**
         * For public use.
         *
         * @param name The name of the first element to scroll to.
         * @param padding Top padding to apply above element.
         */
        scrollVerticalToElementByName: function (name, padding) {
            let element = document.getElementsByName(name);
            if (element == null) {
                console.warn('Cannot find element with name \'' + name + '\'.');
                return;
            }

            let targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - padding;
            let currentPosition = this.documentVerticalScrollPosition();

            // Clamp.
            let maximumScrollPosition = this.documentMaximumScrollPosition();
            if (targetPosition > maximumScrollPosition) targetPosition = maximumScrollPosition;

            // Start animation.
            this.scrollVerticalTickToPosition(currentPosition, targetPosition);
        }

    };



window.onload = initPage;





window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
}, 500);




function initPage() {
    let popup = document.getElementById("popup1");
    let popupBtn = document.getElementById("showPopupBtn");
    let buyBtns = document.getElementsByClassName("buy-button");
    let popupCloseBtn = document.getElementById("popupCloseBtn");
    let aboutBtn = document.getElementById("aboutBtn");
    let productBtn = document.getElementById("productBtn");
    let footerBtn = document.getElementById("footerBtn");
    let upbtn = document.getElementById("up_button");
    //let validateBtn = document.getElementById("validateBtn");

    aboutBtn.onclick = function () {EPPZScrollTo.scrollVerticalToElementById('about', 1);};
    productBtn.onclick = function () {EPPZScrollTo.scrollVerticalToElementById('products', 1);};
    footerBtn.onclick = function () {EPPZScrollTo.scrollVerticalToElementById('footer', 1);};
    upbtn.onclick = function () {EPPZScrollTo.scrollVerticalToElementById('header', 10);};
    //validateBtn.onclick = function () {validate();};

    popupBtn.onclick = ShowPopup;
    for(let i = 0; i<buyBtns.length; i++)
        buyBtns[i].addEventListener("click", ShowPopup);
    popupCloseBtn.onclick = HidePopup;

    document.body.classList.add('loaded_hiding');

    let map_btn = document.getElementById("map_link");
    let map = document.getElementById("map_frame");
    map_btn.onclick =OpenMap;
    window.addEventListener("scroll", function (event) {
        let scroll = this.scrollY;
        if (scroll > 500)
            upbtn.className = "show";
        else
            upbtn.className = "";
    });
    function ShowPopup() {
        popup.style.display = 'block';
    }

    function HidePopup() {
        popup.style.display = 'none';
    }

    function OpenMap(){
        // If it's an iPhone..
        if(navigator.userAgent.match('Mobile') != null)
            window.open("https://goo.gl/maps/82k9DUF3gRQvXPQ77");
        else
        {
            if (map.style.display=="none")
            {
                map.style.display="block";
                EPPZScrollTo.scrollVerticalToElementById('map_frame', 1);
            }
            else
                map.style.display="none";
        }
    }

    function validate() {

    }


}
