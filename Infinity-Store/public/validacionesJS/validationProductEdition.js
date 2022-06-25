window.addEventListener("load", function () {
    let formulario = document.querySelector("form.EditionCreation");

    formulario.addEventListener("submit", function (e) {
        let errores = [];
        let camponombre = document.querySelector("input.name");
        if(camponombre.value == ""){
            errores.push("Ingrese un nombre de producto");
        }else if (camponombre.value.length <= 5) {
            errores.push("Debe tener mínimo 5 caracterés el nombre de producto")};

        let campoprecio = document.querySelector("input.price");
        if (campoprecio.value == "") {
            errores.push("Ingrese el valor del producto")
        } else if (price.value < 1 || price.value == 0) {
            errores.push("Ingrese un valor valido del producto")}

            //  let campodescripcion = document.querySelector("textarea");
            //  if (campodescripcion.value == "") {
            //      errores.push("Complete con una descripción del producto");
            //   } else if (description.value.length < 20) {
            //      errores.push("Debe tener mínimo 20 caracterés la descripcion del producto");
            //  };
    
          let campofoto = document.querySelector("input.form-input");
            if (campofoto.value == "") {
                errores.push("Ingrese una foto");
            };  


        
          
          
        // function fileValidation(){
        //     var fileInput = document.getElementById('photo');
        //     var filePath = fileInput.value;
        //     var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
        //     if(!allowedExtensions.exec(filePath)){
        //         alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
        //         fileInput.value = '';
        //         return false;
        //     }}


        if (errores.length > 0) {
            e.preventDefault();
            let ulErrores = document.querySelector("div.errores ul");
            for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += "<li>" + "*" + errores[i] + "</li>"
            }
        }


        // let errores = [];
        
        // let name = document.querySelector("input.name");
        // if (name.value == "") {
        //     errores.push("Debe completar con un nombre de producto")
        // } else if (name.value.length < 5) {
        //     errores.push("Debe tener mínimo 5 caracterés el nombre de producto2")
        // };
        
        // let price = document.querySelector("input.price");
        // if (price.value == "") {
        //     errores.push("Ingrese el valor del producto")
        // } else if (price.value < 1) {
        //     errores.push("Ingrese un valor valido del producto")
        // }

        // let description = document.querySelector("input.description");
        // if (description.value == "") {
        //     errores.push("Complete con una descripción del producto")
        // } else if (description.value.length < 20) {
        //     errores.push("Debe tener mínimo 20 caracterés la descripcion del producto")
        // }
        // if (errores.length > 0) {
        //     e.preventDefault();
        // }

        // let ulErrores = document.querySelector("div.errores ul");

        // for (let i = 0; i < errores.length; i++) {
        //     ulErrores.innerHTML += "<li>" + "*" + errores[i] + "</li>"
        // }

    })
})