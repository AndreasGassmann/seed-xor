import { test, expect, vi } from 'vitest';
import { split, combine } from '../ts_src/index.js';
import * as utils from '../ts_src/utils.js';

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

// 12 Words XOR Seed Example Using 3 Parts from the Coldcard docs
const DOCS_12_SHARE_1 =
  'romance wink lottery autumn shop bring dawn tongue range crater truth ability';
const DOCS_12_SHARE_2 =
  'boat unfair shell violin tree robust open ride visual forest vintage approve';
const DOCS_12_SHARE_3 =
  'lion misery divide hurry latin fluid camp advance illegal lab pyramid unhappy';
const DOCS_12_COMBINED =
  'cannon opinion leader nephew found yard metal galaxy crouch between real trade';

// 12 Words XOR example from the Rust seedxor library: https://github.com/kaiwolfram/seed-xor
const RUST_12_SHARE_1 =
  'vault junior rather gentle fresh measure waste powder resemble ocean until body';
const RUST_12_SHARE_2 =
  'defy one debate situate jungle music achieve cradle fiscal govern intact acquire';
const RUST_12_COMBINED =
  'silent toe meat possible chair blossom wait occur this worth option boy';

// 12 Words XOR 3-part test vector from Coldcard firmware tests
const CC_TEST_12_SHARE_1 =
  'become wool crumble brand camera cement gloom sell stand once connect stage';
const CC_TEST_12_SHARE_2 =
  'save saddle indicate embrace detail weasel spread life staff mushroom bicycle light';
const CC_TEST_12_SHARE_3 =
  'unlock damp injury tape enhance pause sheriff onion valley panic finger moon';
const CC_TEST_12_COMBINED =
  'drama jeans craft mixture filter lamp invest suggest vacant neutral history swim';

// 18 Words XOR 3-part test vector from Coldcard firmware tests
const CC_TEST_18_SHARE_1 =
  'example twelve meadow embrace neither sign ribbon equal inspire guess episode piece fatal unlock prefer unhappy vanish curtain';
const CC_TEST_18_SHARE_2 =
  'ostrich present hold dwarf area say act carpet eight jeans student warfare access cause offer suit dawn height';
const CC_TEST_18_SHARE_3 =
  'sure lawsuit half gym fatal column remain dash cage orchard frame reform robust social inspire online evolve lobster';
const CC_TEST_18_COMBINED =
  'ancient dish minute goddess smooth foil auction floor bean mimic scale transfer trumpet alter echo push mass task';

// Edge case seeds from Coldcard firmware tests
const ZERO_18 =
  'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent';
const ONES_18 =
  'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo when';

// Edge case seeds from Coldcard firmware tests
const ZERO_24 =
  'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';
const ONES_24 =
  'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo vote';
const ZERO_12 =
  'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const ONES_12 = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong';

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

test('create deterministic shares tutorial (2)', async () => {
  const [share1, share2] = await split(TUTORIAL_COMBINED, 2);

  expect(share1).toBe(TUTORIAL_SHARE_1);
  expect(share2).toBe(TUTORIAL_SHARE_2);

  const reconstructed = await combine([share1, share2]);

  expect(reconstructed).toBe(TUTORIAL_COMBINED);
});

test('create deterministic shares 12 words (2)', async () => {
  const [share1, share2] = await split(TEST_12_WORDS_COMBINED, 2);

  expect(share1).toBe(TEST_12_WORDS_SHARE_1);
  expect(share2).toBe(TEST_12_WORDS_SHARE_2);

  const reconstructed = await combine([share1, share2]);

  expect(reconstructed).toBe(TEST_12_WORDS_COMBINED);
});

test('create shares (default)', async () => {
  const [share1, share2] = await split(LOCAL_TEST_24_COMBINED);

  expect(share1).toBe(
    'ice habit admit depth syrup satoshi flavor average green topic sign potato dynamic escape essence clerk rug they horse slender ceiling call venture cash',
  );
  expect(share2).toBe(
    'remove burst enhance main labor vote young vicious welcome total voyage time sunny art erode top effort try myself stumble arm unique movie myself',
  );

  const reconstructed = await combine([share1, share2]);

  expect(reconstructed).toBe(LOCAL_TEST_24_COMBINED);
});

test('create shares 12 words (default)', async () => {
  const [share1, share2] = await split(LOCAL_TEST_12_COMBINED);

  expect(share1).toBe(
    'twenty enter fence exile lecture stereo party boss ribbon electric hat weasel',
  );
  expect(share2).toBe(
    'dial nest brain hidden okay bacon noodle slow fuel lunar connect render',
  );

  const reconstructed = await combine([share1, share2]);

  expect(reconstructed).toBe(LOCAL_TEST_12_COMBINED);
});

