export class PageContent {

    static updateMainImage(imageUrl) {
        const mainImage = document.querySelector('img#main-image');
        mainImage.src = imageUrl;
    }

    static updateNames(person1, person2) {
        const person1Span = document.getElementById('person1');
        const person2Span = document.getElementById('person2');

        person1Span.innerHTML = person1;
        person2Span.innerHTML = person2;
    }

    static updateText(text) {
        const textEl = document.getElementById('text');
        textEl.innerHTML = text;
    }

    /**
     * 
     * @param {Date} date 
     */
    static updateStartDate(date) {
        const divYear = document.getElementById('date-year');
        const divMonth = document.getElementById('date-month');
        const divDay = document.getElementById('date-day');
        const divHour = document.getElementById('date-hour');
        const divMinute = document.getElementById('date-minute');
        const divSecond = document.getElementById('date-second');
        const divAndMore = document.getElementById('date-and-more');

        const interval = setInterval(() => {
            const timeDiff = this.calcTimeDiff(date);

            if (timeDiff.totalDiffInMs === 0) {
                clearInterval(interval);
            } else {
                if (timeDiff.years === 0) {
                    divYear.parentElement.style.display = 'none';
                    divAndMore.style.display = 'flex';
                } else {
                    divYear.querySelector('span').innerHTML = timeDiff.years;
                    divYear.querySelector('small').innerHTML = timeDiff.years === 1 ? 'ano' : 'anos';
                }
        
                divMonth.querySelector('span').innerHTML = timeDiff.months;
                divMonth.querySelector('small').innerHTML = timeDiff.months === 1 ? 'mês' : 'meses';
        
                divDay.querySelector('span').innerHTML = timeDiff.days;
                divDay.querySelector('small').innerHTML = timeDiff.days === 1 ? 'dia' : 'dias';
        
                divHour.querySelector('span').innerHTML = timeDiff.hours <= 0 ? 0 : timeDiff.hours;
                divHour.querySelector('small').innerHTML = timeDiff.hours === 1 ? 'hora' : 'horas';
        
                divMinute.querySelector('span').innerHTML = timeDiff.minutes;
                divMinute.querySelector('small').innerHTML = timeDiff.minutes === 1 ? 'minuto' : 'minutos';
        
                divSecond.querySelector('span').innerHTML = timeDiff.seconds;
                divSecond.querySelector('small').innerHTML = timeDiff.seconds === 1 ? 'segundo' : 'segundos';
            }
        });
    }

    static calcTimeDiff(initialDate) {
        // Set your target date and time for the countdown
        const targetDate = new Date(+initialDate);

        let countdown = {
            totalDiffInMs: 0,
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        // Update the countdown every second
        const now = new Date();
        const timeDifference = (now.getTime()) - (targetDate.getTime());
        countdown.totalDiffInMs = timeDifference;

        if (timeDifference > 0) {
            countdown.years = moment(now).diff(targetDate, 'years');
            countdown.months = moment(now).diff(targetDate, 'months') % 12;
            countdown.days = Math.floor((timeDifference / (1000 * 60 * 60 * 24)) % 30);
            countdown.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            countdown.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            countdown.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        }

        return countdown;
    }

    static updateCarousel(...imageUrls) {
        const carouselVelocity = 2000;
        const carouselEl = document.getElementById('images-carousel');

        for (const imgUrl of imageUrls) {
            const imgContainer = document.createElement('div');
            imgContainer.setAttribute('data-image-carousel', 'carousel-item');
            imgContainer.style.width = '100%';
            imgContainer.style.height = '100%';
            imgContainer.style.flexShrink = '0';
            imgContainer.style.display = 'flex';
            imgContainer.style.alignItems = 'center';
            imgContainer.style.justifyContent = 'center';
            imgContainer.style.transition = 'all 0s ease-in-out';
            imgContainer.style.transitionDuration = `${carouselVelocity - 1000}ms`;
            
            imgContainer.style.background = `url("${imgUrl}")`;
            imgContainer.style.backgroundSize = 'cover';
            imgContainer.style.backgroundPosition = 'center';
            
            const imgEl = document.createElement('img');
            imgEl.src = `${imgUrl}`;
            imgEl.style.width = '100%';
            imgEl.style.height = '100%';
            imgEl.style.objectFit = 'contain';
            imgEl.style.backdropFilter = 'blur(5px)';

            imgContainer.appendChild(imgEl);

            carouselEl.appendChild(imgContainer);
        }

        let currentCarouselIndex = 1;
        const carouselItems = document.querySelectorAll('[data-image-carousel=carousel-item]');

        setInterval(() => {
            // Accessing All the carousel Items
            Array
            .from(carouselItems)
            .forEach((item) => {

                if (currentCarouselIndex < (carouselItems.length + 1)) {
                    item.style.transform = `translateX(-${currentCarouselIndex*100}%)`;
                }
            });

            if (currentCarouselIndex < (carouselItems.length - 1)) {
                currentCarouselIndex++;
            } else {
                currentCarouselIndex=0;
            }
        }, carouselVelocity);
    }

    static updateVideoData(videoUrl, videoType) {
        const videoSection = document.getElementById('section-video');

        const sourceEl = document.createElement('source');
        sourceEl.type = videoType;
        sourceEl.src = videoUrl;

        const helperLink = document.createElement('a');
        helperLink.href = videoUrl;
        helperLink.innerHTML = 'Baixar o vídeo';

        const videoElement = videoSection.querySelector('video');

        videoElement.appendChild(sourceEl);
        videoElement.appendChild(helperLink);

        videoSection.style.display = 'block';
    }
}