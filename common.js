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
