fs		= require('fs');

name = "APOCALYPSE"


result	= fs.readFileSync(name+'.htm', 'utf8');
/*
result = result.replace(/₁/g,'1');
result = result.replace(/₂/g,'2');
result = result.replace(/₃/g,'3');

result = result.replace(/₄/g,'4');
result = result.replace(/₅/g,'5');
result = result.replace(/₆/g,'6');

result = result.replace(/₇/g,'7');
result = result.replace(/₈/g,'8');
result = result.replace(/₉/g,'9');

result = result.replace(/₀/g,'0');

result = result.replace(/[\u1D43-\u1D6A]|[\u2070-\u208E]/g,'');
*/


result = result.replace(/&quot;/sg,' ');
result = result.replace(/&nbsp;/sg,' ');
result = result.replace(/’”/sg,'');
result = result.replace(/”/sg,'');

result = result.replace(/’<sup>.*?<\/sup>/sg,' ');
result = result.replace(/<sup>.*?<\/sup>/sg,' ');
result = result.replace(/<.*?>/sg,'');

result = result.replace(/([0-9]+)/g,'\n$1\n');
result = result.replace(/([0-9]+)\n,/g,'--CHAPITRE:$1');



fs.writeFileSync(name+'.txt', result, 'utf8');