test('create deterministic shares (2)', async () => {
  const [share1, share2] = await split(LOCAL_TEST_24_COMBINED, 2);

  expect(share1).toBe(
    'ice habit admit depth syrup satoshi flavor average green topic sign potato dynamic escape essence clerk rug they horse slender ceiling call venture cash',
  );
  expect(share2).toBe(
    'remove burst enhance main labor vote young vicious welcome total voyage time sunny art erode top effort try myself stumble arm unique movie myself',
  );

  const reconstructed = await combine([share1, share2]);

  expect(reconstructed).toBe(LOCAL_TEST_24_COMBINED);
});

test('create deterministic shares (3)', async () => {
  const [share1, share2, share3] = await split(LOCAL_TEST_24_COMBINED, 3);

  expect(share1).toBe(
    'crowd loud stage idle lizard street capital camp resource digital quantum million light tower destroy chalk legend wrist main sand order ladder hockey people',
  );
  expect(share2).toBe(
    'fat diagram object kangaroo there ridge hat episode witness left usual diesel elite pave install bind unfair truck seek direct ramp option just kiwi',
  );
  expect(share3).toBe(
    'pepper soda agree reform seat chalk unaware number stage dragon gentle wing feature all embrace wood hard bullet river outer acoustic clay jeans latin',
  );

  const reconstructed = await combine([share1, share2, share3]);

  expect(reconstructed).toBe(LOCAL_TEST_24_COMBINED);
});

test('create deterministic shares 12 words (3)', async () => {
  const [share1, share2, share3] = await split(LOCAL_TEST_12_COMBINED, 3);

  expect(share1).toBe(
    'million nephew luxury copy boost cram edit slender account hint okay nut',
  );
  expect(share2).toBe(
    'illness play accident famous galaxy super area course ritual switch apple country',
  );
  expect(share3).toBe(
    'close unknown slim edit payment consider knife clown garment intact sting trick',
  );

  const reconstructed = await combine([share1, share2, share3]);

  expect(reconstructed).toBe(LOCAL_TEST_12_COMBINED);
});

test('create deterministic shares (4)', async () => {
  const [share1, share2, share3, share4] = await split(
    LOCAL_TEST_24_COMBINED,
    4,
  );

  expect(share1).toBe(
    'fix drastic zebra congress athlete right differ trigger mask produce repeat eternal occur system like fluid team slab normal age shock economy ride settle',
  );
  expect(share2).toBe(
    'squeeze elbow man frost chaos memory typical shrug puppy hotel category stool cost similar stage drip lizard idle magnet remind reveal cruel thunder caution',
  );
  expect(share3).toBe(
    'wild check length lonely slot giraffe someone maximum salad improve claim sustain sun range until wool train refuse question patch found exist tribe tube',
  );
  expect(share4).toBe(
    'relief fee race erosion duty breeze salute foot already resemble lyrics argue uncle tomorrow risk citizen dolphin also duck artwork ask vacuum spirit people',
  );

  const reconstructed = await combine([share1, share2, share3, share4]);

  expect(reconstructed).toBe(LOCAL_TEST_24_COMBINED);
});

test('create deterministic shares 12 words (4)', async () => {
  const [share1, share2, share3, share4] = await split(
    LOCAL_TEST_12_COMBINED,
    4,
  );

  expect(share1).toBe(
    'develop genuine tissue pet beach frozen unaware grace dragon slow diagram cloud',
  );
  expect(share2).toBe(
    'melody cruel organ license orbit theme talent shock text glare hamster polar',
  );
  expect(share3).toBe(
    'boss scorpion hungry dolphin practice lonely where define garlic soldier garbage super',
  );
  expect(share4).toBe(
    'key enrich fun edge shove width worry erosion charge pear estate bread',
  );

  const reconstructed = await combine([share1, share2, share3, share4]);

  expect(reconstructed).toBe(LOCAL_TEST_12_COMBINED);
});

test('create random shares and reconstruct', async () => {
  {
    const [share1, share2] = await split(LOCAL_TEST_24_COMBINED, 2, true);
    const reconstructed = await combine([share1, share2]);
    expect(reconstructed).toBe(LOCAL_TEST_24_COMBINED);
  }
  {
    const [share1, share2, share3] = await split(
      LOCAL_TEST_24_COMBINED,
      3,
      true,
    );
    const reconstructed = await combine([share1, share2, share3]);
    expect(reconstructed).toBe(LOCAL_TEST_24_COMBINED);
  }
  {
    const [share1, share2, share3, share4] = await split(
      LOCAL_TEST_24_COMBINED,
      4,
      true,
    );
    const reconstructed = await combine([share1, share2, share3, share4]);
    expect(reconstructed).toBe(LOCAL_TEST_24_COMBINED);
  }
});

