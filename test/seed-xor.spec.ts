import { split, combine } from '../ts_src';
import * as tape from 'tape';

// These shares are taken from the Coldcard docs: https://github.com/Coldcard/firmware/blob/1c47b073fc933b2e216d73c980db9d3231b8dd30/docs/seed-xor.md#xor-seed-example-using-3-parts
const DOCS_SHARE_1 =
  'romance wink lottery autumn shop bring dawn tongue range crater truth ability miss spice fitness easy legal release recall obey exchange recycle dragon room';
const DOCS_SHARE_2 =
  'lion misery divide hurry latin fluid camp advance illegal lab pyramid unaware eager fringe sick camera series noodle toy crowd jeans select depth lounge';
const DOCS_SHARE_3 =
  'vault nominee cradle silk own frown throw leg cactus recall talent worry gadget surface shy planet purpose coffee drip few seven term squeeze educate';
const DOCS_COMBINED =
  'silent toe meat possible chair blossom wait occur this worth option bag nurse find fish scene bench asthma bike wage world quit primary indoor';

// These shares are taken from the Coldcard example video: https://www.youtube.com/watch?v=Vl1KHT_-h_Q
const TUTORIAL_SHARE_1 =
  'famous taste quality canvas enable sword kit frequent urge solid attract subject danger robot add slight barrel planet hurt pyramid warrior wild drive myth';
const TUTORIAL_SHARE_2 =
  'arrest boss universe drip crumble effort pink parade suggest lounge air tent car stock coach tongue enable access awesome head rich domain client verb';
const TUTORIAL_COMBINED =
  'gain series drill glad laugh online that witness daring enough arm anger benefit honey convince cool fortune pigeon leg shallow evoke room hat knock';

// These shares are taken from a github issue https://github.com/AndreasGassmann/seed-xor/issues/1
const TEST_12_WORDS_COMBINED =
  'leisure twenty acoustic better student orient deer negative uniform enforce payment hill';
const TEST_12_WORDS_SHARE_1 =
  'happy lucky goddess element beach rare tackle island sniff melt blame gauge';
const TEST_12_WORDS_SHARE_2 =
  'blanket hurdle great fall series company tone tortoise cactus scene repair arctic';

const LOCAL_TEST_12_COMBINED =
  'stomach that exit cave tragic shadow custom stock top second effort exit';

const LOCAL_TEST_24_COMBINED =
  'shift ivory empty runway path enhance pony wisdom pair absorb dinner enhance oval dove achieve soldier wing annual zebra brother consider social glance pole';

tape('create deterministic shares tutorial (2)', async (t) => {
  const [share1, share2] = await split(TUTORIAL_COMBINED, 2);

  t.equal(share1, TUTORIAL_SHARE_1);
  t.equal(share2, TUTORIAL_SHARE_2);

  const reconstructed = await combine([share1, share2]);

  t.equal(reconstructed, TUTORIAL_COMBINED);

  t.end();
});

tape('create deterministic shares 12 words (2)', async (t) => {
  const [share1, share2] = await split(TEST_12_WORDS_COMBINED, 2);

  t.equal(share1, TEST_12_WORDS_SHARE_1);
  t.equal(share2, TEST_12_WORDS_SHARE_2);

  const reconstructed = await combine([share1, share2]);

  t.equal(reconstructed, TEST_12_WORDS_COMBINED);

  t.end();
});

tape('create shares (default)', async (t) => {
  const [share1, share2] = await split(LOCAL_TEST_24_COMBINED);

  t.equal(
    share1,
    'ice habit admit depth syrup satoshi flavor average green topic sign potato dynamic escape essence clerk rug they horse slender ceiling call venture cash',
  );
  t.equal(
    share2,
    'remove burst enhance main labor vote young vicious welcome total voyage time sunny art erode top effort try myself stumble arm unique movie myself',
  );

  const reconstructed = await combine([share1, share2]);

  t.equal(reconstructed, LOCAL_TEST_24_COMBINED);

  t.end();
});

tape('create shares 12 words (default)', async (t) => {
  const [share1, share2] = await split(LOCAL_TEST_12_COMBINED);

  t.equal(
    share1,
    'twenty enter fence exile lecture stereo party boss ribbon electric hat weasel',
  );
  t.equal(
    share2,
    'dial nest brain hidden okay bacon noodle slow fuel lunar connect render',
  );

  const reconstructed = await combine([share1, share2]);

  t.equal(reconstructed, LOCAL_TEST_12_COMBINED);

  t.end();
});

