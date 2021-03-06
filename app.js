// ihtiyaç duyulacak kısyaol değişkenleri
let skorInsan = 0;
let skorBilgisayar = 0;
const skorInsan_span = document.getElementById("skorInsan");
const skorBilgisayar_span = document.getElementById("skorBilgisayar");
const secimTas = document.getElementById("secimTas");
const secimKagit = document.getElementById("secimKagit");
const secimMakas = document.getElementById("secimMakas");
const bilgi = document.getElementById('bilgi');
const durum = document.querySelector('.durum');
const kurtarici = document.getElementById("kurtar");
const yukPuani_i = document.getElementsByClassName('yukPuani')[0].getElementsByTagName("i")[0];
let yukseltmePuani=0;
let pcYukseltmePuani=0;
let hamleler = [];
//hasarlar
let tasHasar = 1;
let makasHasar = 1;
let kagitHasar = 1;

let pctHasar = 1;
let pcmHasar = 1;
let pckHasar = 1;
// yukseltme butonları
const yukseltTas = document.getElementById("yukseltTas");
const yukseltKagit = document.getElementById("yukseltKagit");
const yukseltMakas = document.getElementById("yukseltMakas");
// limit kilitleri
const tasKilit = document.getElementById("tasLimit");
const kagitKilit = document.getElementById("kagitLimit");
const makasKilit = document.getElementById("makasLimit");
let cezaPuani = 0;
let cezali = "";


// bilgisayar adına rastgele oynatma
rastgelePC = () => {
  let pcKarar = Math.floor(Math.random()*3);
  switch (pcKarar) {
    case 0:
    return 't';
    break;
    case 1:
    return 'm';
    break;
    case 2:
    return 'k';
    break;
  }
}

// bilgisayar rastgele yükseltme yapma

rastgeleYukseltmePC = () =>{
  if(pcYukseltmePuani>0){
    let pcSecilenHasar = Math.floor(Math.random()*3);
    switch(pcSecilenHasar){
      case 0:
        pctHasar++;
        break;
      case 1:
        pcmHasar++;
        break;
      case 2:
        pckHasar++;
        break;
    }
    pcYukseltmePuani--;
  }
}



// oyun kontrolleri ile zafer,bozgun ve beraberlik hesaplama
savasiBaslat = (pc,insan) => {
    switch (insan+pc) {


      case 'tm':
      if(tasHasar >= pcmHasar)
        bilgiVer("insanKazandi",pc,insan);
      else
        bilgiVer("bilgisayarKazandi",pc,insan);
      break;
      case 'kt':
      if(kagitHasar >= pctHasar)
        bilgiVer("insanKazandi",pc,insan);
      else
        bilgiVer("bilgisayarKazandi",pc,insan);
      break;
      case 'mk':
      if(makasHasar >= pckHasar)
        bilgiVer("insanKazandi",pc,insan);
      else
        bilgiVer("bilgisayarKazandi",pc,insan);
      break;


      case 'mt':
      if(makasHasar > pctHasar)
        bilgiVer("insanKazandi",pc,insan);
      else
        bilgiVer("bilgisayarKazandi",pc,insan);
      break;
      case 'tk':
      if(tasHasar > pckHasar)
        bilgiVer("insanKazandi",pc,insan);
      else
        bilgiVer("bilgisayarKazandi",pc,insan);
      break;
      case 'km':
      if(kagitHasar > pcmHasar)
        bilgiVer("insanKazandi",pc,insan);
      else
        bilgiVer("bilgisayarKazandi",pc,insan);
      break;


      case 'mm':
      if(makasHasar > pcmHasar)
        bilgiVer("insanKazandi",pc,insan);
      else if(makasHasar < pcmHasar)
        bilgiVer("bilgisayarKazandi",pc,insan);
      else
        bilgiVer("berabere",pc,insan);
      break;
      case 'tt':
      if(tasHasar > pctHasar)
        bilgiVer("insanKazandi",pc,insan);
      else if(tasHasar < pctHasar)
        bilgiVer("bilgisayarKazandi",pc,insan);
      else
        bilgiVer("berabere",pc,insan);
      break;
      case 'kk':
        if(kagitHasar > pckHasar)
        bilgiVer("insanKazandi",pc,insan);
      else if(kagitHasar < pckHasar)
        bilgiVer("bilgisayarKazandi",pc,insan);
      else
        bilgiVer("berabere",pc,insan);
      break;
    }
}

// kısayol harflerini metine çevirme
metinlestir = (harf) => {
  switch (harf) {
    case 't':
      return 'Taş';
    break;
    case 'k':
      return 'Kağıt';
    break;
    case 'm':
      return 'Makas';
    break;
  }
}

