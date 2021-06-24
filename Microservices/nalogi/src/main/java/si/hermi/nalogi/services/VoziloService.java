package si.hermi.nalogi.services;

import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import si.hermi.nalogi.repositories.VoziloRepository;
import si.hermi.nalogi.vao.Vozilo;

import javax.persistence.EntityManager;
import java.util.Optional;

@Service
public class VoziloService {
    @Autowired
    private VoziloRepository voziloRepository;

    @Autowired
    private EntityManager entityManager;

    public Vozilo save(Vozilo vozilo) {
        return voziloRepository.save(vozilo);
    }

    public void deleteById(int id) {
        voziloRepository.deleteById(id);
    }

    public Iterable<Vozilo> findAll() {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        Iterable<Vozilo> vozila = voziloRepository.findAll();
        session.disableFilter("deletedFilter");
        return vozila;
    }

    public Iterable<Vozilo> findAll(Pageable pageable) {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        Iterable<Vozilo> vozila = voziloRepository.findAll(pageable);
        session.disableFilter("deletedFilter");
        return vozila;
    }

    public Optional<Vozilo> findById(int id) {
        return voziloRepository.findById(id);
    }
}
