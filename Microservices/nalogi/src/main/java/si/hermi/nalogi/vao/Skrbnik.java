package si.hermi.nalogi.vao;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;

@Entity
@Table(name = "skrbnik")
@SQLDelete(sql = "UPDATE skrbnik SET deleted = true WHERE id=?")
@FilterDef(name = "deletedFilter")
@Filter(name = "deletedFilter", condition = "deleted = false")
public class Skrbnik {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String ime;

    private String priimek;

    @Column(unique = true)
    private String uporabniskoIme;

    private boolean deleted = Boolean.FALSE;

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
