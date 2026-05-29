document.addEventListener("DOMContentLoaded", function() {
    const selector = document.getElementById("selectorProblema");
    const label = document.getElementById("labelDato");
    const input = document.getElementById("inputDato");
    const formulario = document.getElementById("formularioMatematico");

    selector.addEventListener("change", function() {
        if (selector.value === "primo") {
            label.textContent = "Ingresa el código numérico a verificar:";
            input.placeholder = "Ej. 17";
        } else if (selector.value === "fibo") {
            label.textContent = "Ingresa la cantidad de meses de ahorro:";
            input.placeholder = "Ej. 6";
        } else {
            label.textContent = "Ingresa la cantidad de términos a generar:";
            input.placeholder = "Ej. 10";
        }
    });

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();
        procesarProblema();
    });
});

// Algoritmo Optimizado Profesional para Números Primos
function esPrimo(numero) {
    if (numero <= 1) return false;
    if (numero === 2) return true;
    if (numero % 2 === 0) return false; // Descarta pares rápido
    
    // Solo busca divisores hasta la raíz cuadrada del número (mucho más rápido)
    for (let i = 3; i <= Math.sqrt(numero); i += 2) {
        if (numero % i === 0) return false;
    }
    return true;
}

function procesarProblema() {
    const tipo = document.getElementById("selectorProblema").value;
    const valor = parseInt(document.getElementById("inputDato").value);
    const areaResultado = document.getElementById("areaResultado");
    
    areaResultado.classList.remove("oculto");
    areaResultado.innerHTML = "";

    if (tipo === "primo") {
        if (esPrimo(valor)) {
            areaResultado.innerHTML = `
                <h3>✦ Resultado de Validación</h3>
                <p>El código <span class="caja-numero es-primo" style="display:inline-block; padding: 2px 10px; font-size:0.9rem;">${valor}</span> es <strong>perfectamente válido</strong> (Es un número primo de seguridad).</p>
            `;
        } else {
            areaResultado.innerHTML = `
                <h3>✦ Resultado de Validación</h3>
                <p>El código <strong>${valor}</strong> <span style="color:#cf6a87; font-weight:bold;">NO es válido</span> (No cumple los requisitos de número primo).</p>
            `;
        }
    } 
    else if (tipo === "fibo") {
        let a = 0, b = 1, c;
        let total = 0;
        let contenido = `<h3>🌱 Plan de Ahorro Mensual</h3><ul style="list-style: none; padding: 0; margin-bottom: 15px;">`;
        
        for (let i = 1; i <= valor; i++) {
            let ahorroMes = (i === 1) ? 1 : b;
            total += ahorroMes;
            contenido += `
                <li style="background: white; padding: 10px 15px; margin-bottom: 8px; border-radius: 10px; display: flex; justify-content: space-between; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
                    <span>Mes ${i}</span>
                    <strong style="color: #6c5b7b;">Bs. ${ahorroMes}</strong>
                </li>`;
            
            if (i > 1) {
                c = a + b;
                a = b;
                b = c;
            }
        }
        contenido += `</ul><p style="font-size: 1.1rem; text-align: right;">✨ <strong>Total acumulado: <span style="color:#cf6a87; font-size:1.3rem;">Bs. ${total}</span></strong></p>`;
        areaResultado.innerHTML = contenido;
    } 
    else if (tipo === "combinado") {
        let a = 0, b = 1, c;
        let contenido = `<h3>🌌 Secuencia Combinada</h3><p style="font-size:0.9rem; margin-bottom:15px; color:#6c5b7b;">Los números dorados representan los eslabones primos de la secuencia.</p><div class="grid-numeros">`;
        
        for (let i = 1; i <= valor; i++) {
            let numeroActual = a;
            let claseAgregada = esPrimo(numeroActual) ? "es-primo" : "";
            
            contenido += `<div class="caja-numero ${claseAgregada}">${numeroActual}</div>`;
            
            c = a + b;
            a = b;
            b = c;
        }
        contenido += `</div>`;
        areaResultado.innerHTML = contenido;
    }
}
