"use strict"
window.onload=()=>{
	/*start* constとか変数置き場 ***/
	const attack = document.getElementById("attack");
	const deffeth = document.getElementById("deffeth");
	const heal = document.getElementById("heal");
	const encount = document.getElementById("encount");

	const skill = document.getElementById("skill");
	const skillA = document.getElementById("skillA");
	const skillB = document.getElementById("skillB");
	const skillC = document.getElementById("skillC");
	const skillD = document.getElementById("skillD");

	const player_Hp = document.getElementById("player-hp");
	const player_At = document.getElementById("player-at");
	const player_Df = document.getElementById("player-df");
	const player_Mp = document.getElementById("player-mp");
	const player_Gold = document.getElementById("player-gold");
	
	const enemy_Name = document.getElementById("enemy-name");
	const enemy_Hp = document.getElementById("enemy-hp");
	const enemy_At = document.getElementById("enemy-at");
	const enemy_Df = document.getElementById("enemy-df");
	const enemy_Mp = document.getElementById("enemy-mp");

	const log = document.getElementById("log");
	const story = document.getElementById("story");

	let playerHp = 0 ;
	let playerMp = 0 ;
	let playerAt = 0 ;
	let playerDf = 0 ;
	let playerGold = 0 ;
	let dieCount = 0 ;
	let commandN = 0 ;

	let enemy = [];
	let enemyName = "Enemy";
	let enemyHp = 0;
	let enemyMp = 0;
	let enemyAt = 0;
	let enemyDf = 0;
	let enemyGold = 0;
	let countEncount = 0 ;

	let temp = 0 ;
	let root = 0 ;

	/*fin* constとか変数置き場 ***/

	/*start* defとかメソッド置き場 ***/
	
	const messageLog = (message)=>{
		let sendMessage = "" ;
		for( let i = 0 ; i < message.length ; i++ ){
			sendMessage +="<span>"+message[i]+"</span>"
		}
		log.innerHTML = sendMessage ;
	}

	const attackMessage = (message,damage) =>{
		message.push("プライヤーの攻撃");
		message.push("敵に"+damage+"点のダメージを与えた");
	}
	
	const damageMessage = (message,damage) =>{
		message.push("敵の攻撃");
		message.push("Playerは"+damage+"点のダメージを受けた");
	}

	const enemyAttack = (message)=>{
		let damage = clacDamage(enemyAt,playerDf);
		playerHp -= damage ;
		damageMessage(message,damage);
		enemy[countEncount-1].attack(message,playerDf);
	}

	const showStatus = ()=>{
		story.textContent = countEncount+"階層" ;
		player_Hp.textContent = playerHp ;
		player_Mp.textContent = playerMp ;
		player_At.textContent = playerAt ;
		player_Df.textContent = playerDf ;
		player_Gold.textContent = "所持金:"+playerGold ;
		enemy_Name.textContent = enemyName ;
		enemy_Hp.textContent = enemyHp ;
		enemy_Mp.textContent = enemyMp ;
		enemy_At.textContent = enemyAt ;
		enemy_Df.textContent = enemyDf ;
	}

	const checkFight =(message)=>{
		if(countEncount == 0){
			message.push("エンカウントを押してエンカウントしてください");
			return false;}
		return true ;
	}

	const checkReload =(message)=>{
		if(countEncount != 0){
			message.push("再度生成するためにはリロードが必要です。");
			return false;}
		return true ;
	}

	const checkSurvival =(message)=>{
		if(playerHp <= 0 && dieCount != 0){
			message.push("あなたは倒れていますリロードしてください");
			message.push("倒した数"+countEncount+"体");
			dieCount = 1;
			return false;}
		return true ;
	}

	const checkEnemy = (message)=>{
		if(enemyHp <= 0 && countEncount != 0 ){
			message.push("敵は倒れていますエンカウントを押してください");
			return false;
		}else if( countEncount == 0 ){
			message.push("エンカウントを押して冒険に出かけましょう");
			return false;
		}
		return true ;
	}

	const checkLeave = (message)=>{
		if(enemyHp > 0){
			console.log("test");
			message.push("敵前逃亡はできません倒してください");
			return false;}
		return true ;
	}

	const checkMagic = (message,useMp)=>{
		if(playerMp <= useMp){
			message.push("あなたはMPが足りない");
			return false;}
		return true;
	}

	const checkMonny = (message,useMonny)=>{
		if(playerGold <= useMonny){
			message.push("あなたはGoldが足りない");
			return false;}
		return true;
	}

	const checkDie = (message)=>{
		if(dieCount == 1){
			dieCount = 0 ;
			return false ;
		}
		return true ;
	}

	const checkExist = (message)=>{
		if(dieCount==2){
			return false ;
		}
		return true ;
	}

	const diceRoll = (times)=>{
		let result = 0 ;
		for( let i = 0 ; i < times ; i++ ){
			result += Math.floor(Math.random() * 9 ) + 1 ;
		}
		return result ;
	}

	const clacDamage = (AAt,BDf)=>{
		let result = 0 ;
		let cutDamage = Math.floor( ( 10 + BDf ) / 10 ) ;
		let damage = AAt + diceRoll(1) - 5 ;
		result = Math.floor( damage / cutDamage );
		return result ;
	}

	const makePlayer = () =>{
		playerHp = diceRoll(8);
		playerMp = diceRoll(2);
		playerAt = diceRoll(2);
		playerDf = diceRoll(1);
	}	

	const makeEnemy = () =>{
		let tempEnemy = null ;
		let enemyNumber = diceRoll(1);
		switch(enemyNumber){
				case 1:
					tempEnemy = new slime();
					break;
				case 2:
					tempEnemy = new goblin();
					break;
				case 3:
					tempEnemy = new gorem();
					break;
				case 4:
					tempEnemy = new flysord();
					break;
				case 5:
					tempEnemy = new dragon();
					break;
				default:
					tempEnemy = new boss();
					break;
		}
		enemy.push(tempEnemy);
		console.log(enemy[countEncount].name);
		enemyName = enemy[countEncount].name;
		enemyHp = enemy[countEncount].hp ;
		enemyMp = enemy[countEncount].mp ;
		enemyAt = enemy[countEncount].at ;
		enemyDf = enemy[countEncount].df ;
		enemyGold = enemy[countEncount].gold ;
	}

	/*fin* defとかメソッド置き場 ***/
	/*start* オブジェクト置き場 ***/

	class slime{
		constructor(){
			this.name = "slime";
			this.hp = diceRoll(1)+ 2*countEncount;
			this.mp = diceRoll(1)+countEncount;
			this.at = diceRoll(1)+countEncount;
			this.df = diceRoll(1)+countEncount;
			this.gold = Math.floor( (this.hp+this.mp+this.at+this.df) /5)
		}
		attack(message,playerDf){
			let action = diceRoll(1);
			switch(action){
				case 1:break;
				case 2:break;
				case 3:break;
				case 4:break;
				case 5:break;
				default:break;
			}
		}
	}

	class goblin{
		constructor(){
			this.name = "goblin";
			this.hp = diceRoll(2)+countEncount;
			this.mp = diceRoll(1)+countEncount;
			this.at = diceRoll(2)+countEncount;
			this.df = diceRoll(1)+countEncount;
			this.gold = Math.floor( (this.hp+this.mp+this.at+this.df) /5)
		}
		attack(message,playerDf){
			let action = diceRoll(1);
			switch(action){
				case 1:break;
				case 2:break;
				case 3:break;
				case 4:break;
				case 5:break;
				default:break;
			}
		}
	}

	class gorem{
		constructor(){
			this.name = "gorem";
			this.hp = diceRoll(1)+countEncount;
			this.mp = diceRoll(1)+countEncount;
			this.at = diceRoll(1)+countEncount;
			this.df = diceRoll(2)+2*countEncount;
			this.gold = Math.floor( (this.hp+this.mp+this.at+this.df) /5)
		}
		attack(message,playerDf){
			let action = diceRoll(1);
			switch(action){
				case 1:break;
				case 2:break;
				case 3:break;
				case 4:break;
				case 5:break;
				default:break;
			}
		}
	}

	class flysord{
		constructor(){
			this.name = "flysord";
			this.hp = diceRoll(2)+countEncount;
			this.mp = diceRoll(1)+countEncount;
			this.at = diceRoll(2)+countEncount;
			this.df = diceRoll(1)+2*countEncount;
			this.gold = Math.floor( (this.hp+this.mp+this.at+this.df) /5)
		}
		attack(message,playerDf){
			let action = diceRoll(1);
			switch(action){
				case 1:break;
				case 2:break;
				case 3:break;
				case 4:break;
				case 5:break;
				default:break;
			}
		}
	}

	class dragon{
		constructor(){
			this.name = "dragon";
			this.hp = diceRoll(2)+countEncount;
			this.mp = diceRoll(1)+countEncount;
			this.at = diceRoll(2)+countEncount;
			this.df = diceRoll(2)+countEncount;
			this.gold = Math.floor( (this.hp+this.mp+this.at+this.df) /5)
		}
		attack(message,playerDf){
			let action = diceRoll(1);
			switch(action){
				case 1:break;
				case 2:break;
				case 3:break;
				case 4:break;
				case 5:break;
				default:break;
			}
		}
	}

	class boss{
		constructor(){
			this.name = "boss";
			this.hp = diceRoll(2)+countEncount;
			this.mp = diceRoll(2)+countEncount;
			this.at = diceRoll(2)+countEncount;
			this.df = diceRoll(1)+ 2*countEncount;
			this.gold = Math.floor( (this.hp+this.mp+this.at+this.df) /5)
		}
		attack(message,playerDf){
			let action = diceRoll(1);
			switch(action){
				case 1:break;
				case 2:break;
				case 3:break;
				case 4:break;
				case 5:break;
				default:break;
			}
		}
	}

	/*fin* オブジェクト置き場 ***/
	/*start*  addEventListener ***/

	attack.addEventListener("click",()=>{
		skill.classList.add("hidemode");
		commandN = 1 ;
		skillA.textContent = "通常攻撃" ;
		skillB.textContent = "吸収攻撃" ;
		skillC.textContent = "減防攻撃" ;
		skillD.textContent = "致命攻撃" ;
		skill.classList.remove("hidemode");
		return ;
	});

	deffeth.addEventListener("click",()=>{
		skill.classList.add("hidemode");
		commandN = 2 ;
		skillA.textContent = "HP回復" ;
		skillB.textContent = "MP回復" ;
		skillC.textContent = "At向上" ;
		skillD.textContent = "Df向上" ;
		skill.classList.remove("hidemode");
		return;
	});

	heal.addEventListener("click",()=>{
		skill.classList.add("hidemode");
		commandN = 3 ;
		skillA.textContent = "HPの実　購入" ;
		skillB.textContent = "MPの実　購入" ;
		skillC.textContent = "Atの実　購入" ;
		skillD.textContent = "Dfの実　購入" ;
		skill.classList.remove("hidemode");
		return ;
	});

	encount.addEventListener("click",()=>{
		skill.classList.add("hidemode");
		commandN = 4 ;
		skillA.textContent = "Playerステータス生成" ;
		skillB.textContent = "エンカウント" ;
		skillC.textContent = "次のエンカウント" ;
		skillD.textContent = "リロード" ;
		skill.classList.remove("hidemode");
		return ;
	});

	skillA.addEventListener("click",()=>{
		let message = [] ;
		let result = true ;
		let useMp = 0 ;
		let useMonny = 0 ;
		root = 0;
		switch(commandN){
			case 1:
				useMp = 0 ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMagic(message,useMp);
				if(!result){
					root = 1 ;
					break ;}
				playerMp -= useMp ;
				let damage = clacDamage(playerAt,enemyDf);
				enemyHp -= damage ;
				attackMessage(message,damage);
				break;
			case 2:
				useMp = 3 ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMagic(message,useMp);
				if(!result){break ;}
				playerMp -= useMp ;
				temp = diceRoll(2) ;
				playerHp += temp ;
				message.push("HPを"+temp+"点増やしたよ") ;
				break;
			case 3:
				useMonny = Math.floor( playerHp/10 ) ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMonny(message,useMonny);
				if(!result){break ;}
				playerGold -= useMonny ;
				temp = 15 ;
				playerHp += temp ;
				message.push("HPを"+temp+"点増やしたよ") ;
				root = 1 ;
				break;
			case 4:
				result = checkReload(message);
				if(result){
					makePlayer();
					message.push("プレイヤーを生成したよ");
					message.push("エンカウントを押して冒険へ行こう");
					dieCount = 2 ;
					root = 1 ;
				}
				break;
			default:
				return;
		}
		if(root == 0){
			result = checkSurvival(message);
			result = checkEnemy(message);
			if(!result){
				playerGold += enemyGold ;
			}else{
				enemyAttack(message);
			}
		}
		messageLog(message);
		showStatus();
	});

	skillB.addEventListener("click",()=>{
		let message = [] ;
		let result = true ;
		let useMp = 0 ;
		let useMonny = 0 ;
		root = 0 ;
		switch(commandN){
			case 1:
				useMp = 5 ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMagic(message,useMp);
				if(!result){break ;}
				playerMp -= useMp ;
				let damage = clacDamage(playerAt,enemyDf);
				enemyHp -= damage ;
				attackMessage(message,damage);
				damage = Math.floor( damage / 2 ) ;
				playerHp += damage ;
				message.push("HPを"+damage+"点吸収した");
				break;
			case 2:
				useMp = 0 ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMagic(message,useMp);
				if(!result){break ;}
				temp = diceRoll(1) - 3  ;
				playerMp += temp ;
				message.push("MPを"+temp+"点増やしたよ") ;
				break;
			case 3:
				useMonny = Math.floor( playerMp / 10 ) ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMonny(message,useMonny);
				if(!result){break ;}
				playerGold -= useMonny ;
				temp = 2 ;
				playerMp += temp ;
				message.push("MPを"+temp+"点増やしたよ") ;
				root = 1;
				break;
			case 4:
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkLeave(message);
				if(!result){
					root = 1 ;
					break ;}
				if(dieCount == 0){
					message.push("先にキャラを作ってください");
					root = 1 ;
					break;}
				makeEnemy();
				countEncount += 1 ;
				root = 1 ;
				message.push("生成したよ")
				break;
			default:
				return;
		}
		if(root == 0){
			result = checkSurvival(message);
			result = checkEnemy(message);
			if(!result){
				playerGold += enemyGold ;
			}else{
				enemyAttack(message);
			}
		}
		messageLog(message);
		showStatus();
	});

	skillC.addEventListener("click",()=>{
		let message = [] ;
		let result = true ;
		let useMp = 0 ;
		let useMonny = 0 ;
		root = 0 ;
		switch(commandN){
			case 1:
				useMp = 2 ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMagic(message,useMp);
				if(!result){break ;}
				playerMp -= useMp ;
				let damage = clacDamage(playerAt,enemyDf);
				damage = Math.floor( damage / 2 ) ;
				enemyHp -= damage ;
				attackMessage(message,damage);
				enemyDf -= damage ;
				message.push("敵の防御を"+damage+"点削った");
				break;
			case 2:
				useMp = 3 ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMagic(message,useMp);
				if(!result){break ;}
				playerMp -= useMp ;
				temp = diceRoll(1) ;
				playerAt += temp ;
				message.push("Atを"+temp+"点増やしたよ") ;
				break;
			case 3:
				useMonny = Math.floor( playerAt / 10 ) ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMonny(message,useMonny);
				if(!result){break ;}
				playerGold -= useMonny ;
				temp = 3 ;
				playerAt += temp ;
				message.push("Atを"+temp+"点増やしたよ") ;
				root = 1;
				break;
			case 4:
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				if(dieCount == 0){
					message.push("先にキャラを作ってください");
					root = 1 ;
					break;}
				playerGold = Math.floor( playerGold * 9 / 10 ) ;
				makeEnemy();
				countEncount += 1 ;
				root = 1 ;
				message.push("逃走したよ")
				break;
			default:
				return;
		}
		if(root == 0){
			result = checkSurvival(message);
			result = checkEnemy(message);
			if(!result){
				playerGold += enemyGold ;
			}else{
				enemyAttack(message);
			}
		}
		messageLog(message);
		showStatus();
	});

	skillD.addEventListener("click",()=>{
		let message = [] ;
		let result = true ;
		let useMp = 0 ;
		let useMonny = 0 ;
		root = 0 ;
		switch(commandN){
			case 1:
				useMp = 0 ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMagic(message,useMp);
				if(!result){break ;}
				playerMp -= useMp ;
				let damage = clacDamage(playerAt,enemyDf);
				temp = diceRoll(2) ;
				playerHp -= temp ;
				let damageAdd = diceRoll(temp);
				damage += damageAdd ;
				enemyHp -= damage ;
				message.push("プレイヤーは"+temp+"点のHPを消費し力を込めた");
				attackMessage(message,damage);
				break;
			case 2:
				useMp = 3 ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMagic(message,useMp);
				if(!result){break ;}
				playerMp -= useMp ;
				temp = diceRoll(1) - 5 ;
				playerDf += temp ;
				message.push("Dfを"+temp+"点増やしたよ") ;
				break;
			case 3:
				useMonny = Math.floor( playerDf / 10 ) ;
				result = checkSurvival(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkEnemy(message);
				if(!result){
					root = 1 ;
					break ;}
				result = checkMonny(message,useMonny);
				if(!result){break ;}
				playerGold -= useMonny ;
				temp = 1 ;
				playerDf += temp ;
				message.push("Dfを"+temp+"点増やしたよ") ;
				root = 1;
				break;
			case 4:
				location.reload();
				break;
			default:
				return;
		}
		if(root == 0){
			result = checkSurvival(message);
			result = checkEnemy(message);
			if(!result){
				playerGold += enemyGold ;
			}else{
				enemyAttack(message);
			}
		}
		messageLog(message);
		showStatus();
	});

	/*fin* addEventListener ***/


}
