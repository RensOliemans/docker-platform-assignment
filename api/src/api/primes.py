def primes_until(n: int):
    """Uses the Sieve of Eratosthenes to return the primes lower than `n`."""
    try:
        n = int(n)
    except (ValueError, TypeError) as e:
        raise ValueError("n should be an integer") from e

    if n < 2:
        raise ValueError("n should be larger than 1")

    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False

    primes = list()

    for i, _ in enumerate(is_prime):
        prime = is_prime[i]
        if prime:
            primes.append(i)
            for j in range(i, n, i):
                is_prime[j] = False

    return primes
