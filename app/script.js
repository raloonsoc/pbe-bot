let reboot = document.getElementById("switch_reboot");
let estado = document.getElementById("switch_estado");

let now = new Date();
let hora = now.toTimeString();
let horas = hora.split(' ')[0];

window.onload = function () {
	var x = document.getElementById("texto-estad");
	x.innerText = `💻 Estado: ${estado.checked ? "✅" : "🛑"}`;
	var y = document.getElementById("texto-reboot");
	y.innerText = `🔃 Reboot: ${reboot.checked ? "✅" : "🛑"}`;
	var z = document.getElementById("fecha");
	z.innerText = '🗓️ Fecha: ' + now.toLocaleDateString() + " " + "   || 🕛 " + horas + "";
	var e = document.getElementById("texto-pbe");
	e.innerText = `📥 PBE: ${'a'}`
}

estado.addEventListener('change', (event) => {
	var x = document.getElementById("texto-estad");
	if (event.currentTarget.checked) {
		x.innerText = `💻 Estado: ✅`;
	} else {
		x.innerText = `💻 Estado: 🛑`;
	}
})
reboot.addEventListener('change', (event) => {
	var y = document.getElementById("texto-reboot");
	if (event.currentTarget.checked) {
		y.innerText = `🔃 Reboot: ✅`;
	} else {
		y.innerText = `🔃 Reboot: 🛑`;
	}
})