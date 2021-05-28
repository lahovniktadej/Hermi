package si.hermi.nalogi.dto;

public class VoziloDto {
    private String naziv;

    private String registerskaStevilka;

    public VoziloDto() {
    }

    public VoziloDto(String naziv, String registerskaStevilka) {
        this.naziv = naziv;
        this.registerskaStevilka = registerskaStevilka;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getRegisterskaStevilka() {
        return registerskaStevilka;
    }

    public void setRegisterskaStevilka(String registerskaStevilka) {
        this.registerskaStevilka = registerskaStevilka;
    }
}