test('create random shares and reconstruct 12 words', async () => {
  {
    const [share1, share2] = await split(LOCAL_TEST_12_COMBINED, 2, true);
    const reconstructed = await combine([share1, share2]);
    expect(reconstructed).toBe(LOCAL_TEST_12_COMBINED);
  }
  {
    const [share1, share2, share3] = await split(
      LOCAL_TEST_12_COMBINED,
      3,
      true,
    );
    const reconstructed = await combine([share1, share2, share3]);
    expect(reconstructed).toBe(LOCAL_TEST_12_COMBINED);
  }
  {
    const [share1, share2, share3, share4] = await split(
      LOCAL_TEST_12_COMBINED,
      4,
      true,
    );
    const reconstructed = await combine([share1, share2, share3, share4]);
    expect(reconstructed).toBe(LOCAL_TEST_12_COMBINED);
  }
});

test('reconstruct seed', async () => {
  const reconstructed = await combine([
    DOCS_SHARE_1,
    DOCS_SHARE_2,
    DOCS_SHARE_3,
  ]);

  expect(reconstructed).toBe(DOCS_COMBINED);
});

test('reconstruct seed in any combination', async () => {
  expect(await combine([DOCS_SHARE_1, DOCS_SHARE_2, DOCS_SHARE_3])).toBe(
    DOCS_COMBINED,
  );
  expect(await combine([DOCS_SHARE_1, DOCS_SHARE_3, DOCS_SHARE_2])).toBe(
    DOCS_COMBINED,
  );
  expect(await combine([DOCS_SHARE_2, DOCS_SHARE_1, DOCS_SHARE_3])).toBe(
    DOCS_COMBINED,
  );
  expect(await combine([DOCS_SHARE_2, DOCS_SHARE_3, DOCS_SHARE_1])).toBe(
    DOCS_COMBINED,
  );
  expect(await combine([DOCS_SHARE_3, DOCS_SHARE_1, DOCS_SHARE_2])).toBe(
    DOCS_COMBINED,
  );
  expect(await combine([DOCS_SHARE_3, DOCS_SHARE_2, DOCS_SHARE_1])).toBe(
    DOCS_COMBINED,
  );
});

test('reconstruct 12 words seed from docs', async () => {
  const reconstructed = await combine([
    DOCS_12_SHARE_1,
    DOCS_12_SHARE_2,
    DOCS_12_SHARE_3,
  ]);

  expect(reconstructed).toBe(DOCS_12_COMBINED);
});

test('reconstruct 12 words seed from docs in any combination', async () => {
  expect(
    await combine([DOCS_12_SHARE_1, DOCS_12_SHARE_2, DOCS_12_SHARE_3]),
  ).toBe(DOCS_12_COMBINED);
  expect(
    await combine([DOCS_12_SHARE_1, DOCS_12_SHARE_3, DOCS_12_SHARE_2]),
  ).toBe(DOCS_12_COMBINED);
  expect(
    await combine([DOCS_12_SHARE_2, DOCS_12_SHARE_1, DOCS_12_SHARE_3]),
  ).toBe(DOCS_12_COMBINED);
  expect(
    await combine([DOCS_12_SHARE_2, DOCS_12_SHARE_3, DOCS_12_SHARE_1]),
  ).toBe(DOCS_12_COMBINED);
  expect(
    await combine([DOCS_12_SHARE_3, DOCS_12_SHARE_1, DOCS_12_SHARE_2]),
  ).toBe(DOCS_12_COMBINED);
  expect(
    await combine([DOCS_12_SHARE_3, DOCS_12_SHARE_2, DOCS_12_SHARE_1]),
  ).toBe(DOCS_12_COMBINED);
});

test('reconstruct 12 words seed from rust seedxor example', async () => {
  const reconstructed = await combine([RUST_12_SHARE_1, RUST_12_SHARE_2]);

  expect(reconstructed).toBe(RUST_12_COMBINED);
});

test('reconstruct 12 words seed from coldcard firmware tests', async () => {
  const reconstructed = await combine([
    CC_TEST_12_SHARE_1,
    CC_TEST_12_SHARE_2,
    CC_TEST_12_SHARE_3,
  ]);

  expect(reconstructed).toBe(CC_TEST_12_COMBINED);
});

test('reconstruct 18 words seed from coldcard firmware tests', async () => {
  const reconstructed = await combine([
    CC_TEST_18_SHARE_1,
    CC_TEST_18_SHARE_2,
    CC_TEST_18_SHARE_3,
  ]);

  expect(reconstructed).toBe(CC_TEST_18_COMBINED);
});

