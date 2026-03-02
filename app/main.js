const form = document.querySelector("#primes");

async function showPrimes(event) {
    const n = event.target.elements['n'].value;

    try {
	showNumbers(n, []);
	showStatus(`Computing result...`);
	const response = await fetch(`/api/primes-until/${n}`);
	const body = await response.json();

	if (!response.ok) {
	    showStatus(`Error ${response.status}: ${body.error ?? "Failed to compute"}`);
	    return;
	};

	showStatus(`Primes lower than ${n}:`);
	showNumbers(n, body.primes);
    } catch (e) {
	console.error(e);
	showStatus(`Failed to compute result.`);
    }
}

function showStatus(status) {
    const intro = document.querySelector("#primes-intro");
    intro.innerText = status;
}

function showNumbers(n, primes) {
    const sequence = document.querySelector("#sequence");
    sequence.innerText = primes.join(', ');
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    showPrimes(event);
});
