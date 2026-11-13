const fs = require('fs');

const code = fs.readFileSync('js/locket.js', 'utf8');

// Test 1: Locket User-Agent
let done1;
const ctx1 = {
  $request: { headers: { 'User-Agent': 'Locket/1.140.0' } },
  $response: { body: JSON.stringify({ subscriber: {} }) },
  $done: (res) => { done1 = res; }
};

const fn1 = new Function('$request', '$response', '$done', code);
fn1(ctx1.$request, ctx1.$response, ctx1.$done);

const res1 = JSON.parse(done1.body);
console.log('--- Test 1 (Locket UA) ---');
console.log('Entitlements:', Object.keys(res1.subscriber.entitlements));
console.log('Subscriptions:', Object.keys(res1.subscriber.subscriptions));
console.log('Gold Entitlement:', res1.subscriber.entitlements.Gold);

// Test 2: Generic UA fallback
let done2;
const ctx2 = {
  $request: { headers: { 'User-Agent': 'CFNetwork/1410.0.3' } },
  $response: { body: JSON.stringify({ subscriber: {} }) },
  $done: (res) => { done2 = res; }
};
const fn2 = new Function('$request', '$response', '$done', code);
fn2(ctx2.$request, ctx2.$response, ctx2.$done);

const res2 = JSON.parse(done2.body);
console.log('\n--- Test 2 (Generic UA) ---');
console.log('Entitlements:', Object.keys(res2.subscriber.entitlements));
console.log('Gold Entitlement in fallback:', res2.subscriber.entitlements.Gold ? 'YES' : 'NO');
