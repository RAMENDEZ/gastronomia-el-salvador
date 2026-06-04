document.addEventListener("DOMContentLoaded", () => {
    
    // --- EFECTO DE SCROLL EN NAVBAR ---
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- MENÚ HAMBURGUESA ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Cerrar el menú al hacer clic en un enlace (móvil)
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- VALIDACIÓN DE FORMULARIO ---
    const form = document.getElementById("contactForm");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Detener envío por defecto
        
        let isValid = true;
        
        // Expresión regular para email válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validación Nombre
        if (nombre.value.trim() === "") {
            showError("errorNombre", "Por favor, ingresa tu nombre completo.");
            isValid = false;
        } else {
            clearError("errorNombre");
        }

        // Validación Email
        if (email.value.trim() === "") {
            showError("errorEmail", "El correo electrónico es obligatorio.");
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError("errorEmail", "Por favor, ingresa un formato de correo válido.");
            isValid = false;
        } else {
            clearError("errorEmail");
        }

        // Validación Mensaje
        if (mensaje.value.trim() === "") {
            showError("errorMensaje", "El mensaje o pedido no puede estar vacío.");
            isValid = false;
        } else if (mensaje.value.trim().length < 10) {
            showError("errorMensaje", "El mensaje debe tener al menos 10 caracteres.");
            isValid = false;
        } else {
            clearError("errorMensaje");
        }

        // Si todo es válido
        if (isValid) {
            successMessage.style.display = "block";
            form.reset(); // Limpia campos
            
            // Ocultar mensaje de éxito después de 5 segundos
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 5000);
        }
    });

    // Funciones auxiliares para errores e interactividad limpia al corregir
    function showError(idElemento, mensajeError) {
        const spanError = document.getElementById(idElemento);
        spanError.textContent = mensajeError;
    }

    function clearError(idElemento) {
        const spanError = document.getElementById(idElemento);
        spanError.textContent = "";
    }

    // Limpiar errores en tiempo real mientras el usuario escribe
    nombre.addEventListener("input", () => { if(nombre.value.trim() !== "") clearError("errorNombre"); });
    email.addEventListener("input", () => { if(email.value.trim() !== "") clearError("errorEmail"); });
    mensaje.addEventListener("input", () => { if(mensaje.value.trim().length >= 10) clearError("errorMensaje"); });
});