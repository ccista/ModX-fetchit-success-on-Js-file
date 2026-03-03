document.addEventListener('fetchit:success', ({ detail }) => {
   $.magnificPopup.close(); // Close popup that is currently opened (shorthand)
   setTimeout(function(){
       $.magnificPopup.open({
          items: {
            src: '#thank-popup',
            type: 'inline'
          }
          // You may add options here, they're exactly the same as for $.fn.magnificPopup call
          // Note that some settings that rely on click event (like disableOn or midClick) will not work here
        })
   }, 1000)
});
/******  *******/
/****** Еще вариант с GSAP *******/
/******  *******/
document.addEventListener('fetchit:success', ({ detail }) => {
    // Создаем кружок вертящийся (если его еще нет)
    let loader = document.querySelector('.form-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'form-loader';
        loader.innerHTML = '<div class="spinner"></div>'; // HTML для спиннера
        document.querySelector('form').appendChild(loader);
    }
    
    // Анимация появления кружка с помощью GSAP
    gsap.fromTo('.form-loader', 
        { opacity: 0, scale: 0 },
        { 
            opacity: 1, 
            scale: 1,
            duration: 0.3,
            ease: "back.out"
        }
    );
    
    // Добавляем вращение с помощью GSAP
    gsap.to('.form-loader .spinner', {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "linear"
    });
    
    // Через 1 секунду скрываем форму и показываем сообщение об успехе
    setTimeout(() => {
        // Останавливаем вращение
        gsap.killTweensOf('.form-loader .spinner');
        
        // Скрываем форму с анимацией
        gsap.to('form', {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                // Скрываем форму и показываем сообщение об успехе
                document.querySelector('form').style.display = 'none';
                
                // Создаем или показываем div с успехом
                let successDiv = document.querySelector('.success');
                if (!successDiv) {
                    successDiv = document.createElement('div');
                    successDiv.className = 'success';
                    successDiv.innerHTML = 'Сообщение успешно отправлено! ✉️';
                    document.querySelector('form').parentNode.appendChild(successDiv);
                }
                
                // Показываем success с анимацией
                successDiv.style.display = 'block';
                gsap.fromTo('.success',
                    { opacity: 0, y: 20 },
                    { 
                        opacity: 1, 
                        y: 0,
                        duration: 0.5,
                        ease: "back.out"
                    }
                );
            }
        });
    }, 1000);
});
/******  *******/
