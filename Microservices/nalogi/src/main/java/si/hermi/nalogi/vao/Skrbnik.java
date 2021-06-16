package si.hermi.nalogi.vao;

import javax.persistence.*;

@Entity
public class Skrbnik {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String ime;

    private String priimek;

    @Column(unique = true)
    private String uporabniskoIme;

    public Skrbnik() {
    }

    public Skrbnik(String ime, String priimek, String uporabniskoIme) {
        this.ime = ime;
        this.priimek = priimek;
        this.uporabniskoIme = uporabniskoIme;
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

    public String getUporabniskoIme() {
        return uporabniskoIme;
    }

    public void setUporabniskoIme(String uporabniskoIme) {
        this.uporabniskoIme = uporabniskoIme;
    }
}
