"use strict"
window.onload=()=>{
	const attack = document.getElementById("attack");
	const deffeth = document.getElementById("deffeth");
	const heal = document.getElementById("heal");
	const encount = document.getElementById("encount");

	const player_Hp = document.getElementById("player-hp");
	const player_At = document.getElementById("player-at");
	const player_Df = document.getElementById("player-df");
	const player_Mp = document.getElementById("player-mp");

	const enemy_Hp = document.getElementById("enemy-hp");
	const enemy_At = document.getElementById("enemy-at");
	const enemy_Df = document.getElementById("enemy-df");
	const enemy_Mp = document.getElementById("enemy-mp");

	const log = document.getElementById("log");

	let playerHp = Math.floor(Math.random() * 50)+30;
	let playerMp = Math.floor(Math.random() * 20);
	let playerAt = Math.floor(Math.random() * 15)+2;
	let playerDf = Math.floor(Math.random() * 5);
	let dieCount = 0 ;

	let enemyHp = 0;
	let enemyMp = 0;
	let enemyAt = 0;
	let enemyDf = 0;
	let countEncount = 0 ;

	attack.addEventListener("click",()=>{
		let message = [] ;
		let check = checkAttack();
		if(!check){return;}
		let damagePoint = playerAt + Math.floor(Math.random() * 5);
		enemyHp -= damagePoint - enemyDf ;
		let damage = enemyAttack();
		message.push("あなたは攻撃をした");
		message.push(damagePoint+"点ダメージを与えた");
		message.push("敵の攻撃");
		message.push(damage+"点ダメージを受けた");
		messageLog(message);
		showStatus();
		changeWord();
		checkVital();
		reloadTime();
		return ;
	});
	deffeth.addEventListener("click",()=>{
		let message = [] ;
		if(!checkMagic()){return;}
		playerMp -= 1 ;
		let addPoint = Math.floor(Math.random() * 5);
		playerDf += addPoint ;
		let damage = enemyAttack();
		message.push("あなたは防御を強化した");
		message.push(addPoint+"点強化した");
		message.push("敵の攻撃");
		message.push(damage+"点ダメージを受けた");
		messageLog(message);
		showStatus();
		changeWord();
		checkVital();
		reloadTime();
		return;
	});
	heal.addEventListener("click",()=>{
		let message = [] ;
		if(!checkMagic()){return;}
		playerMp -= 1 ;
		let HealPoint = Math.floor(Math.random() * 20);
		playerHp += HealPoint ;
		let damage = enemyAttack();
		message.push("あなたはヒールをした");
		message.push(HealPoint+"点回復した");
		message.push("敵の攻撃");
		message.push(damage+"点ダメージを受けた");
		messageLog(message);
		showStatus();
		changeWord();
		checkVital();
		reloadTime();
		return ;
	});
	encount.addEventListener("mousedown",()=>{
		let message = [] ;
		if(playerHp <= 0){
			message.push("あなたは倒れていますリロードしてください");
			message.push("倒した数"+countEncount+"体");
			messageLog(message);
			return ;}
		if(enemyHp > 0){
			message.push("敵前逃亡は不可となっています倒してください");
			messageLog(message);
			return ;}
		enemyHp = Math.floor(Math.random() * 30);
		enemyMp = Math.floor(Math.random() * 20);
		enemyAt = Math.floor(Math.random() * 10);
		enemyDf = Math.floor(Math.random() * 5);
		countEncount += 1 ;
		message.push("敵が現れた");
		messageLog(message);
		showStatus();
		changeWord();
		checkVital();
		reloadTime();
		return ;
	});



	const messageLog = (message)=>{
		let sendMessage = "" ;
		for( let i = 0 ; i < message.length ; i++ ){
			sendMessage +="<span>"+message[i]+"</span>"
		}
		log.innerHTML = sendMessage ;
	}
	const enemyAttack = ()=>{
		let damage = enemyAt + Math.floor(Math.random() * 5) - playerDf;
		playerDf -= 1 ;
		playerHp -= damage ;
		return damage;
	}
	const showStatus = ()=>{
		player_Hp.textContent = playerHp ;
		player_Mp.textContent = playerMp ;
		player_At.textContent = playerAt ;
		player_Df.textContent = playerDf ;
		enemy_Hp.textContent = enemyHp ;
		enemy_Mp.textContent = enemyMp ;
		enemy_At.textContent = enemyAt ;
		enemy_Df.textContent = enemyDf ;
	}
	const changeWord =()=>{
		if(playerHp<=0){
			encount.textContent = "リロード";
			dieCount = 1 ;
		}else if(enemyHp<=0){
			encount.textContent = "Next" ;
		}else{
		encount.textContent = "エンカウント"
		}
	}
	const checkAttack = ()=>{
		let message = [] ;
		if(playerHp <= 0){
			message.push("あなたは倒れていますリロードしてください");
			message.push("倒した数"+countEncount+"体");
			messageLog(message);
			dieCount+=1;
			return false;}
		if(countEncount == 0){
			message.push("エンカウントを押してエンカウントしてください");
			messageLog(message);
			return false;}
		if(enemyHp <= 0){
			message.push("敵は倒れていますエンカウントを押してください");
			messageLog(message);
			return false;}
		return true ;
	}
	const checkMagic = ()=>{
		let message = [] ;
		if(!checkAttack()){
			return false;
		}
		if(playerMp <= 0){
			message.push("あなたはMPが足りない");
			messageLog(message);
			return false;}
		return true;
	}
	const reloadTime =()=>{
		console.log(dieCount);
		if(dieCount>0){
			encount.addEventListener("mouseup",()=>{
				location.reload();
				dieCount=0;});
			return ;
		}
	}
	const checkVital =()=>{
		let message = [] ;
		if(countEncount == 0){
			message.push("エンカウントを押してエンカウントしてください");
			messageLog(message);
			return;}
		if(playerHp <= 0){
			message.push("あなたは倒れていますリロードしてください");
			message.push("倒した数"+countEncount+"体");
			messageLog(message);
			dieCount+=1;
			return;}
		if(enemyHp <= 0){
			message.push("敵は倒れていますエンカウントを押してください");
			messageLog(message);
			return;}	
	}
	checkVital();
	reloadTime();
}
