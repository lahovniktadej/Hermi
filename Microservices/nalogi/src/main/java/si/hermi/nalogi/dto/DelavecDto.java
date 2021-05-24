package si.hermi.nalogi.dto;

public class DelavecDto {
    private String ime;

    private String priimek;

    private String telefonskaStevilka;

    public DelavecDto() {
    }

    public DelavecDto(String ime, String priimek, String telefonskaStevilka) {
        this.ime = ime;
        this.priimek = priimek;
        this.telefonskaStevilka = telefonskaStevilka;
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
}
