
const tape = require('tape');
const cityPops = require('./city-data.json');
const utils = require('./utils');

tape('buildStats', t => {
  const stats = utils.buildStats(cityPops, '2016 estimate');
  t.deepEqual(stats, {
    min: 100702,
    max: 8537673,
    sum: 92954099,
    count: 306,
    mean: 303771.5653594771
  }, 'should find the correct stats');
  t.end();
});

tape('Group by', t => {
  const groups = utils.groupBy(cityPops, 'State');
  const testOutput = Object.keys(groups).reduce((acc, key) => {
    acc[key] = groups[key].length;
    return acc;
  }, {});
  const expectedCountByState = {
    'New York': 5,
    California: 73,
    Illinois: 8,
    Texas: 38,
    Arizona: 10,
    Pennsylvania: 3,
    Florida: 22,
    Ohio: 6,
    Indiana: 4,
    'North Carolina': 9,
    Washington: 8,
    Colorado: 12,
    'District of Columbia': 1,
    Massachusetts: 5,
    Michigan: 6,
    Tennessee: 6,
    Oregon: 5,
    Oklahoma: 4,
    Nevada: 4,
    Kentucky: 2,
    Maryland: 1,
    Wisconsin: 3,
    'New Mexico': 2,
    Missouri: 5,
    Georgia: 7,
    Virginia: 7,
    Nebraska: 2,
    Minnesota: 3,
    Louisiana: 4,
    Kansas: 5,
    Hawaii: 1,
    Alaska: 1,
    'New Jersey': 7,
    Idaho: 1,
    Iowa: 3,
    Alabama: 4,
    Arkansas: 1,
    Utah: 4,
    'Rhode Island': 1,
    'South Dakota': 1,
    Mississippi: 1,
    Connecticut: 5,
    'South Carolina': 3,
    'North Dakota': 1,
    'New Hampshire': 1,
    Montana: 1
  };
  t.deepEqual(testOutput, expectedCountByState,
    'should find that that the group by selects the correct number of elements');
  /* eslint-disable max-len */
  const expectedResultsFromOregon = [
    {'2016 rank': '26', City: 'Portland', State: 'Oregon', '2016 estimate': '639,863', '2010 Census': '583,776', Change: '+9.61%', '2014 land area': '133.4 sq mi\n345.6 km2', '2010 population density': '4,375 per sq mi\n1,689 km−2', Location: '45.5370°N 122.6500°W'},
    {'2016 rank': '151', City: 'Salem', State: 'Oregon', '2016 estimate': '167,419', '2010 Census': '154,637', Change: '+8.27%', '2014 land area': '47.9 sq mi\n124.0 km2', '2010 population density': '3,229 per sq mi\n1,247 km−2', Location: '44.9237°N 123.0231°W'},
    {'2016 rank': '154', City: 'Eugene', State: 'Oregon', '2016 estimate': '166,575', '2010 Census': '156,185', Change: '+6.65%', '2014 land area': '43.7 sq mi\n113.2 km2', '2010 population density': '3,572 per sq mi\n1,379 km−2', Location: '44.0567°N 123.1162°W'},
    {'2016 rank': '258', City: 'Gresham', State: 'Oregon', '2016 estimate': '111,523', '2010 Census': '105,594', Change: '+5.61%', '2014 land area': '23.2 sq mi\n60.1 km2', '2010 population density': '4,551 per sq mi\n1,757 km−2', Location: '45.5023°N 122.4416°W'},
    {'2016 rank': '285', City: 'Hillsboro', State: 'Oregon', '2016 estimate': '105,164', '2010 Census': '91,611', Change: '+14.79%', '2014 land area': '24.3 sq mi\n62.8 km2', '2010 population density': '3,833 per sq mi\n1,480 km−2', Location: '45.5167°N 122.9833°W'}
  ];
  /* eslint-enable max-len */
  t.deepEqual(groups.Oregon, expectedResultsFromOregon, 'should find the correct values for oregon');

  const statsForGroups = Object.keys(groups).reduce((acc, key) => {
    acc[key] = utils.buildStats(groups[key], '2016 estimate');
    return acc;
  }, {});

  const SUBSET_OF_EXPECTED_RESULTS = [{
    state: 'New York',
    expectedStats: {min: 143378, max: 8537673, sum: 9347640, count: 5, mean: 1869528}
  }, {
    state: 'California',
    expectedStats: {min: 101659, max: 3976322, sum: 19682924, count: 73, mean: 269629.09589041094}
  }, {
    state: 'Illinois',
    expectedStats: {min: 112123, max: 2704958, sum: 3691206, count: 8, mean: 461400.75}
  }, {
    state: 'Texas',
    expectedStats: {min: 100702, max: 2303482, sum: 12950639, count: 38, mean: 340806.2894736842}
  }, {
    state: 'Arizona',
    expectedStats: {min: 132677, max: 1615017, sum: 4086808, count: 10, mean: 408680.8}
  }, {
    state: 'Pennsylvania',
    expectedStats: {min: 120443, max: 1567872, sum: 1991940, count: 3, mean: 663980}
  }, {
    state: 'Florida',
    expectedStats: {min: 101871, max: 880619, sum: 4704556, count: 22, mean: 213843.45454545456}
  }, {
    state: 'Ohio',
    expectedStats: {min: 140489, max: 860090, sum: 2161329, count: 6, mean: 360221.5}
  }, {
    state: 'Indiana',
    expectedStats: {min: 101735, max: 855164, sum: 1340864, count: 4, mean: 335216}
  }, {
    state: 'North Carolina',
    expectedStats: {min: 111223, max: 842051, sum: 2689004, count: 9, mean: 298778.22222222225}
  }];

  SUBSET_OF_EXPECTED_RESULTS.forEach(({state, expectedStats}) => {
    t.deepEqual(statsForGroups[state], expectedStats,
      `should find the correct aggregations for the ${state}`);
  });

  t.end();
});
