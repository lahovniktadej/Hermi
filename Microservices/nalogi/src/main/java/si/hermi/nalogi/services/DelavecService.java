package si.hermi.nalogi.services;

import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import si.hermi.nalogi.repositories.DelavecRepository;
import si.hermi.nalogi.vao.Delavec;

import javax.persistence.EntityManager;
import java.util.Optional;

@Service
public class DelavecService {
    @Autowired
    private DelavecRepository delavecRepository;

    @Autowired
    private EntityManager entityManager;

    public Delavec save(Delavec delavec) {
        return delavecRepository.save(delavec);
    }

    public void deleteById(int id) {
        delavecRepository.deleteById(id);
    }

    public Iterable<Delavec> findAll() {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        Iterable<Delavec> delavci = delavecRepository.findAll();
        session.disableFilter("deletedFilter");
        return delavci;
    }

    public Iterable<Delavec> findAll(Pageable pageable) {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedFilter");
        Iterable<Delavec> delavci = delavecRepository.findAll(pageable);
        session.disableFilter("deletedFilter");
        return delavci;
    }

    public Optional<Delavec> findById(int id) {
        return delavecRepository.findById(id);
    }
}
