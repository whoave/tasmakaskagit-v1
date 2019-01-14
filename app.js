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

// bilgisayar adına rastgele oynatma
rastgelePC = function(){
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



// oyun kontrolleri ile zafer,bozgun ve beraberlik hesaplama
savasiBaslat = function(pc,insan){
    switch (insan+pc) {
      case 'tm':
      case 'kt':
      case 'mk':
        bilgiVer("insanKazandi",pc,insan);
      break;
      case 'mt':
      case 'tk':
      case 'km':
        bilgiVer("bilgisayarKazandi",pc,insan);
      break;
      case 'mm':
      case 'tt':
      case 'kk':
        bilgiVer("berabere",pc,insan);
      break;
    }
}

// kısayol harflerini metine çevirme
metinlestir = function(harf){
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
bilgiVer = function(durumAtak,pc,insan){
  // bilgi metni içerisindeki küçük renkli yazılar
  const pcKisa = 'pc'.fontsize(2).sup().fontcolor('red');
  const insanKisa = 'insan'.fontsize(2).sup().fontcolor('green');
  if(durumAtak=="insanKazandi"){
    skorInsan++;
    bilgi.innerHTML=`${metinlestir(pc)}${pcKisa}, ${metinlestir(insan)}${insanKisa} ile yok edildi. Kazandın!`;
    skorInsan_span.innerHTML = skorInsan;
    document.getElementById(insan).classList.add('yesil');
    setInterval(function(){document.getElementById(insan).classList.remove('yesil')},400);
  }
  if(durumAtak=="bilgisayarKazandi"){
    skorBilgisayar++;
    bilgi.innerHTML=`${metinlestir(pc)}${pcKisa} ile ${metinlestir(insan)}${insanKisa} mahvedildi. Kaybettin!`;
    skorBilgisayar_span.innerHTML = skorBilgisayar;
    document.getElementById(insan).classList.add('kirmizi');
    setInterval(function(){document.getElementById(insan).classList.remove('kirmizi')},400);
  }
  if(durumAtak=="berabere"){
    bilgi.innerHTML=`${metinlestir(pc)}${pcKisa} ve ${metinlestir(insan)}${insanKisa}. Berabere!`;
    document.getElementById(insan).classList.add('gri');
    setInterval(function(){document.getElementById(insan).classList.remove('gri')},400);
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
baslat = function(){
  secimTas.addEventListener('click',function(){
    let pc = rastgelePC();
    savasiBaslat(pc,'t');
  });
  secimMakas.addEventListener('click',function(){
    let pc = rastgelePC();
    savasiBaslat(pc,'m');
  });
  secimKagit.addEventListener('click',function(){
    let pc = rastgelePC();
    savasiBaslat(pc,'k');
  });
}

// oyunu başlatma ve durum çubuğu kontrollerini başlatma
setInterval(durumSeviye,100);
baslat();



//mert