test('reconstruct 18 words seed in any combination', async () => {
  expect(
    await combine([CC_TEST_18_SHARE_1, CC_TEST_18_SHARE_2, CC_TEST_18_SHARE_3]),
  ).toBe(CC_TEST_18_COMBINED);
  expect(
    await combine([CC_TEST_18_SHARE_1, CC_TEST_18_SHARE_3, CC_TEST_18_SHARE_2]),
  ).toBe(CC_TEST_18_COMBINED);
  expect(
    await combine([CC_TEST_18_SHARE_2, CC_TEST_18_SHARE_1, CC_TEST_18_SHARE_3]),
  ).toBe(CC_TEST_18_COMBINED);
  expect(
    await combine([CC_TEST_18_SHARE_3, CC_TEST_18_SHARE_2, CC_TEST_18_SHARE_1]),
  ).toBe(CC_TEST_18_COMBINED);
});

test('split and recombine 18 words roundtrip', async () => {
  const shares = await split(CC_TEST_18_COMBINED, 2);
  const reconstructed = await combine(shares);
  expect(reconstructed).toBe(CC_TEST_18_COMBINED);
});

test('split and recombine roundtrip (12 words, 3 parts)', async () => {
  const shares = await split(CC_TEST_12_COMBINED, 3);
  const reconstructed = await combine(shares);
  expect(reconstructed).toBe(CC_TEST_12_COMBINED);
});

test('split and recombine roundtrip (24 words, 3 parts)', async () => {
  const shares = await split(DOCS_COMBINED, 3);
  const reconstructed = await combine(shares);
  expect(reconstructed).toBe(DOCS_COMBINED);
});

test('XOR of two identical zero seeds equals zero seed (24 words)', async () => {
  expect(await combine([ZERO_24, ZERO_24])).toBe(ZERO_24);
});

test('XOR of two identical zero seeds equals zero seed (12 words)', async () => {
  expect(await combine([ZERO_12, ZERO_12])).toBe(ZERO_12);
});

test('XOR of odd number of identical ones seeds equals ones seed (24 words)', async () => {
  expect(await combine([ONES_24, ONES_24, ONES_24])).toBe(ONES_24);
  expect(
    await combine([
      ONES_24,
      ONES_24,
      ONES_24,
      ONES_24,
      ONES_24,
      ONES_24,
      ONES_24,
    ]),
  ).toBe(ONES_24);
});

test('XOR of odd number of identical ones seeds equals ones seed (12 words)', async () => {
  expect(await combine([ONES_12, ONES_12, ONES_12])).toBe(ONES_12);
  expect(
    await combine([
      ONES_12,
      ONES_12,
      ONES_12,
      ONES_12,
      ONES_12,
      ONES_12,
      ONES_12,
    ]),
  ).toBe(ONES_12);
});

test('XOR of even number of identical ones seeds equals zero seed (24 words)', async () => {
  expect(await combine([ONES_24, ONES_24, ONES_24, ONES_24])).toBe(ZERO_24);
});

test('XOR of even number of identical ones seeds equals zero seed (12 words)', async () => {
  expect(await combine([ONES_12, ONES_12, ONES_12, ONES_12])).toBe(ZERO_12);
});

test('XOR of two identical zero seeds equals zero seed (18 words)', async () => {
  expect(await combine([ZERO_18, ZERO_18])).toBe(ZERO_18);
});

test('XOR of odd number of identical ones seeds equals ones seed (18 words)', async () => {
  expect(await combine([ONES_18, ONES_18, ONES_18])).toBe(ONES_18);
});

test('XOR of even number of identical ones seeds equals zero seed (18 words)', async () => {
  expect(await combine([ONES_18, ONES_18, ONES_18, ONES_18])).toBe(ZERO_18);
});

test('fail if share is invalid', async () => {
  await expect(combine(['test', DOCS_SHARE_2, DOCS_SHARE_3])).rejects.toThrow(
    '[SeedXOR]: Invalid mnemonic',
  );
});

test('fail if share is invalid length', async () => {
  await expect(
    combine([
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
      DOCS_SHARE_2,
      DOCS_SHARE_3,
    ]),
  ).rejects.toThrow('[SeedXOR]: Not all mnemonics are the same length');
});

test('fail if seed is invalid', async () => {
  await expect(split('abandon')).rejects.toThrow('[SeedXOR]: Invalid mnemonic');
});

test('fail if called with invalid number of shares', async () => {
  await expect(split(DOCS_COMBINED, 5 as any)).rejects.toThrow(
    '[SeedXOR]: Invalid number of shares',
  );
});

test('fail if shares have different lengths', async () => {
  const spy = vi.spyOn(utils, 'bitwiseXorHexString').mockReturnValue('1234');

  await expect(split(LOCAL_TEST_12_COMBINED, 2)).rejects.toThrow(
    '[SeedXOR]: Not all final shares are the same length',
  );

  spy.mockRestore();
});
