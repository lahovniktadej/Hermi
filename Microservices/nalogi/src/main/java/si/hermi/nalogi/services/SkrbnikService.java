package si.hermi.nalogi.services;

import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import si.hermi.nalogi.repositories.SkrbnikRepository;
import si.hermi.nalogi.vao.Skrbnik;

import javax.persistence.EntityManager;
import java.util.Optional;

@Service
public class SkrbnikService {
    @Autowired
    private SkrbnikRepository skrbnikRepository;

    @Autowired
    private EntityManager entityManager;

    public Skrbnik save(Skrbnik skrbnik) {
        return skrbnikRepository.save(skrbnik);
    }

    public void deleteById(int id) {
        skrbnikRepository.deleteById(id);
    }

    public Iterable<Skrbnik> findAll() {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        Iterable<Skrbnik> skrbniki = skrbnikRepository.findAll();
        session.disableFilter("deletedFilter");
        return skrbniki;
    }

    public Iterable<Skrbnik> findAll(Pageable pageable) {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        Iterable<Skrbnik> skrbniki = skrbnikRepository.findAll(pageable);
        session.disableFilter("deletedFilter");
        return skrbniki;
    }

    public Optional<Skrbnik> findById(int id) {
        return skrbnikRepository.findById(id);
    }

    public Skrbnik findByUporabniskoIme(String username) {
        return skrbnikRepository.findByUporabniskoIme(username);
    }
}
