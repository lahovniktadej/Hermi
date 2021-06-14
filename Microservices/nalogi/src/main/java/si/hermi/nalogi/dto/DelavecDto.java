package si.hermi.nalogi.dto;

public class DelavecDto {
    private String ime;

    private String priimek;

    private String telefonskaStevilka;

    private String spremenil;

    public DelavecDto() {
    }

    public DelavecDto(String ime, String priimek, String telefonskaStevilka, String spremenil) {
        this.ime = ime;
        this.priimek = priimek;
        this.telefonskaStevilka = telefonskaStevilka;
        this.spremenil = spremenil;
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
    public String getSpremenil() {
        return spremenil;
    }

    public void setSpremenil(String spremenil) {
        this.spremenil = spremenil;
    }
}
