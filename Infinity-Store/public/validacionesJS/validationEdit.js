window.addEventListener("load", function () {
    let formulario = document.querySelector("form.edit");

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
            errores.push("El apellido debe contener al menos 3 caracteres")
        }
        let email = document.querySelector("input.email");
        if (email.value == "") {
            errores.push("Debe completar con su Correo Electronico")
        } else if (email.value.length < 5) {
            errores.push("El Correo Electronico NO es valido")
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