tape('create deterministic shares (2)', async (t) => {
  const [share1, share2] = await split(LOCAL_TEST_24_COMBINED, 2);

  t.equal(
    share1,
    'ice habit admit depth syrup satoshi flavor average green topic sign potato dynamic escape essence clerk rug they horse slender ceiling call venture cash',
  );
  t.equal(
    share2,
    'remove burst enhance main labor vote young vicious welcome total voyage time sunny art erode top effort try myself stumble arm unique movie myself',
  );

  const reconstructed = await combine([share1, share2]);

  t.equal(reconstructed, LOCAL_TEST_24_COMBINED);

  t.end();
});

tape('create deterministic shares (3)', async (t) => {
  const [share1, share2, share3] = await split(LOCAL_TEST_24_COMBINED, 3);

  t.equal(
    share1,
    'crowd loud stage idle lizard street capital camp resource digital quantum million light tower destroy chalk legend wrist main sand order ladder hockey people',
  );
  t.equal(
    share2,
    'fat diagram object kangaroo there ridge hat episode witness left usual diesel elite pave install bind unfair truck seek direct ramp option just kiwi',
  );
  t.equal(
    share3,
    'pepper soda agree reform seat chalk unaware number stage dragon gentle wing feature all embrace wood hard bullet river outer acoustic clay jeans latin',
  );

  const reconstructed = await combine([share1, share2, share3]);

  t.equal(reconstructed, LOCAL_TEST_24_COMBINED);

  t.end();
});

tape('create deterministic shares 12 words (3)', async (t) => {
  const [share1, share2, share3] = await split(LOCAL_TEST_12_COMBINED, 3);

  t.equal(
    share1,
    'million nephew luxury copy boost cram edit slender account hint okay nut',
  );
  t.equal(
    share2,
    'illness play accident famous galaxy super area course ritual switch apple country',
  );
  t.equal(
    share3,
    'close unknown slim edit payment consider knife clown garment intact sting trick',
  );

  const reconstructed = await combine([share1, share2, share3]);

  t.equal(reconstructed, LOCAL_TEST_12_COMBINED);

  t.end();
});

tape('create deterministic shares (4)', async (t) => {
  const [share1, share2, share3, share4] = await split(
    LOCAL_TEST_24_COMBINED,
    4,
  );

  t.equal(
    share1,
    'fix drastic zebra congress athlete right differ trigger mask produce repeat eternal occur system like fluid team slab normal age shock economy ride settle',
  );
  t.equal(
    share2,
    'squeeze elbow man frost chaos memory typical shrug puppy hotel category stool cost similar stage drip lizard idle magnet remind reveal cruel thunder caution',
  );
  t.equal(
    share3,
    'wild check length lonely slot giraffe someone maximum salad improve claim sustain sun range until wool train refuse question patch found exist tribe tube',
  );
  t.equal(
    share4,
    'relief fee race erosion duty breeze salute foot already resemble lyrics argue uncle tomorrow risk citizen dolphin also duck artwork ask vacuum spirit people',
  );

  const reconstructed = await combine([share1, share2, share3, share4]);

  t.equal(reconstructed, LOCAL_TEST_24_COMBINED);

  t.end();
});

tape('create deterministic shares 12 words (4)', async (t) => {
  const [share1, share2, share3, share4] = await split(
    LOCAL_TEST_12_COMBINED,
    4,
  );

  t.equal(
    share1,
    'develop genuine tissue pet beach frozen unaware grace dragon slow diagram cloud',
  );
  t.equal(
    share2,
    'melody cruel organ license orbit theme talent shock text glare hamster polar',
  );
  t.equal(
    share3,
    'boss scorpion hungry dolphin practice lonely where define garlic soldier garbage super',
  );
  t.equal(
    share4,
    'key enrich fun edge shove width worry erosion charge pear estate bread',
  );

  const reconstructed = await combine([share1, share2, share3, share4]);

  t.equal(reconstructed, LOCAL_TEST_12_COMBINED);

  t.end();
});

