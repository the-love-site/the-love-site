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
        const today = new Date();
        const mToday = moment(today);

        const mDate = moment(date);

        const divYear = document.getElementById('date-year');
        const divMonth = document.getElementById('date-month');
        const divDay = document.getElementById('date-day');
        const divHour = document.getElementById('date-hour');
        const divMinute = document.getElementById('date-minute');
        const divSecond = document.getElementById('date-second');
        const divAndMore = document.getElementById('date-and-more');

        const yearsDiff = +mToday.diff(mDate, 'years');
        if (yearsDiff === 0) {
            divYear.parentElement.style.display = 'none';
            divAndMore.style.display = 'flex';
        } else {
            divYear.querySelector('span').innerHTML = yearsDiff;
            divYear.querySelector('small').innerHTML = yearsDiff === 1 ? 'ano' : 'anos';
        }

        const monthsDiff = mToday.diff(mDate, 'months');
        divMonth.querySelector('span').innerHTML = monthsDiff % 12;
        divMonth.querySelector('small').innerHTML = (monthsDiff % 12) === 1 ? 'mês' : 'meses';

        const daysDiff = (mToday.diff(moment(new Date(today.getFullYear(), today.getMonth(), date.getDate())), 'days'));
        divDay.querySelector('span').innerHTML = daysDiff;
        divDay.querySelector('small').innerHTML = daysDiff === 1 ? 'dia' : 'dias';

        const hoursDiff = +(today.getHours() - date.getHours());
        divHour.querySelector('span').innerHTML = hoursDiff <= 0 ? 0 : hoursDiff;
        divHour.querySelector('small').innerHTML = hoursDiff === 1 ? 'hora' : 'horas';

        const minutesDiff = +(today.getMinutes() - date.getMinutes());
        divMinute.querySelector('span').innerHTML = (minutesDiff);
        divMinute.querySelector('small').innerHTML = minutesDiff === 1 ? 'minuto' : 'minutos';

        const secondsDiff = +(today.getSeconds() - date.getSeconds());
        divSecond.querySelector('span').innerHTML = secondsDiff;
        divSecond.querySelector('small').innerHTML = secondsDiff === 1 ? 'segundo' : 'segundos';
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