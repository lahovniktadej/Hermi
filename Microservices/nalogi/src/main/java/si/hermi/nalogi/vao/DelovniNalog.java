package si.hermi.nalogi.vao;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class DelovniNalog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne
    private Skrbnik skrbnik;

    private String sifra;

    private String naziv;

    private Date zacetek;

    private Date konec;

    private Boolean status;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Ekipa> ekipe;

    private String objekt;

    private String operation;
     
    private long timestamp;
     
    private String spremenil;

    public DelovniNalog() {
    }

    public DelovniNalog(int id, Skrbnik skrbnik, String sifra, String naziv, Date zacetek, Date konec, Boolean status, List<Ekipa> ekipe, String objekt, String spremenil) {
        this.id = id;
        this.skrbnik = skrbnik;
        this.sifra = sifra;
        this.naziv = naziv;
        this.zacetek = zacetek;
        this.konec = konec;
        this.status = status;
        this.ekipe = ekipe;
        this.objekt = objekt;
        this.spremenil = spremenil;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Skrbnik getSkrbnik() {
        return skrbnik;
    }

    public void setSkrbnik(Skrbnik skrbnik) {
        this.skrbnik = skrbnik;
    }

    public String getSifra() {
        return sifra;
    }

    public void setSifra(String sifra) {
        this.sifra = sifra;
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

    public List<Ekipa> getEkipe() {
        return ekipe;
    }

    public void setEkipe(List<Ekipa> ekipe) {
        this.ekipe = ekipe;
    }

    public String getObjekt() {
        return objekt;
    }

    public void setObjekt(String objekt) {
        this.objekt = objekt;
    }
    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getSpremenil() {
        return spremenil;
    }

    public void setSpremenil(String spremenil) {
        this.spremenil = spremenil;
    }

    @PrePersist
    public void onPrePersist() {
        audit("Nov delovni nalog");
    }
     
    @PreUpdate
    public void onPreUpdate() {
        audit("Spremenjen delovni nalog");
    }
     
    @PreRemove
    public void onPreRemove() {
        audit("Izbrisan delovni nalog");
    }
     
    private void audit(String operation) {
        setOperation(operation);
        setTimestamp((new Date()).getTime());
    }
}
