var locations = [
    ['<b>Toptan</b><br>Küçüksaat Karşısı Hilalhan İş Merkezi Zemin Kat No:23 Seyhan / ADANA<br>Telefon: 0 322 363 50 33<br>', 36.987262, 35.325024, 6],
    ['<b>Çakmak Caddesi</b><br>Tepebağ Mahallesi Çakmak Caddesi Toros Mağazası Karşısı No:34 Seyhan / ADANA<br>Telefon: 0 322 363 51 23<br>', 36.987878, 35.325227, 5],
    ['<b>Barajyolu</b><br>Yenibaraj Mahallesi 6,5 Durak Ziraat Bankası Karşısı Beyoğlu Apartmanı B Blok No:90/A Seyhan / ADANA<br>Telefon: 0 322 270 00 02<br>', 37.025032, 35.314621, 4],
    ['<b>Kenan Evren</b><br>Kenan Evren Bulvarı Mahfesığmaz Mahallesi Kapalı Semt Pazarı Karşısı Çukurova / ADANA<br>Telefon: 0 322 231 07 66<br>', 37.040832, 35.304139, 3],
    ['<b>Gazipaşa</b><br>Cemalpaşa Mahallesi Ethem Ekin Sokak Ekrem Bayazıt Apt. Doğal Büfe Bitişiği Seyhan / ADANA <br>Telefon: 0 322 454 06 88<br>', 37.001386, 35.324376, 2],
    ['<b>Küçüksaat</b><br>Kuruköprü Mahallesi Özler Caddesi Küçüksaat Şenbayrak Oteli Yanı Seyhan / ADANA<br>Telefon: 0 322 363 20 60<br>', 36.988178, 35.323964, 1]
];

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    /* Zoom level of your map */
    center: new google.maps.LatLng(37.001386, 35.324376),
    /* coordinates for the center of your map */
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
        }
    })(marker, i));
}