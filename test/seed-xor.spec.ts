import { split, combine } from '../ts_src';
import * as tape from 'tape';

// https://github.com/Coldcard/firmware/blob/1c47b073fc933b2e216d73c980db9d3231b8dd30/docs/seed-xor.md#xor-seed-example-using-3-parts

const share1 =
  'romance wink lottery autumn shop bring dawn tongue range crater truth ability miss spice fitness easy legal release recall obey exchange recycle dragon room';
const share2 =
  'lion misery divide hurry latin fluid camp advance illegal lab pyramid unaware eager fringe sick camera series noodle toy crowd jeans select depth lounge';
const share3 =
  'vault nominee cradle silk own frown throw leg cactus recall talent worry gadget surface shy planet purpose coffee drip few seven term squeeze educate';
const combined =
  'silent toe meat possible chair blossom wait occur this worth option bag nurse find fish scene bench asthma bike wage world quit primary indoor';

tape('create shares (default)', async (t) => {
  const [share1, share2] = await split(combined);

  t.equal(
    share1,
    'absurd tool nose scrap settle nurse execute arrow grape olympic tiny focus ethics rose alien good orient biology stumble soul enjoy useful raven merge',
  );
  t.equal(
    share2,
    'siren already broccoli hazard ticket moon rich nerve lunar guilt keep entry surface turkey faint pilot maze blur screen define require dizzy boat tower',
  );

  t.end();
});

tape('create deterministic shares (2)', async (t) => {
  const [share1, share2] = await split(combined, 2);

  t.equal(
    share1,
    'absurd tool nose scrap settle nurse execute arrow grape olympic tiny focus ethics rose alien good orient biology stumble soul enjoy useful raven merge',
  );
  t.equal(
    share2,
    'siren already broccoli hazard ticket moon rich nerve lunar guilt keep entry surface turkey faint pilot maze blur screen define require dizzy boat tower',
  );

  const reconstructed = await combine([share1, share2]);

  t.equal(reconstructed, combined);

  t.end();
});

tape('create deterministic shares (3)', async (t) => {
  const [share1, share2, share3] = await split(combined, 3);

  t.equal(
    share1,
    'ridge result situate quote lemon lift enemy regret champion chuckle pelican escape document fatigue place clarify lesson drama dry skull there boring arrest ugly',
  );
  t.equal(
    share2,
    'dolphin water pilot tide miss myth page young tip ancient raven escape unhappy avocado view pencil fall polar mirror sleep vanish man blouse raccoon',
  );
  t.equal(
    share3,
    'couple phone trap welcome style armor cannon spring cattle target merit bag deny appear account envelope shrug twice submit water uncle couch same curious',
  );

  const reconstructed = await combine([share1, share2, share3]);

  t.equal(reconstructed, combined);

  t.end();
});

tape('create deterministic shares (4)', async (t) => {
  const [share1, share2, share3, share4] = await split(combined, 4);

  t.equal(
    share1,
    'color organ film honey divide foot ice pass buzz section scrap sauce elegant ribbon enrich fetch merit flock elder cross solve leg marriage source',
  );
  t.equal(
    share2,
    'attend scout drum mansion pen upset manage electric nerve tide enemy medal remind night expand baby length page unlock upon garment cram lumber devote',
  );
  t.equal(
    share3,
    'word cake forum exact hazard fold ridge antenna tribe elevator job prosper add replace twelve car story endless hill embark soup vanish clip visit',
  );
  t.equal(
    share4,
    'bike page settle arrow spider warrior rice item lock offer hen match group smooth pole pledge siege length state goose person become minute ivory',
  );

  const reconstructed = await combine([share1, share2, share3, share4]);

  t.equal(reconstructed, combined);

  t.end();
});

tape('create random shares and reconstruct', async (t) => {
  {
    const [share1, share2] = await split(combined, 2, true);
    const reconstructed = await combine([share1, share2]);
    t.equal(reconstructed, combined);
  }
  {
    const [share1, share2, share3] = await split(combined, 3, true);
    const reconstructed = await combine([share1, share2, share3]);
    t.equal(reconstructed, combined);
  }
  {
    const [share1, share2, share3, share4] = await split(combined, 4, true);
    const reconstructed = await combine([share1, share2, share3, share4]);
    t.equal(reconstructed, combined);
  }

  t.end();
});

tape('reconstruct seed', async (t) => {
  const reconstructed = await combine([share1, share2, share3]);

  t.equal(reconstructed, combined);

  t.end();
});

tape('reconstruct seed in any combination', async (t) => {
  t.equal(await combine([share1, share2, share3]), combined);
  t.equal(await combine([share1, share3, share2]), combined);
  t.equal(await combine([share2, share1, share3]), combined);
  t.equal(await combine([share2, share3, share1]), combined);
  t.equal(await combine([share3, share1, share2]), combined);
  t.equal(await combine([share3, share2, share1]), combined);

  t.end();
});

tape('fail if share is invalid', async (t) => {
  t.plan(1);

  combine(['test', share2, share3]).catch(() => {
    t.pass();
    t.end();
  });
});

tape('fail if share is invalid length', async (t) => {
  t.plan(1);

  combine([
    'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
    share2,
    share3,
  ]).catch(() => {
    t.pass();
    t.end();
  });
});

tape('fail if seed is invalid', async (t) => {
  t.plan(1);

  split('abandon').catch(() => {
    t.pass();
    t.end();
  });
});

tape('fail if called with invalid number of shares', async (t) => {
  t.plan(1);

  split(combined, 5 as any).catch(() => {
    t.pass();
    t.end();
  });
});
