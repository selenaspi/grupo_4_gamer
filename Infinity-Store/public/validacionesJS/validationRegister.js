window.addEventListener("load", function () {
    let formulario = document.querySelector("form.register");

    formulario.addEventListener("submit", function (e) {
        

        let errores = [];

        let campoNombre = document.querySelector("input.name");

        if (campoNombre.value == "") {
            errores.push("Debe completar con su Nombre")

        } else if (campoNombre.value.length < 2) {
            errores.push("El nombre debe tener al menos 2 caracteres")
        }
        let campoApellido = document.querySelector("input.lastName");
        if (campoApellido.value == "") {
            errores.push("Debe completar con su Apellido")
        } else if (campoApellido.value.length < 2) {
            errores.push("El apellido debe contener al menos 2 caracteres")
        }
        let email = document.querySelector("input.email");
        if (email.value == "") {
            errores.push("Debe completar con su Correo Electronico")
        } else if (email.value.length < 10) {
            errores.push("El Correo Electronico NO es valido")
        }
        let pass = document.querySelector("input.pass");
        if (pass.value == "") {
            errores.push("Complete con su Contraseña ")
        } else if (pass.value.length < 8) {
            errores.push("La contraseña debe contener al menos 8 caracteres")
        }
        let fotoUsuario = document.querySelector("input.fotoUsuario")
        if(fotoUsuario.value == ""){
            errores.push("Debe subir una foto de perfil")
        }else if(fotoUsuario.value == ""){
            errores.push("Debe ser un archivo JPG, JPEG, PNG, GIF")
        }
        if (errores.length > 0) {
            e.preventDefault();
        }

        let ulErrores = document.querySelector("div.errores ul");

        for (let i = 0; i < errores.length; i++) {
            ulErrores.innerHTML += "<li>" + "*" + errores[i] + "</li>"
        }

    })

})



// window.addEventListener("load", function () {
    
//     let formulario = document.querySelector("form.register");

//     formulario.addEventListener("submit", function(e){
//         let errores = [];

//         let campoNombre = document.querySelector("input.name");
//         if (campoNombre.value == "") {
//             errores.push("Debe completar con su Nombre")
//         } else if (campoNombre.value.length < 2) {
//             errores.push("El nombre debe tener al menos 2 caracteres")
//         }
//         let campoApellido = document.querySelector("input.lastName");
//         if (campoApellido.value == "") {
//             errores.push("Debe completar con su Apellido")
//         } else if (campoApellido.value.length < 2) {
//             errores.push("El apellido debe contener al menos 2 caracteres")
//         }
//         let email = document.querySelector("input.email");
//         if (email.value == "") {
//             errores.push("Debe completar con su Correo Electronico")
//         } else if (email.value.length < 10) {
//             errores.push("El Correo Electronico NO es valido")
//         }
//         let pass = document.querySelector("input.pass");
//         if (pass.value == "") {
//             errores.push("Complete con su Contraseña ")
//         } else if (pass.value.length < 8) {
//             errores.push("La contraseña debe contener al menos 8 caracteres")
//         }
//         let photo = document.querySelector("input.photo");
//         if (photo.value = "")
//             errores.push("Debe ser un archivo JPG, JPEG, PNG, GIF")

//         if (errores.length > 0) {
//             e.preventDefault();
//         }
        
//         let ulErrores = document.querySelector("div.errores ul");
        
//         for (let i = 0; i < errores.length; i++) {
//             ulErrores.innerHTML += "<li>" + "*" + errores[i] + "</li>"
//         }

//     })

// })

