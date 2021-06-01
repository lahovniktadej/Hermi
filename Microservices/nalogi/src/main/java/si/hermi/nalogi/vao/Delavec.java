package si.hermi.nalogi.vao;

import javax.persistence.*;

@Entity
public class Delavec {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String ime;

    private String priimek;

    private String telefonskaStevilka;

    public Delavec() {
    }

    public Delavec(int id, String ime, String priimek, String telefonskaStevilka) {
        this.id = id;
        this.ime = ime;
        this.priimek = priimek;
        this.telefonskaStevilka = telefonskaStevilka;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPriimek() {
        return priimek;
    }

    public void setPriimek(String priimek) {
        this.priimek = priimek;
    }

    public String getTelefonskaStevilka() {
        return telefonskaStevilka;
    }

    public void setTelefonskaStevilka(String telefonskaStevilka) {
        this.telefonskaStevilka = telefonskaStevilka;
    }
}