package si.hermi.nalogi.vao;

import javax.persistence.*;
import java.util.Date;

@Entity
public class DelovniNalog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Skrbnik skrbnik;

    private int sirfa;

    private String naziv;

    private Date zacetek;

    private Date konec;

    private Boolean status;

    public DelovniNalog() {
    }

    public DelovniNalog(int sirfa, String naziv, Date zacetek, Date konec, Boolean status) {
        this.sirfa = sirfa;
        this.naziv = naziv;
        this.zacetek = zacetek;
        this.konec = konec;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSirfa() {
        return sirfa;
    }

    public void setSirfa(int sirfa) {
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
}
