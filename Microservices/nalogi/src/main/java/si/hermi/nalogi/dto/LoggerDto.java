package si.hermi.nalogi.dto;

import si.hermi.nalogi.vao.Logger;

import java.sql.Timestamp;

public class LoggerDto {

    private Timestamp timeStamp;

    private String sprememba;

    private String originalniPodatki;

    private String noviPodatki;

    private String emailSkrbnika;

    public LoggerDto() {
    }

    public LoggerDto(Timestamp timeStamp, String sprememba, String originalniPodatki, String noviPodatki, String emailSkrbnika) {
        this.timeStamp = timeStamp;
        this.originalniPodatki = originalniPodatki;
        this.noviPodatki = noviPodatki;
        this.emailSkrbnika = emailSkrbnika;
    }

    public Timestamp getTimeStamp(){
         return timeStamp;
    }

    public void setTimeStamp(Timestamp timeStamp){
         this.timeStamp = timeStamp;
    }

    public String getSprememba() {
        return sprememba;
    }

    public void setSprememba(String sprememba) {
        this.sprememba = sprememba;
    }

    public String getOriginalniPodatki(){
        return originalniPodatki;
    }

    public void setOriginalniPodatki(String originalniPodatki){
        this.originalniPodatki = originalniPodatki;
    }

    public String getNoviPodatki(){
        return noviPodatki;
    }

    public void setNoviPodatki(String noviPodatki){
        this.noviPodatki = noviPodatki;
    }

    public String getEmailSkrbnika() {
        return emailSkrbnika;
    }

    public void setEmailSkrbnika(String emailSkrbnika) {
        this.emailSkrbnika = emailSkrbnika;
    }

}