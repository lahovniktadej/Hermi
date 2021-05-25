package si.hermi.nalogi.vao;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Ekipa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private DelovniNalog delovniNalog;

    @ManyToMany
    private List<Delavec> delavec;

    @ManyToOne
    private Delavec sofer;

    private Date datum;

    private Date start;

    private Date konec;

    private Date pricetekDela;

    private Date konecDela;

    private String objekt;

    private float netoDelo;

    private float netoMontaza;

    private Date odsotnostSoferja;

    private Date odsotnostDelavca;

    public Ekipa() {
    }

    public Ekipa(Date datum, Date start, Date konec, Date pricetekDela, Date konecDela, String objekt, float netoDelo, float netoMontaza, Date odsotnostSoferja, Date odsotnostDelavca) {
        this.datum = datum;
        this.start = start;
        this.konec = konec;
        this.pricetekDela = pricetekDela;
        this.konecDela = konecDela;
        this.objekt = objekt;
        this.netoDelo = netoDelo;
        this.netoMontaza = netoMontaza;
        this.odsotnostSoferja = odsotnostSoferja;
        this.odsotnostDelavca = odsotnostDelavca;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDatum() {
        return datum;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getKonec() {
        return konec;
    }

    public void setKonec(Date konec) {
        this.konec = konec;
    }

    public Date getPricetekDela() {
        return pricetekDela;
    }

    public void setPricetekDela(Date pricetekDela) {
        this.pricetekDela = pricetekDela;
    }

    public Date getKonecDela() {
        return konecDela;
    }

    public void setKonecDela(Date konecDela) {
        this.konecDela = konecDela;
    }

    public String getObjekt() {
        return objekt;
    }

    public void setObjekt(String objekt) {
        this.objekt = objekt;
    }

    public float getNetoDelo() {
        return netoDelo;
    }

    public void setNetoDelo(float netoDelo) {
        this.netoDelo = netoDelo;
    }

    public float getNetoMontaza() {
        return netoMontaza;
    }

    public void setNetoMontaza(float netoMontaza) {
        this.netoMontaza = netoMontaza;
    }

    public Date getOdsotnostSoferja() {
        return odsotnostSoferja;
    }

    public void setOdsotnostSoferja(Date odsotnostSoferja) {
        this.odsotnostSoferja = odsotnostSoferja;
    }

    public Date getOdsotnostDelavca() {
        return odsotnostDelavca;
    }

    public void setOdsotnostDelavca(Date odsotnostDelavca) {
        this.odsotnostDelavca = odsotnostDelavca;
    }
}