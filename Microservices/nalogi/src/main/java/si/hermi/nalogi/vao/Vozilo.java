package si.hermi.nalogi.vao;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Vozilo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String naziv;

    private String registrskaStevilka;

    public Vozilo() {
    }

    public Vozilo(String naziv, String registrskaStevilka) {
        this.naziv = naziv;
        this.registrskaStevilka = registrskaStevilka;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getRegistrskaStevilka() {
        return registrskaStevilka;
    }

    public void setRegistrskaStevilka(String registrskaStevilka) {
        this.registrskaStevilka = registrskaStevilka;
    }
}
