package si.hermi.nalogi.vao;

import javax.persistence.*;
import java.util.Date;

@Entity
public class DelovniNalog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne
    private Skrbnik skrbnik;

    private String sirfa;

    private String naziv;

    private Date zacetek;

    private Date konec;

    private Boolean status;

    @ManyToOne
    private Ekipa ekipa;

    private String objekt;

    public DelovniNalog() {
    }

    public DelovniNalog(int id, Skrbnik skrbnik, String sirfa, String naziv, Date zacetek, Date konec, Boolean status, Ekipa ekipa, String objekt) {
        this.id = id;
        this.skrbnik = skrbnik;
        this.sirfa = sirfa;
        this.naziv = naziv;
        this.zacetek = zacetek;
        this.konec = konec;
        this.status = status;
        this.ekipa = ekipa;
        this.objekt = objekt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSirfa() {
        return sirfa;
    }

    public void setSirfa(String sirfa) {
        this.sirfa = sirfa;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public Date getZacetek() {
        return zacetek;
    }

    public void setZacetek(Date zacetek) {
        this.zacetek = zacetek;
    }

    public Date getKonec() {
        return konec;
    }

    public void setKonec(Date konec) {
        this.konec = konec;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Skrbnik getSkrbnik() {
        return skrbnik;
    }

    public void setSkrbnik(Skrbnik skrbnik) {
        this.skrbnik = skrbnik;
    }

    public Ekipa getEkipa() {
        return ekipa;
    }

    public void setEkipa(Ekipa ekipa) {
        this.ekipa = ekipa;
    }

    public String getObjekt() {
        return objekt;
    }

    public void setObjekt(String objekt) {
        this.objekt = objekt;
    }
}