tape('create random shares and reconstruct', async (t) => {
  {
    const [share1, share2] = await split(LOCAL_TEST_24_COMBINED, 2, true);
    const reconstructed = await combine([share1, share2]);
    t.equal(reconstructed, LOCAL_TEST_24_COMBINED);
  }
  {
    const [share1, share2, share3] = await split(
      LOCAL_TEST_24_COMBINED,
      3,
      true,
    );
    const reconstructed = await combine([share1, share2, share3]);
    t.equal(reconstructed, LOCAL_TEST_24_COMBINED);
  }
  {
    const [share1, share2, share3, share4] = await split(
      LOCAL_TEST_24_COMBINED,
      4,
      true,
    );
    const reconstructed = await combine([share1, share2, share3, share4]);
    t.equal(reconstructed, LOCAL_TEST_24_COMBINED);
  }

  t.end();
});

tape('create random shares and reconstruct 12 words', async (t) => {
  {
    const [share1, share2] = await split(LOCAL_TEST_12_COMBINED, 2, true);
    console.log([share1, share2]);
    const reconstructed = await combine([share1, share2]);
    t.equal(reconstructed, LOCAL_TEST_12_COMBINED);
  }
  {
    const [share1, share2, share3] = await split(
      LOCAL_TEST_12_COMBINED,
      3,
      true,
    );
    const reconstructed = await combine([share1, share2, share3]);
    t.equal(reconstructed, LOCAL_TEST_12_COMBINED);
  }
  {
    const [share1, share2, share3, share4] = await split(
      LOCAL_TEST_12_COMBINED,
      4,
      true,
    );
    const reconstructed = await combine([share1, share2, share3, share4]);
    t.equal(reconstructed, LOCAL_TEST_12_COMBINED);
  }

  t.end();
});

tape('reconstruct seed', async (t) => {
  const reconstructed = await combine([
    DOCS_SHARE_1,
    DOCS_SHARE_2,
    DOCS_SHARE_3,
  ]);

  t.equal(reconstructed, DOCS_COMBINED);

  t.end();
});

tape('reconstruct seed in any combination', async (t) => {
  t.equal(
    await combine([DOCS_SHARE_1, DOCS_SHARE_2, DOCS_SHARE_3]),
    DOCS_COMBINED,
  );
  t.equal(
    await combine([DOCS_SHARE_1, DOCS_SHARE_3, DOCS_SHARE_2]),
    DOCS_COMBINED,
  );
  t.equal(
    await combine([DOCS_SHARE_2, DOCS_SHARE_1, DOCS_SHARE_3]),
    DOCS_COMBINED,
  );
  t.equal(
    await combine([DOCS_SHARE_2, DOCS_SHARE_3, DOCS_SHARE_1]),
    DOCS_COMBINED,
  );
  t.equal(
    await combine([DOCS_SHARE_3, DOCS_SHARE_1, DOCS_SHARE_2]),
    DOCS_COMBINED,
  );
  t.equal(
    await combine([DOCS_SHARE_3, DOCS_SHARE_2, DOCS_SHARE_1]),
    DOCS_COMBINED,
  );

  t.end();
});

tape('fail if share is invalid', async (t) => {
  t.plan(1);

  combine(['test', DOCS_SHARE_2, DOCS_SHARE_3]).catch(() => {
    t.pass();
    t.end();
  });
});

tape('fail if share is invalid length', async (t) => {
  t.plan(1);

  combine([
    'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
    DOCS_SHARE_2,
    DOCS_SHARE_3,
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

  split(DOCS_COMBINED, 5 as any).catch(() => {
    t.pass();
    t.end();
  });
});

tape('fail if shares have different lengths', async (t) => {
  t.plan(1);

  // Store original function
  const originalBitwiseXor = require('../ts_src/utils').bitwiseXorHexString;

  try {
    // Mock the function to return a different length string
    require('../ts_src/utils').bitwiseXorHexString = () => '1234';

    await split(LOCAL_TEST_12_COMBINED, 2);
  } catch (error: any) {
    t.equal(
      error.message,
      '[SeedXOR]: Not all final shares are the same length',
    );
  } finally {
    // Restore original function
    require('../ts_src/utils').bitwiseXorHexString = originalBitwiseXor;
  }

  t.end();
});
