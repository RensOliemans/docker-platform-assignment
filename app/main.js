const form = document.querySelector("#primes");

async function showPrimes(event) {
    const n = event.target.elements['n'].value;

    try {
	showResponse(n, []);
	showStatus(`Computing result...`);
	const response = await fetch(`/api/primes-until/${n}`);
	const body = await response.json();
	const primes = body.primes;
	showResponse(n, primes);
    } catch (e) {
	console.error(e);
	showStatus(`Failed to compute result.`);
    }
}

function showStatus(status) {
    const intro = document.querySelector("#primes-intro");
    intro.innerText = status;
}

function showResponse(n, primes) {
    const intro = document.querySelector("#primes-intro");
    intro.innerText = `Primes lower than ${n}:`;

    const sequence = document.querySelector("#sequence");
    sequence.innerText = primes.join(', ');
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    showPrimes(event);
});
