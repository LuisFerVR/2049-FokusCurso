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
const txtBtnEmpezarPausar = document.querySelector('#start-pause span');
const imgBoton = document.querySelector('.app__card-primary-butto-icon');
const textoTemporizadorEnPantalla = document.querySelector('#timer');
var tiempoTranscurridoEnSegundos = 1500;
var idIntervalo=null;
btnCorto.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos =300; // 5 minutos en segundos
    fnCambiarContexto('descanso-corto');
    btnCorto.classList.add('active');
});

btnEnfoque.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos =1500;// 25 minutos en segundos
    fnCambiarContexto('enfoque');
    btnEnfoque.classList.add('active');
});

btnLargo.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 900; // 15 minutos en segundos
    fnCambiarContexto('descanso-largo');
    btnLargo.classList.add('active');
});

function fnCambiarContexto(contexto){
    fnMostrarTiempo();
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
    if (tiempoTranscurridoEnSegundos<=0) {
        musicBeep.play();
        fnReiniciar();
        return;
    }
    tiempoTranscurridoEnSegundos-=1;
    fnMostrarTiempo();
}
btnEmpezarPausar.addEventListener('click',fnIniciarPusar);

function fnIniciarPusar(){
    if(idIntervalo){
        txtBtnEmpezarPausar.textContent='Empezar';
        fnManipularAtributos(imgBoton,'src','play_arrow')
        musicPause.play();
        fnReiniciar();
        return;
    }else{
        musicPlay.play()
        txtBtnEmpezarPausar.textContent='Pausar';
        fnManipularAtributos(imgBoton,'src','pause')
    }
    idIntervalo = setInterval(cuentaRegresiva,1000);
}

function fnReiniciar () {
    clearInterval(idIntervalo);
    idIntervalo=null;
}

function fnManipularAtributos(elemento,attr,value){
    elemento.setAttribute(attr,`/imagenes/${value}.png`);
}

function fnMostrarTiempo(){
    let tiempo = tiempoTranscurridoEnSegundos;
    let tiempoFormteado = new Date(tiempo*1000).toLocaleString('es-MX',{minute:'2-digit',second:'2-digit'});
    textoTemporizadorEnPantalla.innerHTML=`${tiempoFormteado}`;
}

fnMostrarTiempo();