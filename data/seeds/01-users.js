
exports.seed = function (knex, Promise) {
  return knex('users').insert([
    { username: 'SnoopyFan', password: 'WoodstockRock$2020', department: 'Shipping' },
    { username: 'CharlieBrown', password: 'RedHairRock$2020', department: 'Management' },
    { username: 'SallyBrown', password: 'LinusRock$2020', department: 'Admin' },
  ]);
};
