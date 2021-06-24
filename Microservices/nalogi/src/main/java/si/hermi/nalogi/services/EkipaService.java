package si.hermi.nalogi.services;

import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import si.hermi.nalogi.repositories.EkipaRepository;
import si.hermi.nalogi.vao.Ekipa;

import javax.persistence.EntityManager;
import java.util.Optional;

@Service
public class EkipaService {
    @Autowired
    private EkipaRepository ekipaRepository;

    @Autowired
    private EntityManager entityManager;

    public Ekipa save(Ekipa ekipa) {
        return ekipaRepository.save(ekipa);
    }

    public void deleteById(int id) {
        ekipaRepository.deleteById(id);
    }

    public Iterable<Ekipa> findAll() {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        Iterable<Ekipa> ekipe = ekipaRepository.findAll();
        session.disableFilter("deletedFilter");
        return ekipe;
    }

    public Iterable<Ekipa> findAll(Pageable pageable) {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        Iterable<Ekipa> ekipe = ekipaRepository.findAll(pageable);
        session.disableFilter("deletedFilter");
        return ekipe;
    }

    public Optional<Ekipa> findById(int id) {
        return ekipaRepository.findById(id);
    }
}
