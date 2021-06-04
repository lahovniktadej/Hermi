package si.hermi.nalogi.dto;

import si.hermi.nalogi.vao.Ekipa;
import si.hermi.nalogi.vao.Skrbnik;

import java.sql.Date;
import java.util.List;

public class DelovniNalogDto {
    private String sifra;

    private String naziv;

    private String objekt;

    private Date zacetek;

    private Date konec;

    private boolean status;

    private Skrbnik skrbnik;

    private List<Ekipa> ekipe;

    public DelovniNalogDto() {
    }

    public DelovniNalogDto(String sifra, String naziv, String objekt, Date zacetek, Date konec, boolean status, Skrbnik skrbnik, List<Ekipa> ekipe) {
        this.sifra = sifra;
        this.naziv = naziv;
        this.objekt = objekt;
        this.zacetek = zacetek;
        this.konec = konec;
        this.status = status;
        this.skrbnik = skrbnik;
        this.ekipe = ekipe;
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

    public String getObjekt() {
        return objekt;
    }

    public void setObjekt(String objekt) {
        this.objekt = objekt;
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Skrbnik getSkrbnik() {
        return skrbnik;
    }

    public void setSkrbnik(Skrbnik skrbnik) {
        this.skrbnik = skrbnik;
    }

    public List<Ekipa> getEkipe() {
        return ekipe;
    }

    public void setEkipe(List<Ekipa> ekipe) {
        this.ekipe = ekipe;
    }

    @Override
    public String toString() {
        return "DelovniNalogDto{" +
                "sifra='" + sifra + '\'' +
                ", naziv='" + naziv + '\'' +
                ", objekt='" + objekt + '\'' +
                ", zacetek=" + zacetek +
                ", konec=" + konec +
                ", status=" + status +
                ", skrbnik=" + skrbnik +
                ", ekipe=" + ekipe +
                '}';
    }
}
