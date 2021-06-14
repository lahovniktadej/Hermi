package si.hermi.nalogi.vao;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Delavec {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String ime;

    private String priimek;

    private String telefonskaStevilka;

    private String operation;
     
    private long timestamp;
     
    private String spremenil;

    public Delavec() {
    }

    public Delavec(int id, String ime, String priimek, String telefonskaStevilka, String spremenil) {
        this.id = id;
        this.ime = ime;
        this.priimek = priimek;
        this.telefonskaStevilka = telefonskaStevilka;
        this.spremenil = spremenil;
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
        audit("Nov delavec");
    }
     
    @PreUpdate
    public void onPreUpdate() {
        audit("Spremenjen delavec");
    }
     
    @PreRemove
    public void onPreRemove() {
        audit("Izbrisan delavec");
    }
     
    private void audit(String operation) {
        setOperation(operation);
        setTimestamp((new Date()).getTime());
    }
}