// bilgi çubuğunda oynanan el hakkında bilgi döndürme
bilgiVer = (durumAtak,pc,insan) => {
  let pcPuan;
  let insanPuan;
  // puan yazısı için veri çekme
  switch(pc){
    case "t":
    pcPuan = pctHasar;
    break;
    case "k":
    pcPuan = pckHasar;
    break;
    case "m":
    pcPuan = pcmHasar;
    break;
  }
  switch(insan){
    case "t":
    insanPuan = tasHasar;
    break;
    case "k":
    insanPuan = kagitHasar;
    break;
    case "m":
    insanPuan = makasHasar;
    break;
  }
  // bilgi metni içerisindeki küçük renkli yazılar -- PUAN YAZILARI
  const pcKisa = pcPuan.toString().fontsize(2).sup().fontcolor('red');
  const insanKisa = insanPuan.toString().fontsize(2).sup().fontcolor('green');
  if(durumAtak=="insanKazandi"){
    yukseltmePuani++;
    skorInsan++;
    bilgi.innerHTML=`${metinlestir(pc)}${pcKisa}, ${metinlestir(insan)}${insanKisa} ile yok edildi. Kazandın!`;
    skorInsan_span.innerHTML = skorInsan;
    document.getElementById(insan).classList.add('yesil');
    setInterval(()=>{document.getElementById(insan).classList.remove('yesil')},400);
  }
  if(durumAtak=="bilgisayarKazandi"){
    skorBilgisayar++;
    pcYukseltmePuani++;
    rastgeleYukseltmePC();
    bilgi.innerHTML=`${metinlestir(pc)}${pcKisa} ile ${metinlestir(insan)}${insanKisa} mahvedildi. Kaybettin!`;
    skorBilgisayar_span.innerHTML = skorBilgisayar;
    document.getElementById(insan).classList.add('kirmizi');
    setInterval(()=>{document.getElementById(insan).classList.remove('kirmizi')},400);
  }
  if(durumAtak=="berabere"){
    bilgi.innerHTML=`${metinlestir(pc)}${pcKisa} ve ${metinlestir(insan)}${insanKisa}. Berabere!`;
    document.getElementById(insan).classList.add('gri');
    setInterval(()=>{document.getElementById(insan).classList.remove('gri')},400);
  }
}

// durum çubuğunda insan için level yazıları
durumSeviye = () => {
  if(skorInsan > 5){
    durum.innerHTML = "Başlıyoruz!!";
  }
  if(skorInsan > 15){
    durum.innerHTML = "Öğreniyorsun!";
  }
  if(skorInsan > 35){
    durum.innerHTML = "Şanslı, Çok Şanslısın!";
  }
  if(skorInsan > 55){
    durum.innerHTML = "Hey, hadi ama, bu kadar yeter!";
  }

}
// başlatma fonksiyoonu ile tuşlara tıklama kontrolü
baslat = () =>{
  secimTas.addEventListener('click',() => {
    if (cezali != "taş"){
    hamleKaydet("t");
    let pc = rastgelePC();
    savasiBaslat(pc,'t');
    }
  });
  secimMakas.addEventListener('click',() => {
    if (cezali != "makas"){
    hamleKaydet("m");
    let pc = rastgelePC();
    savasiBaslat(pc,'m');
    }
  });
  secimKagit.addEventListener('click',() => {
    if (cezali != "kağıt"){
    hamleKaydet("k");
    let pc = rastgelePC();
    savasiBaslat(pc,'k');
    }
  });
} 


// yükseltme kontrolcüsü
yukseltmeKontrol = () => {
  rastgeleYukseltmePC();

  yukPuani_i.innerHTML = yukseltmePuani;
  
  // yükseltme gösterici
  yukseltKagit.innerHTML = "+ ("+kagitHasar+")";
  yukseltMakas.innerHTML = "+ ("+makasHasar+")";
  yukseltTas.innerHTML = "+ ("+tasHasar+")";

  if(yukseltmePuani > 0){
    for(var x = 0;x<3;x++){
      document.querySelector(".secimler").getElementsByTagName("span")[x].classList.add('yesil');
    }
  }

  if(yukseltmePuani <= 0){
    yukseltmePuani=0;
    for(var x = 0;x<3;x++){
      document.querySelector(".secimler").getElementsByTagName("span")[x].classList.remove('yesil');
    }
  }


}

