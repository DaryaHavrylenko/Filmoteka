

      const refs = {
        openSubscribe: document.querySelector('.button-subscribe__main'),
      };
      
      const scriptURL =
      'https://script.google.com/macros/s/AKfycbyQOYXGaePRep6FToNSfKqZU2Eut6p_H22MuQstAS5A3IsoWG8UCWkAN-MZEQt7NI-wCw/exec';
      const form = document.forms['submit-to-google-sheet'];
      const msg = document.getElementById("msg")

      form.addEventListener('submit', e => {
            e.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
              .then(response => {
                msg.innerHTML = "Thank you for subscribing!"
                setTimeout(() => {
                  msg.innerHTML = ""
                        }, 5000)
                        form.reset()
              })
              .catch(error => console.error('Error!', error.message));
          });
  
      