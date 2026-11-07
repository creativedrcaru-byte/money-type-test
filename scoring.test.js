import {test} from 'node:test';
import assert from 'node:assert/strict';
import {groups,score,types} from './questions.js';
test('source has 96 unique items in the requested order',()=>{assert.deepEqual(groups.map(g=>g.key),['가',...'ABCDEFGH','나']);const ids=groups.flatMap(g=>g.items.map(q=>q.id));assert.equal(ids.length,96);assert.equal(new Set(ids).size,96);assert.equal(types[0],'순진형');assert.equal(types[7],'머지션형');});
test('가 and 나 each add to the mapped letter',()=>{for(let i=0;i<8;i++){const expected=Array(8).fill(0);expected[i]=2;assert.deepEqual(score(new Set([i+1,i+91])),expected);}});
test('each alphabet group adds only to its own letter',()=>{for(let i=0;i<8;i++){const expected=Array(8).fill(0);expected[i]=10;assert.deepEqual(score(new Set(groups[i+1].items.map(q=>q.id))),expected);}});
test('all selected reaches 12 per type; empty selection has no points',()=>{assert.deepEqual(score(new Set(groups.flatMap(g=>g.items.map(q=>q.id)))),Array(8).fill(12));assert.deepEqual(score(new Set()),Array(8).fill(0));});
test('example combines all three sources without crossing types',()=>assert.deepEqual(score(new Set([1,2,10,19,28,91,98])),[4,2,0,0,0,0,0,1]));
