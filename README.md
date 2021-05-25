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

# Prevedi docker slike
$ docker-compose build

# Zaženi storitve
$ docker-compose run -d
```
Nadzorna plošča je dostopna na [`localhost`](http:\\localhost)