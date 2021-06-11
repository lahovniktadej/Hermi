package si.hermi.nalogi.vao;

import javax.persistence.*;

import java.sql.Timestamp;

@Entity
public class Logger {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private Timestamp timeStamp;

    private String sprememba;

    private String originalniPodatki;

    private String noviPodatki;

    private String emailSkrbnika;

    public Logger() {
    }

    public Logger(int id, Timestamp timeStamp, String sprememba, String originalniPodatki, String noviPodatki, String emailSkrbnika) {
        this.id = id;
        this.timeStamp = timeStamp;
        this.originalniPodatki = originalniPodatki;
        this.noviPodatki = noviPodatki;
        this.emailSkrbnika = emailSkrbnika;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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