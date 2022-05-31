

getlivre = {
1:'MATTHIEU',
2:'MARC',
3:'LUC',
4:'JEAN',
5:'ACTES',
6:'ROMAINS',
7:'1 CORINTHIENS',
8:'2 CORINTHIENS',
9:'GALATES',
10:'EPHESIENS',
11:'PHILIPPIENS',
12:'COLOSSIENS',
13:'1 THESSALONICIENS',
14:'2 THESSALONICIENS',
15:'1 TIMOTHEE',
16:'2 TIMOTHEE',
17:'TITE',
18:'PHILEMON',
19:'HEBREUX',
20:'JACQUES',
21:'1 PIERRE',
22:'2 PIERRE',
23:'1 JEAN',
24:'2 JEAN',
25:'3 JEAN',
26:'JUDAS',
27:'APOCALYPSE' }

fs1		= require('fs');
fs2		= require('fs');

//ARRAY
livre_a		=[];
chapitre_a	=[];
verset_a	=[];

function clean(phrase)
{
	phrase = phrase.replace(/Abra-ham/g,'Abraham');

}


for (livre = 1 ; livre <= 27 ; livre++)
{
	

	lien_du_livre	= './'+getlivre[livre]+'/'+getlivre[livre]+'.txt';
	result			= fs1.readFileSync(lien_du_livre, 'utf8');
	lignes			= result.match(/^.*$/mg);

	
	old_chapitre	= 0;
	old_verset		= 0;
	
	texte		= ''
	


	for (ligne = 0 ; ligne != lignes.length ; ligne++)
	{


		//CHAPITRE
		if (chap_line = lignes[ligne].match(/--CHAPITRE:([0-9]+)/))
		{
			//prevchap	= chapitre;
			//prevver		= verset;
			
			//start	= 0;
			//verset	= 0;
			//chapitre++;
			chapitre = chap_line[1];

			//check
			if (chapitre != parseInt(old_chapitre)+1)
				console.log(chapitre+' '+old_chapitre);

			
			verset_a[old_verset] = texte;
			verset_a[0] = livre+':'+old_chapitre+':'+old_verset;
			chapitre_a[old_chapitre] = verset_a;

			texte = '';
			verset_a =[]

			old_chapitre = chap_line[1];
			old_verset   = 0;
		}


		//VERSET
		else if (ver_line = lignes[ligne].match(/([0-9]+)/))
		{
			/* 
			//BREAK TEST
			if (getlivre[livre] == "1 CORINTHIENS" && chapitre == 4)
			{
				//console.log('old: '+old_verset)
				//console.log(ver_line[1]);
				
			}
			*/
			
			verset = ver_line[1];

			//CHECK
			if (parseInt(verset) != parseInt(old_verset)+1)
			{	
				if (old_verset != 0)
				{
					console.log(getlivre[livre]+' '+chapitre+' '+verset+' '+old_verset);
				}
			}

			if (parseInt(verset) == parseInt(old_verset))
			{
				console.log(getlivre[livre]+' '+chapitre+' '+verset+' '+old_verset);
			}

			if  (lignes[ligne].length > 2)
				{
					console.log('ERROR '+lignes[ligne]);
					console.log('CH:'+chapitre+' VE:'+verset)

				}
			

			
			verset_a[old_verset] = texte;
			texte = '';

			old_verset = ver_line[1];
		}


		//TEXTE
		else
		{

			if (lignes[ligne] != '')
			{
				texte = texte+' '+lignes[ligne];

				texte = texte.replace(/\s+/g,' ');
				texte = texte.replace(/^ +| +$/g,'');
				texte = texte.replace(/\*/g,'');
				texte = texte.replace(/\'/g,'’');
			}
				
		}

		


	}
	
	
	
	verset_a[old_verset] = texte;
	verset_a[0] = livre+':'+old_chapitre+':'+old_verset;
	chapitre_a[old_chapitre] = verset_a;

	tchapitre = chapitre_a.length-1;
	chapitre_a[0] = livre+'-'+getlivre[livre]+' - '+tchapitre+' chapitres';

	livre_a[livre] = chapitre_a;
	chapitre_a = [];
	verset_a =[];
}






//verset_a[0] = livre_avant+':'+chap_avant+':'+ver_avant;
//verset_a[ver_avant] = phrase;

//chapitre_a[chap_avant] = verset_a;
//tchap = chapitre_a.length-1;
//chapitre_a[0] = livre_avant+'-'+getlivre[livre_avant]+' - '+tchap+' chapitres';
//livre_a[livre_avant] = chapitre_a;

tlivre = livre_a.length-1;
livre_a[0]='BIBLE LEFEVRE - EDITION 2005 - '+tlivre+' livres';



//FILE_JSON_TISCH
fs2.writeFileSync('lefevre2005.js', 'lefevre2005='+JSON.stringify(livre_a, null, 1), 'utf8');
