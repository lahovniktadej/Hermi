<h1 align="center">
  <br>
  <img src="Dokumentacija\Slike\hermi-logo-dark.png" width="200">
  <br>
  Dashboard
  <br>
</h1>

<h4 align="center"><i>Namizna aplikacija za izdajo delovnih nalogov z analizo časov v sodelovanju s podjetjem Hermi d.o.o. okviru predmeta Praktikum 2 za ITK 2 UN.</i></h4>

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



