package si.hermi.nalogi.dto;

public class VoziloDto {
    private String naziv;

    private String registrskaStevilka;

    private String spremenil;

    public VoziloDto() {
    }

    public VoziloDto(String naziv, String registrskaStevilka, String spremenil) {
        this.naziv = naziv;
        this.registrskaStevilka = registrskaStevilka;
        this.spremenil = spremenil;
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
    
    public String getSpremenil() {
        return spremenil;
    }

    public void setSpremenil(String spremenil) {
        this.spremenil = spremenil;
    }
}
