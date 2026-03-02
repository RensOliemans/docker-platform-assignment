const form = document.querySelector("#primes");

async function showPrimes(event) {
    const n = event.target.elements['n'].value;

    try {
	const response = await fetch(`/api/primes-until/${n}`);
	const body = await response.json();
	const primes = body.primes;
	showResponse(n, primes);
    } catch (e) {
	console.error(e);
    }
}

function showResponse(n, primes) {
    const displayElement = document.querySelector("#display-primes");
    displayElement.innerText = `Primes lower than ${n}: ${primes}`;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    showPrimes(event);
});
