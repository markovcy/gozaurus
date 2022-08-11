    const requestURL = "https://admin.pm-db.net/api/v1/user/signin/";
    
    let email;
    
      function getName() {
      email = document.getElementById('email'). value;
      console.log(email);
     
      }
    
    let password;
    
      function getPassword() {
      password = document.getElementById('password'). value;
      console.log(password);
     
      }
    
    function getUser() {
          
    
      getName();
      getPassword();
    
      var data = {
          email: email,
          password: password,
      };
      console.log(data);
    
      console.log(email);
      console.log(password);
    
        // Создать объект для формы.
        let formData = new FormData();
     
        var boundary = String(Math.random()).slice(2);
        formData.boundary = "another cool boundary";
        formData.append("email", email);
        formData.append("password", password)
     
        console.log(formData);

         var boundaryMiddle = '--' + boundary + '\r\n';
         var boundaryLast = '--' + boundary + '--\r\n'
      
        var body = ['\r\n'];
        for (var key in data) {
            // добавление поля
            body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + data[key] + '\r\n');
        }
      
        // body = body.join(boundaryMiddle) + boundaryLast;
      
        // Тело запроса готово, отправляем
      
        var xhr = new XMLHttpRequest();
        xhr.open('POST', requestURL);
    
        // let email;
        // let password;
    
        xhr.setRequestHeader('email', email);
        xhr.setRequestHeader('password', password);
      
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + formData.boundary);boundary="another cool boundary"
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary="another cool boundary"')

      
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
      
            // alert( this.responseText );
        }
      
        xhr.send(formData);
    }
    
        // function getUser () {
        //     let formElem = document.getElementById('formElem');
        //     console.log(formElem);
    
        //     formElem.onchange = function () {
        //         console.log(formElem.value)
        //     }
    
            // var formData = new FormData(document.forms.formElem);
            // console.log(formData);
    
            // formElem.onsubmit = async (e) => {
            //     // e.preventFefault();
    
            //     let response = await fetch('https://admin.pm-db.net/api/v1/user/signin/', {
            //         method: 'POST',
            //         body: new FormData(formElem)
            //     });
    
            //     let result = await response.json();
            //     alert (result.message);
            // };
    