// yükseltme yapma fonskiyonu
yukseltmeYap = () =>{

      //kagit secilirse
      yukseltKagit.addEventListener('click',()=>{
        if(yukseltmePuani>0){
        yukseltmePuani--;
        kagitHasar++;
        }
      });
       //makas secilirse
      yukseltMakas.addEventListener('click',()=>{
        if(yukseltmePuani>0){
        yukseltmePuani--;
        makasHasar++;}
      });
       //tas secilirse
      yukseltTas.addEventListener('click',()=>{
        if(yukseltmePuani>0){
        yukseltmePuani--;
        tasHasar++;}
      });

}


// çok yenilince kurtarma butonu
kurtariciFonk = () =>{
  let sonuc = skorBilgisayar - skorInsan;
  let sonucAI = skorInsan - skorBilgisayar;
  if(sonuc > 10){
    kurtarici.setAttribute("style","display:inline-block !important;");
  }

  if(sonucAI > 10){
    skorBilgisayar+=5;
    skorBilgisayar_span.innerHTML = skorBilgisayar.toString().fontcolor("green");
    pcYukseltmePuani+=3;
    yukseltmePuani+=1;
  }
}
kurtariciButon = () =>{
  kurtarici.addEventListener("click",()=>{
    kurtarici.setAttribute("style","display:none !important;");
    skorBilgisayar-=5;
    skorBilgisayar_span.innerHTML = skorBilgisayar.toString().fontcolor("red");
    yukseltmePuani+=7;
    pcYukseltmePuani+=1;
    yukPuani_i.innerHTML = yukseltmePuani.toString().fontcolor("green");
  });
}


// oyuncu hamlelerini kaydet
hamleKaydet = (yeniHamle) =>{

  hamleler[0] = hamleler[1];
  hamleler[1] = hamleler[2];
  hamleler[2] = hamleler[3];
  hamleler[3] = hamleler[4];
  hamleler[4] = hamleler[5];
  hamleler[5] = hamleler[6];
  hamleler[6] = hamleler[7];
  hamleler[7] = hamleler[8];
  hamleler[8] = hamleler[9];
  hamleler[9] = yeniHamle;

  cezaPuani--;

  if(cezaPuani < 0){
    cezaPuani = 0;
  }

  hamleLimit(hamleler);
}

// hamlelere limit koy
hamleLimit = (hamleListesi)=>{ 

  let tAdet = 0;
  let mAdet = 0;
  let kAdet = 0;
  // kullanılan hamleleri depola
  hamleListesi.forEach(element => {
    if(element == "t"){
      tAdet++
    }
    if(element == "m"){
      mAdet++;
    }
    if(element == "k"){
      kAdet++;
    }
  });
  // eğer cezalı yoksa
  if(cezali == ""){
    //hamle limiti koy
    if(tAdet >= 7){
      cezaPuani = 3;
      cezali = "taş";
      tAdet = 0; 
    }
    if(mAdet >= 7){
      cezaPuani = 3;
      cezali = "makas";
    }
    if(kAdet >= 7){
      cezaPuani = 3;
      cezali = "kağıt";
    }
  }


}

// Ceza verici ve kontrolcüsü
cezaci = () =>{
  if(cezali == "taş"){
    if(cezaPuani > 0){
      tasKilit.setAttribute("style","display:inline-block;");
      secimTas.classList.add('limitKilidi');
      durum.innerHTML = "Taşa 3 Tur ceza".fontcolor("red");
      tasKilit.innerHTML=cezaPuani;
    }else{
      cezali = "";
    }
  }else{
    tasKilit.setAttribute("style","display:none;");
    secimTas.classList.remove('limitKilidi');
  }



  if(cezali == "kağıt"){
    if(cezaPuani > 0){
      kagitKilit.setAttribute("style","display:inline-block;");
      secimKagit.classList.add('limitKilidi');
      durum.innerHTML = "Kağıda 3 Tur ceza".fontcolor("red");
      kagitKilit.innerHTML=cezaPuani;
    }else{
      cezali = "";
    }
  }else{
    kagitKilit.setAttribute("style","display:none;");
    secimKagit.classList.remove('limitKilidi');
  }




  if(cezali == "makas"){
    if(cezaPuani > 0){
      makasKilit.setAttribute("style","display:inline-block;");
      secimMakas.classList.add('limitKilidi');
      durum.innerHTML = "Makasa 3 Tur ceza".fontcolor("red");
      makasKilit.innerHTML=cezaPuani;
    }else{
      cezali = "";
    }
  }else{
    makasKilit.setAttribute("style","display:none;");
    secimMakas.classList.remove('limitKilidi');
  }

  
}






// oyunu başlatma ve durum çubuğu kontrollerini başlatma
setInterval(yukseltmeKontrol,100);
setInterval(durumSeviye,100);
setInterval(cezaci,100);
setInterval(kurtariciFonk,300);
kurtariciButon();
yukseltmeYap();
baslat();





// mertcanuslu18@gmail.com