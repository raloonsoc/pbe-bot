let reeboot = true;
let estado = true;

function estadoFuncion(reb) {
	if (reb == true) {
		reb = "✅";
		return reb;
	} else {
		reb = "🛑";
		return reb;
	}
}

let now = new Date();
let hora = now.toTimeString();
let horas = hora.split(' ')[0];

window.onload = function() {
	var x = document.getElementById("texto-estad");
	x.innerText = `💻 Estado: ${estadoFuncion(estado)}`;
	var y = document.getElementById("texto-reboot");
	y.innerText = `🔃 Reboot: ${estadoFuncion(reeboot)}`;
	var z = document.getElementById("fecha");
	z.innerText = '🗓️ Fecha: ' + now.toLocaleDateString() + " " + " || 🕛 " + horas + "";
	var boton = document.getElementById("close");
	boton.onclick = app.exit();
}