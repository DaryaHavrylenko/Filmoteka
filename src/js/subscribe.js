

      // const refs = {
      //   openSubscribe: document.querySelector('.button-subscribe__main'),
      //     closeSubscribe: document.querySelector('.button-close-subscribe'),
      //   backdropSubscribe: document.querySelector('.subscribe__wrapper'),
      // };
      
      // const scriptURL =
      // 'https://script.google.com/macros/s/AKfycbyQOYXGaePRep6FToNSfKqZU2Eut6p_H22MuQstAS5A3IsoWG8UCWkAN-MZEQt7NI-wCw/exec';
      // const form = document.forms['submit-to-google-sheet'];
      // const msg = document.getElementById("msg")
      

      // refs.openSubscribe.addEventListener('click', onOpenSubscribe);
      // refs.closeSubscribe.addEventListener('click', onCloseSubscribe);
      // refs.backdropSubscribe.addEventListener('click', onClickSubscribe);
      
      
      // //* При клике на ссылку открывается модалка (класс 'is-hidden' убираем c backdrop)
      // //* По кнопке 'Esc' закрывается
      
      
      // function onOpenSubscribe() {
      //   refs.backdropSubscribe.classList.remove('is-hidden');
      //   refs.openSubscribe.classList.add('is-hidden');
      //   window.addEventListener('keydown', onPressESC);

      //   form.addEventListener('submit', e => {
      //     e.preventDefault();
      //     fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      //       .then(response => {
      //         console.log(response)
      //         msg.innerHTML = "Thank you for subscribing!"
      //         setTimeout(() => {
      //           msg.innerHTML = ""
      //                 }, 5000)
      //                 form.reset()
      //       })
      //       .catch(error => console.error('Error!', error.message));
      //   });



      // }
      
      // //* При клике на кнопку закрывается модалка (добавляем класс 'is-hidden' обратно на backdrop)
      // //* При закрытии убираем закрытие по 'Esc'
      
      // function onCloseSubscribe() {
      //   refs.backdropSubscribe.classList.add('is-hidden');
      //   window.removeEventListener('keydown', onPressESC);
      // }
      
      // //* При клике на backdrop закрывается модалка (осуществляется по классу на backdrop)
      
      // function onClickSubscribe(e) {
      //   if (e.target.classList.contains('js-close-subscribe')) {
      //     onCloseSubscribe();
      //   }
      // }
      
      // //* Функция закрытия по 'Esc'
      // function onPressESC(e) {
      //   if (e.keyCode === 27) {
      //     onCloseSubscribe();
      //   }
      // }


    


