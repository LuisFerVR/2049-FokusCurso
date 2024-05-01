const html = document.querySelector('html');
const btnCorto = document.querySelector('.app__card-button--corto');
const btnEnfoque = document.querySelector('.app__card-button--enfoque');
const btnLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const btnMusica = document.querySelector('#alternar-musica');
const musicaLunaRise = new Audio('/sonidos/luna-rise-part-one.mp3');
const musicPlay = new Audio('/sonidos/play.wav');
const musicPause = new Audio('/sonidos/pause.mp3');
const musicBeep = new Audio('/sonidos/beep.mp3');
musicBeep.loop=false;
const btnEmpezarPausar = document.querySelector('#start-pause');
var temporizadorEnfoque = 25;
var idIntervalo=null;
btnCorto.addEventListener('click',()=>{
    fnCambiarContexto('descanso-corto');
    btnCorto.classList.add('active');
});

btnEnfoque.addEventListener('click',()=>{
    fnCambiarContexto('enfoque');
    btnEnfoque.classList.add('active');
});

btnLargo.addEventListener('click',()=>{
    fnCambiarContexto('descanso-largo');
    btnLargo.classList.add('active');
});

function fnCambiarContexto(contexto){
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`/imagenes/${contexto}.png`);
    botones.forEach((boton)=>{
        boton.classList.remove('active');
    });
    switch (contexto) {
        case "descanso-corto":
            title.innerHTML=`
                ¿Qué tal tomar un respiro? 
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `;
        break;

        case "descanso-largo":
            title.innerHTML=`
                Hora de volver a la superficie
                <strong class="app__title-strong">Haz una pausa larga.</strong>
            `;
        break;

        case "enfoque":
            title.innerHTMl=`
                Optimiza tu productividad,
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `;
        break;
        default:
        break;
    }

}

btnMusica.addEventListener('change',()=>{
    if(musicaLunaRise.paused){
        musicaLunaRise.play();
    }else{
        musicaLunaRise.pause()
    }
})
const cuentaRegresiva = () => {
    if (temporizadorEnfoque<=0) {
        musicBeep.play();
        fnReiniciar();
        return;
    }
    temporizadorEnfoque-=1;
    console.log(temporizadorEnfoque);
}
btnEmpezarPausar.addEventListener('click',fnIniciarPusar);

function fnIniciarPusar(){
    if(idIntervalo){
        musicPause.play();
        fnReiniciar();
        return;
    }else{
        musicPlay.play()
    }
    idIntervalo = setInterval(cuentaRegresiva,1000);
}

function fnReiniciar () {
    clearInterval(idIntervalo);
    idIntervalo=null;
}