var poops_variations=[ // dont forget to "></div> after using
	'<div class="set_poops_mode_buton f_l empty" poopsid="',
	'<div class="set_poops_mode_buton f_l wall" poopsid="'
]
var poops_settings_from_classes={
	'set_poops_mode_buton f_l empty':'empty_poops',
	'set_poops_mode_buton f_l wall':'wall_poops',
}
var poops_code_from_classes={
	'game_poops f_l empty_poops':'W0',
	'game_poops f_l wall_poops':'00'
}
var mDownAt = ''
function init(){
	fillBattleField()
	document.body.addEventListener('mouseup', function(){mDownAt=''})
}

function fillBattleField(){

	fieldSize = battlefield_width.value * battlefield_height.value
	battlefield.innerHTML = ''
	for (s=0; s<fieldSize; s++){
		newPoops = document.createElement('div')
		newPoops.className = 'game_poops f_l empty_poops'
		newPoops.id = 'poops_id_' + s;
		newPoops.addEventListener('mouseover', function(e){
					if (e.toElement.getAttribute('poopsid')) return
					if (mDownAt != ''){
						e.toElement.className = 'game_poops f_l ' + poops_settings_from_classes[mDownAt]
					}
				})
		battlefield.appendChild(newPoops)
		for (i=0; i<poops_variations.length; i++){
			document.getElementById('poops_id_' + s).innerHTML += poops_variations[i] + s + '"></div>'
			document.getElementById('poops_id_' + s).addEventListener('click', function(e){setPoopsModeTo(e.target)})
			}

	}
	for (i=0; i<document.getElementsByClassName('set_poops_mode_buton').length; i++)
		document.getElementsByClassName('set_poops_mode_buton')[i].addEventListener('mousedown', function(e){
						mDownAt = e.target.className
					})
	
	battlefield.style.width = poops_id_0.getBoundingClientRect().width * battlefield_width.value + 'px'
	
	genResult()
}
function setPoopsModeTo(poops){
	document.getElementById('poops_id_' + poops.getAttribute('poopsid')).className = 'game_poops f_l ' + poops_settings_from_classes[poops.className]
	genResult()
}
function genResult(){
	result.value = 'lvl' + lvlName.value + ' = "'
	for (i=0; i<battlefield_width.value * battlefield_height.value; i++){
		result.value += ' ' + poops_code_from_classes[document.getElementById("poops_id_"+i).className]
	}
	result.value += ' "'
}
//TODO saving states during resize and import

function decreaseFieldWidth(){
	if(battlefield_width.value >= 2){
		battlefield_width.value--
		fillBattleField()
	}
}
function increaseFieldWidth(){
	battlefield_width.value++
	fillBattleField()
}
function decreaseFieldHeight(){
	if(battlefield_height.value >= 2){
		battlefield_height.value--
		fillBattleField()
	}
}
function increaseFieldHeight(){
	battlefield_height.value++
	fillBattleField()
}