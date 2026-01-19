// Pure JS Jest test mirroring logic from "test xsf.js"
// Keeps everything local to avoid ESM/TS transform issues.

const function1 = (data) => {
  const Mapped = new Map();
  for (const each of data) {
    const getMapped = Mapped.get(each?.code);
    const thisMappedTel = getMapped?.tel;
    const result = {
      ...each,
      tel: getMapped
        ? Array.isArray(thisMappedTel)
          ? [...thisMappedTel, each?.tel]
          : [thisMappedTel, each?.tel]
        : each?.tel,
    };
    Mapped.set(each?.code, result);
  }
  return Array.from(Mapped?.values());
};

const function2 = (data) => {
  const { contact, ...restData } = data || {};
  const result = (contact || []).map(({ name }) => ({
    ...restData,
    name,
  }));
  return result;
};

const function3 = (data, limit) => {
  const result = data
    .filter((each) => Number(each?.age) <= limit)
    .sort((a, b) => Number(a.age) - Number(b.age))
    .map((each) => each?.name);
  return result;
};

describe('xsf logic (from test xsf.js) — JS test', () => {
  test('function1 groups by code and aggregates tel numbers', () => {
    const A1 = [
      { name: 'Alex', tel: '0991112222', code: 'xsf0001' },
      { name: 'Jane', tel: '0812221234', code: 'xsf0002' },
      { name: 'Alex', tel: '0832214433', code: 'xsf0001' },
      { name: 'Alex', tel: '0991113122', code: 'xsf0003' },
    ];

    const out = function1(A1);

    expect(out).toEqual([
      { name: 'Alex', tel: ['0991112222', '0832214433'], code: 'xsf0001' },
      { name: 'Jane', tel: '0812221234', code: 'xsf0002' },
      { name: 'Alex', tel: '0991113122', code: 'xsf0003' },
    ]);
  });

  test('function2 expands contacts with customer and address', () => {
    const A2 = {
      customer: 'Xsurface',
      contact: [{ name: 'Max' }, { name: 'Mike' }, { name: 'Adam' }],
      address: 'Sukhumvit 62',
    };

    const out = function2(A2);
    expect(out).toEqual([
      { name: 'Max', customer: 'Xsurface', address: 'Sukhumvit 62' },
      { name: 'Mike', customer: 'Xsurface', address: 'Sukhumvit 62' },
      { name: 'Adam', customer: 'Xsurface', address: 'Sukhumvit 62' },
    ]);
  });

  test('function3 filters age <= 30, sorts ascending, maps names', () => {
    const A3 = [
      { name: 'A', age: '30' },
      { name: 'B', age: '9' },
      { name: 'C', age: '20' },
      { name: 'D', age: '18' },
      { name: 'E', age: '11' },
      { name: 'F', age: '60' },
      { name: 'G', age: '27' },
      { name: 'H', age: '90' },
      { name: 'I', age: '21' },
      { name: 'J', age: '12' },
    ];

    const out = function3(A3, 30);
    expect(out).toEqual(['B', 'E', 'J', 'D', 'C', 'I', 'G', 'A']);
  });
});

