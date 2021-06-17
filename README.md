<h1 align="center">
  <br>
  <img src="_PROMOCIJA\hermi_logo_700x500.png" width="300">
</h1>

<h4 align="center"><i>Spletna aplikacija za izdajo delovnih nalogov z analizo časov</i></h4>

![](https://img.shields.io/badge/-ReactJS-blue) ![](https://img.shields.io/badge/-Reactstrap-blue) ![](https://img.shields.io/badge/-Argon%20Dashboard-blue) ![](https://img.shields.io/badge/-Spring-blue) ![](https://img.shields.io/badge/-Firebase-blue) ![](https://img.shields.io/badge/-Docker-blue) ![](https://img.shields.io/badge/-Nginx-blue)

## Opis
Spletna aplikacija omogoča upravljanje z dnevnimi nalogi. Uporabniki lahko dodajajo in urejajo delovne naloge, spreminjajo njihov status in jih po filtriranju izvozijo v .xlsx. Na pregledni plošči je prikazana analiza delovnih nalogov. Uporabniki si lahko ogledajo število nalogov, ki so bili dodani v posameznem mescu, in analizo po montaži.
Aplikacija temelji na tehnologiji React. Podatkovno celovitost zagotavlja Spring.
    
Upravljanje z uporabniki je implementirano s pomočjo Google Firebase. Za dodajanje skrbnikov morajo poskrbeti že obstoječi uporabniki. Novi uporabniki bodo prejeli e-poštno sporočilo s povezavo do ponastavitve gesla. Nato se bodo lahko prijavili v spletno aplikacijo.
Spletna aplikacija omogoča spremljanje sprememb – vsak registriran uporabnik lahko pregleda zgodovino sprememb. Ogleda si lahko zgodovino sprememb šifrantov, delovnih nalogov in dnevnih nalogov (dodajanje, urejanje), prav tako pa sta ob vsaki spremembi zabeležena čas in avtor spremembe.

## Namestitveni postopek
Za namestitev rešitve je potreben `docker` in `docker-compose`
```bash
# Prenesi repository
$ git clone https://github.com/MuzeljHana/Hermi.git
```
V korenu projekta ustvarite `.env` datoteko z naslednjo vsebino
```shell
MYSQL_DATABASE=  # Ime podatkovne baze (npr. hermi)
MYSQL_USER=      # Ime uporabnika podatkovne baze (npr. admin)
MYSQL_PASSWORD=  # Geslo uporabnika podatkovne baze (npr. geslo)
```
Vspostavitev storitve
```bash
# Prevedi docker slike
$ docker-compose build

# Zaženi storitve
$ docker-compose run -d
```
Nadzorna plošča je dostopna na naslovu `localhost` na vratih `80`

## Razvojni postopek
Razvojno okolje omogoča razvoj komponent `Frontend` in `Microservices` z neprekinjenim ponovnim nalaganjem.

Za razvoj rešitve sta potrebena `docker` in `docker-compose`
```bash
# Prenesi repository
$ git clone https://github.com/MuzeljHana/Hermi.git
```
V korenu projekta ustvarite `.env` datoteko z naslednjo vsebino
```shell
MYSQL_DATABASE=  # Ime podatkovne baze (npr. hermi)
MYSQL_USER=      # Ime uporabnika podatkovne baze (npr. admin)
MYSQL_PASSWORD=  # Geslo uporabnika podatkovne baze (npr. geslo)
```
Vspostavitev in zagon storitve za razvoj
```bash
$ docker-compose -f docker-compose.dev.yml up --build
```
Nadzorna plošča je dostopna na naslovu `localhost` na vratih `80`, komponente pa se avtomatsko ponovno naložijo po vsaki spremembi izvorne kode.

## Avtorji
 - Hana Muzelj (Designer, Vodja) [![](https://github.githubassets.com/favicons/favicon.png)](https://github.com/MuzeljHana)
 - Tjan Ljubešek (Backend) [![](https://github.githubassets.com/favicons/favicon.png)](https://github.com/DaBLEshOT)
 - Ivana Lavrič (Frontend) [![](https://github.githubassets.com/favicons/favicon.png)](https://github.com/ivanalav00)
 - Tadej Lahovnik (Frontend) [![](https://github.githubassets.com/favicons/favicon.png)](https://github.com/lahovniktadej)
