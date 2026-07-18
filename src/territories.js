// Curated Flickr tag lists per territory, following the original Mexican model:
// territory name + local-language/native-script variants + historic/former names
// and abbreviations (Distrito Federal, df, cdmx) + widely used exonyms (tokio,
// londres) + most-photographed cities and landmarks.
// Tags are comma-separated (Flickr ORs them) and URLSearchParams handles encoding.
// flickr.photos.search accepts at most 20 tags per query — keep every list under that.
// Ambiguous tags that mostly match other places or subjects are deliberately left
// out (león → León, Spain; toledo → Toledo, Spain; naruto → the anime; zion → the
// religious tag), so prefer specific forms like zionnationalpark.
// The first territory of each country is its default selection.

export const countries = [
  {
    label: "Mexico",
    territories: [
      {
        value:
          "querétaro,queretaro,santiagodequerétaro,santiagodequeretaro,qro",
        label: "Querétaro",
      },
      {
        value:
          "ciudaddeméxico,ciudaddemexico,cdmx,df,distritofederal,mexicodf,méxicodf,mexicocity,iztapalapa,coyoacán,coyoacan,xochimilco",
        label: "Ciudad de México",
      },
      { value: "aguascalientes,ags", label: "Aguascalientes" },
      {
        value: "bajacalifornia,tijuana,mexicali,ensenada,rosarito",
        label: "Baja California",
      },
      {
        value: "campeche,sanfranciscodecampeche,calakmul,ciudaddelcarmen",
        label: "Campeche",
      },
      {
        value:
          "chiapas,tuxtlagutiérrez,tuxtlagutierrez,sancristóbaldelascasas,sancristobaldelascasas,palenque",
        label: "Chiapas",
      },
      {
        value: "saltillo,coahuila,torreón,torreon,monclova",
        label: "Saltillo",
      },
      {
        value: "colima,manzanillo,villadeálvarez,villadealvarez,comala",
        label: "Colima",
      },
      { value: "durango,victoriadedurango,dgo", label: "Durango" },
      {
        value: "guanajuato,sanmigueldeallende,irapuato,celaya",
        label: "Guanajuato",
      },
      {
        value: "guerrero,acapulco,taxco,zihuatanejo,ixtapa,chilpancingo",
        label: "Guerrero",
      },
      { value: "hidalgo,pachuca,realdelmonte,huasca", label: "Hidalgo" },
      {
        value: "jalisco,guadalajara,gdl,zapopan,tlaquepaque,puertovallarta",
        label: "Guadalajara",
      },
      {
        value:
          "estadodeméxico,estadodemexico,edomex,toluca,tolucadelerdo,ecatepec,naucalpan,teotihuacán,teotihuacan,nezahualcóyotl,nezahualcoyotl",
        label: "Estado De México",
      },
      {
        value:
          "michoacán,michoacan,morelia,pátzcuaro,patzcuaro,uruapan,janitzio",
        label: "Michoacán",
      },
      {
        value: "morelos,cuernavaca,tepoztlán,tepoztlan,cuautla",
        label: "Morelos",
      },
      { value: "nayarit,tepic,sayulita,rivieranayarit", label: "Nayarit" },
      {
        value:
          "monterrey,nuevoleón,nuevoleon,mty,sanpedrogarzagarcía,sanpedrogarzagarcia",
        label: "Monterrey",
      },
      {
        value:
          "oaxaca,oaxacadejuárez,oaxacadejuarez,puertoescondido,huatulco,montealbán,montealban",
        label: "Oaxaca",
      },
      {
        value: "puebla,puebladezaragoza,cholula,atlixco,tehuacán,tehuacan",
        label: "Puebla",
      },
      {
        value:
          "quintanaroo,chetumal,cancún,cancun,playadelcarmen,tulum,cozumel,islamujeres,rivieramaya",
        label: "Quintana Roo",
      },
      {
        value: "sanluispotosi,sanluispotosí,slp,realdecatorce,huastecapotosina",
        label: "San Luis Potosí",
      },
      {
        value: "sinaloa,culiacán,culiacan,mazatlán,mazatlan,losmochis",
        label: "Sinaloa",
      },
      {
        value: "sonora,hermosillo,guaymas,puertopeñasco,puertopenasco,nogales",
        label: "Sonora",
      },
      { value: "tabasco,villahermosa,comalcalco", label: "Tabasco" },
      {
        value:
          "tamaulipas,ciudadvictoria,reynosa,matamoros,nuevolaredo,tampico",
        label: "Tamaulipas",
      },
      {
        value:
          "tlaxcala,tlaxcaladexicohténcatl,xicohténcatl,xicotencatl,huamantla,cacaxtla",
        label: "Tlaxcala",
      },
      {
        value:
          "veracruz,xalapa,jalapa,orizaba,coatzacoalcos,papantla,eltajín,eltajin",
        label: "Veracruz",
      },
      {
        value:
          "yucatán,yucatan,mérida,merida,chichénitzá,chichenitza,uxmal,izamal",
        label: "Yucatán",
      },
      { value: "zacatecas,fresnillo", label: "Zacatecas" },
    ],
  },
  {
    label: "France",
    territories: [
      {
        value: "îledefrance,iledefrance,paris,versailles,montmartre",
        label: "Île-de-France",
      },
      {
        value:
          "rhônealpes,rhonealpes,auvergne,lyon,grenoble,annecy,chamonix,clermontferrand",
        label: "Auvergne-Rhône-Alpes",
      },
      {
        value:
          "bourgogne,burgundy,dijon,franchecomté,franchecomte,besançon,besancon,beaune",
        label: "Bourgogne-Franche-Comté",
      },
      {
        value: "bretagne,brittany,breizh,rennes,brest,saintmalo,quimper",
        label: "Brittany",
      },
      {
        value:
          "valdeloire,loirevalley,tours,orléans,orleans,chambord,chartres,blois",
        label: "Centre-Val de Loire",
      },
      {
        value: "corse,corsica,ajaccio,bastia,bonifacio,calvi",
        label: "Corsica",
      },
      {
        value:
          "alsace,lorraine,strasbourg,reims,metz,colmar,mulhouse,champagneardenne",
        label: "Grand Est",
      },
      {
        value:
          "hautsdefrance,lille,picardie,picardy,nordpasdecalais,amiens,calais,dunkerque,dunkirk",
        label: "Hauts-de-France",
      },
      {
        value:
          "normandie,normandy,rouen,caen,lehavre,montsaintmichel,honfleur,étretat,etretat,deauville",
        label: "Normandy",
      },
      {
        value:
          "nouvelleaquitaine,aquitaine,bordeaux,biarritz,larochelle,limoges,poitiers,dordogne,paysbasque",
        label: "Nouvelle-Aquitaine",
      },
      {
        value:
          "occitanie,toulouse,montpellier,languedoc,nîmes,nimes,perpignan,carcassonne,midipyrénées,midipyrenees,lourdes",
        label: "Occitanie",
      },
      {
        value: "paysdelaloire,nantes,angers,lemans,vendée,vendee",
        label: "Pays de la Loire",
      },
      {
        value:
          "provence,marseille,nice,côtedazur,cotedazur,frenchriviera,aixenprovence,avignon,cannes,arles,sainttropez,antibes",
        label: "Provence-Alpes-Côte d'Azur",
      },
    ],
  },
  {
    label: "Germany",
    territories: [
      {
        value:
          "berlin,westberlin,eastberlin,ostberlin,kreuzberg,prenzlauerberg",
        label: "Berlin",
      },
      {
        value:
          "badenwürttemberg,badenwurttemberg,stuttgart,heidelberg,freiburg,karlsruhe,mannheim,schwarzwald,blackforest,tübingen,tubingen",
        label: "Baden-Württemberg",
      },
      {
        value:
          "bayern,bavaria,münchen,munich,nürnberg,nuremberg,augsburg,regensburg,würzburg,wurzburg,franken,franconia,neuschwanstein",
        label: "Bavaria",
      },
      { value: "brandenburg,potsdam,spreewald,cottbus", label: "Brandenburg" },
      { value: "bremen,bremerhaven", label: "Bremen" },
      {
        value: "hamburg,hamburgo,stpauli,speicherstadt",
        label: "Hamburg",
      },
      {
        value:
          "hessen,hesse,frankfurt,frankfurtammain,wiesbaden,kassel,darmstadt,marburg",
        label: "Hesse",
      },
      {
        value:
          "niedersachsen,lowersaxony,hannover,hanover,braunschweig,göttingen,gottingen,oldenburg,lüneburg,luneburg",
        label: "Lower Saxony",
      },
      {
        value:
          "mecklenburgvorpommern,mecklenburg,rostock,schwerin,stralsund,rügen,rugen,usedom",
        label: "Mecklenburg-Vorpommern",
      },
      {
        value:
          "nordrheinwestfalen,northrhinewestphalia,nrw,köln,cologne,düsseldorf,dusseldorf,dortmund,essen,bonn,aachen,münster,ruhrgebiet",
        label: "North Rhine-Westphalia",
      },
      {
        value: "rheinlandpfalz,rhinelandpalatinate,mainz,trier,koblenz,speyer",
        label: "Rhineland-Palatinate",
      },
      { value: "saarland,saarbrücken,saarbrucken", label: "Saarland" },
      {
        value:
          "sachsen,saxony,dresden,leipzig,chemnitz,meissen,meißen,görlitz,gorlitz",
        label: "Saxony",
      },
      {
        value:
          "sachsenanhalt,saxonyanhalt,magdeburg,dessau,wittenberg,quedlinburg",
        label: "Saxony-Anhalt",
      },
      {
        value: "schleswigholstein,kiel,lübeck,lubeck,flensburg,sylt",
        label: "Schleswig-Holstein",
      },
      {
        value: "thüringen,thuringia,erfurt,weimar,jena,eisenach",
        label: "Thuringia",
      },
    ],
  },
  {
    label: "Japan",
    territories: [
      {
        value:
          "tokyo,tokio,東京,東京都,shinjuku,shibuya,harajuku,asakusa,akihabara,ginza",
        label: "Tokyo",
      },
      { value: "aichi,愛知,愛知県,nagoya,名古屋", label: "Aichi" },
      { value: "akita,秋田,秋田県", label: "Akita" },
      { value: "aomori,青森,青森県,hirosaki", label: "Aomori" },
      { value: "chiba,千葉,千葉県,narita", label: "Chiba" },
      { value: "ehime,愛媛,愛媛県,matsuyama,松山", label: "Ehime" },
      { value: "fukui,福井,福井県", label: "Fukui" },
      { value: "fukuoka,福岡,福岡県,hakata,博多", label: "Fukuoka" },
      { value: "fukushima,福島,福島県,aizuwakamatsu", label: "Fukushima" },
      {
        value: "gifu,岐阜,岐阜県,takayama,高山,shirakawago,白川郷",
        label: "Gifu",
      },
      { value: "gunma,群馬,群馬県,kusatsu", label: "Gunma" },
      {
        value: "hiroshima,広島,広島県,miyajima,宮島,onomichi,尾道",
        label: "Hiroshima",
      },
      {
        value:
          "hokkaido,北海道,sapporo,札幌,hakodate,函館,otaru,小樽,furano,niseko",
        label: "Hokkaido",
      },
      { value: "hyogo,兵庫,兵庫県,kobe,神戸,himeji,姫路", label: "Hyogo" },
      { value: "ibaraki,茨城,茨城県,mito", label: "Ibaraki" },
      { value: "ishikawa,石川,石川県,kanazawa,金沢", label: "Ishikawa" },
      { value: "iwate,岩手,岩手県,morioka,hiraizumi", label: "Iwate" },
      { value: "kagawa,香川,香川県,takamatsu,naoshima,直島", label: "Kagawa" },
      {
        value: "kagoshima,鹿児島,鹿児島県,sakurajima,桜島,yakushima,屋久島",
        label: "Kagoshima",
      },
      {
        value:
          "kanagawa,神奈川,神奈川県,yokohama,横浜,kamakura,鎌倉,enoshima,江ノ島,hakone,箱根",
        label: "Kanagawa",
      },
      { value: "kochi,高知,高知県", label: "Kochi" },
      { value: "kumamoto,熊本,熊本県,阿蘇", label: "Kumamoto" },
      {
        value:
          "kyoto,kioto,京都,京都府,gion,祇園,arashiyama,嵐山,fushimiinari,伏見稲荷,kinkakuji,金閣寺",
        label: "Kyoto",
      },
      { value: "mie,三重,三重県,ise,伊勢", label: "Mie" },
      {
        value: "miyagi,宮城,宮城県,sendai,仙台,matsushima,松島",
        label: "Miyagi",
      },
      { value: "miyazaki,宮崎,宮崎県", label: "Miyazaki" },
      {
        value: "nagano,長野,長野県,matsumoto,松本,karuizawa,軽井沢",
        label: "Nagano",
      },
      { value: "nagasaki,長崎,長崎県,sasebo,佐世保", label: "Nagasaki" },
      { value: "nara,奈良,奈良県,todaiji,東大寺", label: "Nara" },
      { value: "niigata,新潟,新潟県,佐渡", label: "Niigata" },
      { value: "oita,大分,大分県,beppu,別府,yufuin,湯布院", label: "Oita" },
      { value: "okayama,岡山,岡山県,kurashiki,倉敷", label: "Okayama" },
      {
        value: "okinawa,沖縄,沖縄県,naha,那覇,ryukyu,琉球,ishigaki,石垣島",
        label: "Okinawa",
      },
      {
        value: "osaka,大阪,大阪府,namba,難波,dotonbori,道頓堀,umeda,梅田",
        label: "Osaka",
      },
      { value: "saga,佐賀,佐賀県,karatsu", label: "Saga" },
      { value: "saitama,埼玉,埼玉県,kawagoe,川越", label: "Saitama" },
      { value: "shiga,滋賀,滋賀県,biwako,琵琶湖,hikone", label: "Shiga" },
      {
        value: "shimane,島根,島根県,izumo,出雲,matsue,松江",
        label: "Shimane",
      },
      {
        value: "shizuoka,静岡,静岡県,hamamatsu,浜松,izu,伊豆",
        label: "Shizuoka",
      },
      {
        value: "tochigi,栃木,栃木県,nikko,日光,utsunomiya,宇都宮",
        label: "Tochigi",
      },
      { value: "tokushima,徳島,徳島県,鳴門", label: "Tokushima" },
      { value: "tottori,鳥取,鳥取県", label: "Tottori" },
      {
        value: "toyama,富山,富山県,tateyama,立山,gokayama,五箇山",
        label: "Toyama",
      },
      {
        value: "wakayama,和歌山,和歌山県,koyasan,高野山,kumano,熊野",
        label: "Wakayama",
      },
      {
        value: "yamagata,山形,山形県,zao,蔵王,yamadera,山寺",
        label: "Yamagata",
      },
      {
        value: "yamaguchi,山口,山口県,shimonoseki,下関,hagi,萩",
        label: "Yamaguchi",
      },
      {
        value: "yamanashi,山梨,山梨県,kawaguchiko,河口湖,fujisan,富士山,mtfuji",
        label: "Yamanashi",
      },
    ],
  },
  {
    label: "United Kingdom",
    territories: [
      {
        value: "london,londres,westminster,shoreditch,camden,greaterlondon",
        label: "London",
      },
      {
        value:
          "england,inglaterra,manchester,liverpool,birmingham,leeds,bristol,newcastle,sheffield,nottingham,oxford,cambridge,york,brighton,cornwall,lakedistrict",
        label: "England",
      },
      {
        value:
          "northernireland,belfast,derry,londonderry,giantscauseway,antrim",
        label: "Northern Ireland",
      },
      {
        value:
          "scotland,escocia,edinburgh,glasgow,highlands,aberdeen,dundee,inverness,isleofskye,stirling,lochness",
        label: "Scotland",
      },
      {
        value: "wales,cymru,gales,cardiff,swansea,snowdonia,pembrokeshire",
        label: "Wales",
      },
    ],
  },
  {
    label: "United States",
    territories: [
      {
        value:
          "newyork,newyorkcity,nyc,ny,brooklyn,manhattan,queens,bronx,harlem,statenisland,longisland",
        label: "New York",
      },
      { value: "alabama,montgomery,huntsville", label: "Alabama" },
      { value: "alaska,anchorage,fairbanks,juneau,denali", label: "Alaska" },
      {
        value: "arizona,phoenix,tucson,sedona,flagstaff,scottsdale,grandcanyon",
        label: "Arizona",
      },
      { value: "arkansas,littlerock,ozarks", label: "Arkansas" },
      {
        value:
          "california,losangeles,sanfrancisco,sandiego,sf,hollywood,oakland,sacramento,yosemite,socal",
        label: "California",
      },
      {
        value: "colorado,denver,boulder,coloradosprings,aspen",
        label: "Colorado",
      },
      { value: "connecticut,hartford,newhaven", label: "Connecticut" },
      { value: "delaware,rehobothbeach", label: "Delaware" },
      {
        value:
          "florida,miami,orlando,tampa,jacksonville,keywest,everglades,fortlauderdale,miamibeach",
        label: "Florida",
      },
      { value: "georgia,atlanta,savannah", label: "Georgia" },
      {
        value: "hawaii,honolulu,waikiki,maui,oahu,kauai,bigisland",
        label: "Hawaii",
      },
      { value: "idaho,boise,coeurdalene,sunvalley", label: "Idaho" },
      { value: "illinois,chicago,chicagoland", label: "Illinois" },
      { value: "indiana,indianapolis,fortwayne", label: "Indiana" },
      { value: "iowa,desmoines,iowacity,cedarrapids", label: "Iowa" },
      { value: "kansas,wichita,topeka", label: "Kansas" },
      { value: "kentucky,louisville,lexington,frankfort", label: "Kentucky" },
      {
        value: "louisiana,neworleans,nola,batonrouge,frenchquarter",
        label: "Louisiana",
      },
      { value: "maine,portlandmaine,acadia,barharbor", label: "Maine" },
      { value: "maryland,baltimore,annapolis", label: "Maryland" },
      {
        value: "massachusetts,boston,capecod,marthasvineyard",
        label: "Massachusetts",
      },
      { value: "michigan,detroit,annarbor,grandrapids", label: "Michigan" },
      {
        value: "minnesota,minneapolis,saintpaul,stpaul,duluth,twincities",
        label: "Minnesota",
      },
      { value: "mississippi,biloxi,natchez", label: "Mississippi" },
      {
        value: "missouri,stlouis,saintlouis,kansascity,branson",
        label: "Missouri",
      },
      {
        value: "montana,bozeman,missoula,glaciernationalpark",
        label: "Montana",
      },
      { value: "nebraska,omaha", label: "Nebraska" },
      { value: "nevada,lasvegas,reno,vegas,laketahoe", label: "Nevada" },
      { value: "newhampshire,whitemountains", label: "New Hampshire" },
      {
        value: "newjersey,newark,jerseycity,hoboken,atlanticcity,jerseyshore",
        label: "New Jersey",
      },
      {
        value: "newmexico,albuquerque,santafe,taos,whitesands,roswell",
        label: "New Mexico",
      },
      {
        value: "northcarolina,charlotte,raleigh,asheville,outerbanks",
        label: "North Carolina",
      },
      { value: "northdakota,fargo,bismarck", label: "North Dakota" },
      {
        value: "ohio,cleveland,columbus,cincinnati,dayton,akron",
        label: "Ohio",
      },
      { value: "oklahoma,oklahomacity,tulsa,okc", label: "Oklahoma" },
      {
        value: "oregon,portland,pdx,eugene,craterlake,mounthood",
        label: "Oregon",
      },
      {
        value: "pennsylvania,philadelphia,pittsburgh,philly,gettysburg",
        label: "Pennsylvania",
      },
      { value: "rhodeisland,providence,newport", label: "Rhode Island" },
      {
        value: "southcarolina,charleston,myrtlebeach,hiltonhead",
        label: "South Carolina",
      },
      {
        value: "southdakota,rapidcity,mountrushmore,badlands,siouxfalls",
        label: "South Dakota",
      },
      {
        value:
          "tennessee,nashville,memphis,knoxville,chattanooga,gatlinburg,smokymountains",
        label: "Tennessee",
      },
      {
        value:
          "texas,houston,austin,dallas,sanantonio,elpaso,fortworth,galveston",
        label: "Texas",
      },
      {
        value: "utah,saltlakecity,moab,zionnationalpark,brycecanyon,parkcity",
        label: "Utah",
      },
      { value: "vermont,burlington,stowe", label: "Vermont" },
      {
        value: "virginia,richmond,virginiabeach,charlottesville,shenandoah",
        label: "Virginia",
      },
      {
        value:
          "washingtonstate,washington,seattle,tacoma,spokane,mountrainier,olympicnationalpark",
        label: "Washington",
      },
      {
        value: "washingtondc,districtofcolumbia,dc,nationalmall",
        label: "Washington, D.C.",
      },
      {
        value: "westvirginia,harpersferry,morgantown",
        label: "West Virginia",
      },
      {
        value: "wisconsin,milwaukee,madison,greenbay,doorcounty",
        label: "Wisconsin",
      },
      {
        value: "wyoming,yellowstone,cheyenne,jacksonhole,grandteton",
        label: "Wyoming",
      },
    ],
  },
];
