window.addEventListener("load", function () {
    let formulario = document.querySelector("form.login");

    formulario.addEventListener("submit", function (e) {


        let errores = [];
        let email = document.querySelector("input.email");
        if (email.value == "") {
            errores.push("Debe completar con su Correo Electronico")
        } else if (email.value.length < 5) {
            errores.push("El Correo Electronico NO es valido")
        }
        let pass = document.querySelector("input.password");
        if (pass.value == "") {
            errores.push("Complete con su Contraseña ")
        } else if (pass.value.length < 6) {
            errores.push("La contraseña debe contener al menos 6 caracteres")
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
