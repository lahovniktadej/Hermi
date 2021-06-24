package si.hermi.nalogi.vao;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ekipa")
@SQLDelete(sql = "UPDATE ekipa SET deleted = true WHERE id=?")
@FilterDef(name = "deletedFilter")
@Filter(name = "deletedFilter", condition = "deleted = false")
public class Ekipa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToMany
    private List<Delavec> delavci;

    @OneToOne
    private Delavec sofer;

    @OneToOne
    private Vozilo vozilo;

    private boolean status;

    private Date datum;

    private LocalTime start;

    private LocalTime pricetekDela;

    private LocalTime konecDela;

    private LocalTime prihod;

    private float netoDelo;

    private float odsotnostSoferja;

    private float odsotnostDelavca;

    private float netoMontaza;

    private float brutoMontaza;

    private String operation;
     
    private long timestamp;
     
    private String spremenil;

    private Boolean deleted = Boolean.FALSE;

    public Ekipa() {
    }

    public Ekipa(int id, List<Delavec> delavci, Delavec sofer, Vozilo vozilo, boolean status, Date datum, LocalTime start, LocalTime pricetekDela, LocalTime konecDela, LocalTime prihod, float netoDelo, float odsotnostSoferja, float odsotnostDelavca, float netoMontaza, float brutoMontaza, String spremenil) {
        this.id = id;
        this.delavci = delavci;
        this.sofer = sofer;
        this.vozilo = vozilo;
        this.status = status;
        this.datum = datum;
        this.start = start;
        this.pricetekDela = pricetekDela;
        this.konecDela = konecDela;
        this.prihod = prihod;
        this.netoDelo = netoDelo;
        this.odsotnostSoferja = odsotnostSoferja;
        this.odsotnostDelavca = odsotnostDelavca;
        this.netoMontaza = netoMontaza;
        this.brutoMontaza = brutoMontaza;
        this.spremenil = spremenil;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Delavec> getDelavci() {
        return delavci;
    }

    public void setDelavci(List<Delavec> delavci) {
        this.delavci = delavci;
    }

    public Delavec getSofer() {
        return sofer;
    }

    public void setSofer(Delavec sofer) {
        this.sofer = sofer;
    }

    public Vozilo getVozilo() {
        return vozilo;
    }

    public void setVozilo(Vozilo vozilo) {
        this.vozilo = vozilo;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Date getDatum() {
        return datum;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }

    public LocalTime getStart() {
        return start;
    }

    public void setStart(LocalTime start) {
        this.start = start;
    }

    public LocalTime getPricetekDela() {
        return pricetekDela;
    }

    public void setPricetekDela(LocalTime pricetekDela) {
        this.pricetekDela = pricetekDela;
    }

    public LocalTime getKonecDela() {
        return konecDela;
    }

    public void setKonecDela(LocalTime konecDela) {
        this.konecDela = konecDela;
    }

    public LocalTime getPrihod() {
        return prihod;
    }

    public void setPrihod(LocalTime prihod) {
        this.prihod = prihod;
    }

    public float getNetoDelo() {
        return netoDelo;
    }

    public void setNetoDelo(float netoDelo) {
        this.netoDelo = netoDelo;
    }

    public float getOdsotnostSoferja() {
        return odsotnostSoferja;
    }

    public void setOdsotnostSoferja(float odsotnostSoferja) {
        this.odsotnostSoferja = odsotnostSoferja;
    }

    public float getOdsotnostDelavca() {
        return odsotnostDelavca;
    }

    public void setOdsotnostDelavca(float odsotnostDelavca) {
        this.odsotnostDelavca = odsotnostDelavca;
    }

    public float getNetoMontaza() {
        return netoMontaza;
    }

    public void setNetoMontaza(float netoMontaza) {
        this.netoMontaza = netoMontaza;
    }

    public float getBrutoMontaza() {
        return brutoMontaza;
    }

    public void setBrutoMontaza(float brutoMontaza) {
        this.brutoMontaza = brutoMontaza;
    }
    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getSpremenil() {
        return spremenil;
    }

    public void setSpremenil(String spremenil) {
        this.spremenil = spremenil;
    }

    @PrePersist
    public void onPrePersist() {
        audit("Nova ekipa");
    }
     
    @PreUpdate
    public void onPreUpdate() {
        audit("Spremenjena ekipa");
    }
     
    @PreRemove
    public void onPreRemove() {
        audit("Izbrisana ekipa");
    }
     
    private void audit(String operation) {
        setOperation(operation);
        setTimestamp((new Date()).getTime());
    }
}
