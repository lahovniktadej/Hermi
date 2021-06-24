package si.hermi.nalogi.vao;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "vozilo")
@SQLDelete(sql = "UPDATE vozilo SET deleted = true WHERE id=?")
@FilterDef(name = "deletedFilter")
@Filter(name = "deletedFilter", condition = "deleted = false")
public class Vozilo{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String naziv;

    private String registrskaStevilka;

    private String operation;
     
    private long timestamp;
     
    private String spremenil;

    private boolean deleted = Boolean.FALSE;

    public Vozilo() {
    }

    public Vozilo(String naziv, String registrskaStevilka, String spremenil) {
        this.naziv = naziv;
        this.registrskaStevilka = registrskaStevilka;
        this.spremenil = spremenil;
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
        audit("Novo vozilo");
    }
     
    @PreUpdate
    public void onPreUpdate() {
        audit("Spremenjeno vozilo");
    }
     
    @PreRemove
    public void onPreRemove() {
        audit("Izbrisano vozilo");
    }
     
    private void audit(String operation) {
        setOperation(operation);
        setTimestamp((new Date()).getTime());
    }
}
