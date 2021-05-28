package si.hermi.nalogi.dto;

public class VoziloDto {
    private String naziv;

    private String registrskaStevilka;

    public VoziloDto() {
    }

    public VoziloDto(String naziv, String registrskaStevilka) {
        this.naziv = naziv;
        this.registrskaStevilka = registrskaStevilka;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getRegisterskaStevilka() {
        return registrskaStevilka;
    }

    public void setRegisterskaStevilka(String registerskaStevilka) {
        this.registrskaStevilka = registerskaStevilka;
    }
}
