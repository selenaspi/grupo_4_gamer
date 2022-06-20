window.addEventListener("load", function () {
    let formulario = document.querySelector("form.register");

    formulario.addEventListener("submit", function (e) {
        

        let errores = [];

        let campoNombre = document.querySelector("input.name");

        if (campoNombre.value == "") {
            errores.push("Debe completar con su Nombre")

        } else if (campoNombre.value.length < 3) {
            errores.push("El nombre debe tener al menos 3 caracteres")
        }
        let campoApellido = document.querySelector("input.lastName");
        if (campoApellido.value == "") {
            errores.push("Debe completar con su Apellido")
        } else if (campoApellido.value.length < 3) {
            errores.push("El apellido debe contener al menos 3 caracteres")
        }
        let email = document.querySelector("input.email");
        if (email.value == "") {
            errores.push("Debe completar con su Correo Electronico")
        } else if (email.value.length < 5) {
            errores.push("El Correo Electronico NO es valido")
        }
        let pass = document.querySelector("input.pass");
        if (pass.value == "") {
            errores.push("Complete con su Contraseña ")
        } else if (pass.value.length < 6) {
            errores.push("La contraseña debe contener al menos 6 caracteres")
        }
        let phone = document.querySelector("input.phone");
        if (phone.value == "") {
            errores.push("Debe completar con su Telefono")
        } else if (phone.value.length < 9) {
            errores.push("El Telefono debe contener menos de 9 caracteres")
        }

        let date = document.querySelector("input.date");
        if (date.value == "") {
            errores.push("Complete con su Fecha de Nacimiento")
        }
        let direccion = document.querySelector("input.direccion");
        if (direccion.value == "") {
            errores.push("Complete con su Direccion")
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

