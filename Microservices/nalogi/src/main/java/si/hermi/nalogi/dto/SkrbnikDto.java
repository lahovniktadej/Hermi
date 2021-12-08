package si.hermi.nalogi.dto;

public class SkrbnikDto {
    private String ime;

    private String priimek;

    private String uporabniskoIme;

    public SkrbnikDto() {
    }

    public SkrbnikDto(String ime, String priimek, String uporabniskoIme) {
        this.ime = ime;
        this.priimek = priimek;
        this.uporabniskoIme = uporabniskoIme;
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

    public String getUporabniskoIme() {
        return uporabniskoIme;
    }

    public void setUporabniskoIme(String uporabniskoIme) {
        this.uporabniskoIme = uporabniskoIme;
    }
}
