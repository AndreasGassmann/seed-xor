import { combine, split } from '../ts_src';

const original =
  'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';

(async () => {
  console.log('Original:', original);

  const [share1, share2, share3] = await split(original, 3, true);

  console.log('Share 1:', share1);
  console.log('Share 2:', share2);
  console.log('Share 3:', share3);

  const recovered = await combine([share1, share2, share3]);

  console.log('Recovered:', recovered);
})();
